import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
const { v4: uuidv4 } = require('uuid'); 

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Environment Variables
const SECRET_KEY = process.env.JWT_SECRET || 'fallback-secret-key';
const MONGODB_URI = process.env.MONGODB_URI;

// MongoDB Client
const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB/
/*
let db;
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    db = client.db('your-database-name'); // Replace with your database name
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the application if MongoDB connection fails
  }
}
connectToDatabase();
*/
// Routes
app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Input Validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, email, password: hashedPassword };

    // Insert user into MongoDB
    const result = await db.collection('users').insertOne(user);
    const userId = result.insertedId;

    // Generate JWT
    const token = jwt.sign({ userId, email }, SECRET_KEY, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user in MongoDB
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id, email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/buy', async (req, res) => {
    const { paymentDetails } = req.body;

    try {
        // Validate payment details
        if (!paymentDetails || !paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv) {
            return res.status(400).json({ message: 'Invalid payment details' });
        }

        // Generate transaction ID and date
        const transactionId = uuidv4(); // Generate a unique transaction ID
        const transactionDate = new Date(); // Current date and time

        // Create transaction object
        const transaction = {
            transactionId,
            date: transactionDate,
            paymentDetails,
            cartItems
        };

        // Save transaction to the database
        const database = client.db('transactions');
        const transactionsCollection = database.collection('ts');
        await transactionsCollection.insertOne(transaction);

        // Send success response
        res.status(200).json({ message: 'Payment processed successfully!', transactionId });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/api/review/submit', async (req, res) => {
  const { rating, comment, userId } = req.body; // Include userId to associate the review with a user

  try {
    // Validate input
    if (!rating || !comment || !userId) {
      return res.status(400).json({ message: 'Rating, comment, and userId are required' });
    }

    // Connect to MongoDB
    await client.connect();
    const database = client.db('users');
    const collection = database.collection('userratings');

    // Create review object
    const review = {
      userId, // Associate the review with the user
      rating,
      comment,
      date: new Date(), // Add the current date
    };

    // Insert the review into the userratings collection
    const result = await collection.insertOne(review);
    res.status(201).json({ message: 'Review submitted successfully', reviewId: result.insertedId });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close(); // Close the MongoDB connection
  }
});

app.get('/api/review', async (req, res) => {
  try {
    // Connect to MongoDB
    await client.connect();
    const database = client.db('users');
    const collection = database.collection('userratings');

    // Fetch all reviews from the userratings collection
    const reviews = await collection.find({}).toArray();
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close(); // Close the MongoDB connection
  }
});


app.get('/api/products', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('Empire');
    const collection = database.collection('productsList');
    const products = await collection.find({}).toArray();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
});


// Serve frontend in production
/*if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  // Serve index.html for all routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}
*/

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.jsx')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  },
}));

// Environment Variables
const SECRET_KEY = process.env.JWT_SECRET || 'your-strong-secret-key';
const EXPIRATION = '1h';
const MONGODB_URI = process.env.MONGODB_URI || 'your-mongodb-atlas-connection-string';

// MongoDB Client
const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
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
    const token = jwt.sign({ userId, email }, SECRET_KEY, { expiresIn: EXPIRATION });
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
    const token = jwt.sign({ userId: user._id, email }, SECRET_KEY, { expiresIn: EXPIRATION });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
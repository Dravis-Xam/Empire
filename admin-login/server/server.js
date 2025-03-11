import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';

dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5174', // Allow requests from the frontend
    credentials: true, // Allow cookies (if needed)
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const uri = process.env.MONGODB_URL_CON;

if (!uri) {
    console.error('MONGODB_URL_CON environment variable is missing');
    process.exit(1);
}

let client;

async function connectToDatabase() {
    try {
        console.log('Connecting to MongoDB with URI:', uri); // Debug log
        client = new MongoClient(uri, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10,
        });
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
}

// Connect to the database when the server starts
await connectToDatabase();

// Routes
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Login request:', { username, password });

    try {
        const database = client.db('Empire');
        const collection = database.collection('adminUsers');

        // Query for the "username" field
        const adminUser = await collection.findOne({ username: username });
        console.log('User found in database:', adminUser);

        if (adminUser && password === adminUser.password) { // Plain text comparison
            res.status(200).json({ message: 'Login successful!', user: adminUser });
        } else {
            console.log(adminUser.username, adminUser.password);
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
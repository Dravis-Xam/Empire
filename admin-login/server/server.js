import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = process.env.MONGODB_URL_CON;

if (!uri) {
    console.error('MONGODB_URL_CON environment variable is missing');
    process.exit(1);
}

let client;

async function connectToDatabase() {
    try {
        client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
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

// Handle database connection errors
client?.on('serverClosed', (event) => {
    console.log('MongoDB connection closed:', event);
});

process.on('SIGINT', async () => {
    if (client) {
        await client.close();
        console.log('MongoDB connection closed');
    }
    process.exit(0);
});

// Connect to the database when the server starts
await connectToDatabase();

// Preflight handling
app.options('*', cors());

// Routes
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const database = client.db('Empire');
        const collection = database.collection('adminUsers');

        const adminUser = await collection.findOne({ username, password });

        if (adminUser) {
            res.status(200).json({ message: 'Login successful!', user: adminUser });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/admin/products', async (req, res) => {
    try {
        const database = client.db('Empire');
        const collection = database.collection('productsList');

        // Fetch the last product to generate a new itemId
        const lastProduct = await collection.find()
            .sort({ itemId: -1 })
            .limit(1)
            .toArray();

        const lastItemId = lastProduct[0]?.itemId || 0;
        const newItemId = (lastItemId + 1).toString().padStart(4, '0');

        // Create a new product
        const newProduct = {
            ...req.body,
            itemId: parseInt(newItemId),
            createdAt: new Date(),
        };

        // Insert the new product into the database
        const result = await collection.insertOne(newProduct);

        // Send the response
        res.status(201).json({
            ...newProduct,
            _id: result.insertedId,
        });
    } catch (error) {
        console.error('Product creation error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        mongoConnected: client?.topology?.isConnected() || false,
        time: new Date().toISOString(),
    });
});

app.use((err, req, res, next) => {
    if (err.message === 'Not allowed by CORS') {
        res.status(403).json({ error: 'CORS policy denied this request' });
    } else {
        next(err);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
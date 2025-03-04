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
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        await client.connect();
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
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:3000`);
});
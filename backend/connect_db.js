import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

async function main() {
    const uri = process.env.MONGODB_URL_CON; // Ensure this is in your .env file
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas!");

        // Example data to insert
        const data = [
            { name: 'Product 1', price: 100 },
            { name: 'Product 2', price: 200 },
            // Add more products as needed
        ];

        // Call storeData with valid database name, collection name, and data
        await storeData(client, 'Empire', 'productsList', data);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
        console.log("Connection closed.");
    }
}

async function storeData(client, databaseName, collectionName, data) {
    try {
        const database = client.db(databaseName);
        const collection = database.collection(collectionName);

        const result = await collection.insertMany(data);
        console.log(`${result.insertedCount} documents were inserted`);
    } catch (error) {
        console.error("Error in storeData:", error);
        throw error; // Propagate the error to the caller
    }
}

main().catch(console.error);
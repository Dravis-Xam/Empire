require('dotenv').config()

async function main() {
    const uri = process.env.MONGODB_URL_CON; 
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas!");

        // Perform database operations
        const database = client.db('Empire');
        const collection = database.collection('productsList');
        const result = await collection.findOne({});
        console.log(result);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
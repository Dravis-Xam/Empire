require('dotenv').config()

async function main() {
    const uri = process.env.MONGODB_URL_CON; 
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
 
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas!");

        const database = client.db('Empire');
        const collection = database.collection('productsList');
        const result = await collection.insertMany([//dummy data
            { 'item': 'OPPO', 'price': 20000, 'quantity': 20, 'date': new Date('2014-03-01T08:00:00Z') },
            { 'item': 'Realme', 'price': 20000, 'quantity': 10, 'date': new Date('2014-03-01T09:00:00Z') },
            { 'item': 'Samsung', 'price': 50000, 'quantity': 10, 'date': new Date('2014-03-15T09:00:00Z') },
            { 'item': 'Itel', 'price': 5000, 'quantity': 20, 'date': new Date('2014-04-04T11:21:39.736Z') },
            { 'item': 'Nokia', 'price': 10000, 'quantity': 10, 'date': new Date('2014-04-04T21:23:13.331Z') },
            { 'item': 'RedMi', 'price': 9500, 'quantity': 50, 'date': new Date('2015-06-04T05:08:13Z') },
            { 'item': 'Iphone', 'price': 75000, 'quantity': 10, 'date': new Date('2015-09-10T08:43:00Z') },
            { 'item': 'Legion', 'price': 100000, 'quantity': 50, 'date': new Date('2016-02-06T20:20:13Z') },
          ]);
      
          console.log(`${result.insertedCount} documents were inserted`);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
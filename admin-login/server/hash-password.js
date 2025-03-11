// hash-password.js
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

async function hashPassword() {
    const uri = process.env.MONGODB_URL_CON; // Use your MongoDB connection string
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('Empire');
        const collection = database.collection('adminUsers');

        // Find the admin user
        const adminUser = await collection.findOne({ username: 'admin' });

        if (adminUser) {
            // Hash the plain text password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(adminUser.password, saltRounds);

            // Update the user with the hashed password
            await collection.updateOne(
                { _id: adminUser._id },
                { $set: { password: hashedPassword } }
            );

            console.log('Password hashed successfully!');
        } else {
            console.log('Admin user not found.');
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

hashPassword();
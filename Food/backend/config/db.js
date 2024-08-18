/*global process*/
import { MongoClient } from 'mongodb';
// require('dotenv').config({ path: '.env.local' });
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
let db;

const connectToDatabase = async () => {
    if (db) return db;
    const client = await MongoClient.connect(uri);
    db = client.db('Food-Backend-DB');
    console.log('Connected to Database');
    return db;
};

export default connectToDatabase;
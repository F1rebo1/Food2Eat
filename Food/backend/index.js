/*global process*/
// require('dotenv').config({ path: '.env.local' });

import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

import express, { json, urlencoded } from 'express';
import restaurantRoutes from './routes/restaurantRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import menuRoutes from './routes/menuRoutes.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(json()); // To parse JSON bodies
app.use(urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies (for form submissions)

app.use(restaurantRoutes);
app.use(customerRoutes);
app.use(orderRoutes);
app.use(menuRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

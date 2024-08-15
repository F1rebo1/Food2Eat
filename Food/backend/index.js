require('dotenv').config({ path: '.env.local' });

const express = require('express');
const restaurantRoutes = require('./routes/restaurantRoutes');
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const menuRoutes = require('./routes/menuRoutes');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies (for form submissions)

app.use(restaurantRoutes);
app.use(customerRoutes);
app.use(orderRoutes);
app.use(menuRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

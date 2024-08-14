require('dotenv').config({ path: '.env.local' });

const express = require('express');
const customerRoutes = require('./routes/customerRoutes');
const menuRoutes = require('./routes/menuRoutes');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json()); // To parse JSON bodies
app.use(customerRoutes);
app.use(menuRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

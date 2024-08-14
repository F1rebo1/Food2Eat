const express = require('express');
const router = express.Router();
const connectToDatabase = require('../config/db');
const {
    addCustomer,
    getCustomers,
    updateCustomer,
    deleteCustomer,
    getCustomerByName
} = require('../controllers/customerController');

router.post('/add-customer', async (req, res) => {
    const db = await connectToDatabase();
    await addCustomer(req, res, db); // Added await for consistency
});

router.get('/customers', async (req, res) => {
    const db = await connectToDatabase();

    if (req.query.firstName && req.query.lastName) {
        // If firstName and lastName are provided, call getCustomerByName
        await getCustomerByName(req, res, db); // Added await for consistency
    } else {
        // Otherwise, call getCustomers to fetch all customers
        await getCustomers(req, res, db); // Added await for consistency
    }
});

router.put('/update-customer/:id', async (req, res) => {
    const db = await connectToDatabase();
    await updateCustomer(req, res, db); // Added await for consistency
});

router.delete('/delete-customer/:id', async (req, res) => {
    const db = await connectToDatabase();
    await deleteCustomer(req, res, db); // Added await for consistency
});

module.exports = router;

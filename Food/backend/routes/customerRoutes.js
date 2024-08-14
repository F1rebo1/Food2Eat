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
    addCustomer(req, res, db);
});

router.get('/customers', async (req, res) => {
    const db = await connectToDatabase();
    getCustomers(req, res, db);
});

router.put('/update-customer/:id', async (req, res) => {
    const db = await connectToDatabase();
    updateCustomer(req, res, db);
});

router.delete('/delete-customer/:id', async (req, res) => {
    const db = await connectToDatabase();
    deleteCustomer(req, res, db);
});

router.get('/get-customer-by-name', async (req, res) => {
    const db = await connectToDatabase();
    getCustomerByName(req, res, db);
});

module.exports = router;

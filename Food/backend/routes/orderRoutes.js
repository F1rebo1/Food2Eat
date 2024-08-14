const express = require('express');
const router = express.Router();
const connectToDatabase = require('../config/db');
const {
    addOrder,
    getAllOrders,
    getOrderByCustomerId,
    updateOrder,
    deleteOrder,
} = require('../controllers/orderController');

router.post('/add-order', async (req, res) => {
    const db = await connectToDatabase();
    await addOrder(req, res, db);
});

router.get('/orders', async (req, res) => {
    const db = await connectToDatabase();

    if (req.query.customerId) {
        await getOrderByCustomerId(req, res, db);
    } else {
        await getAllOrders(req, res, db);
    }
});

router.put('/update-order/:id', async (req, res) => {
    const db = await connectToDatabase();
    await updateOrder(req, res, db);
});

router.delete('/delete-order/:id', async (req, res) => {
    const db = await connectToDatabase();
    await deleteOrder(req, res, db);
});

module.exports = router;

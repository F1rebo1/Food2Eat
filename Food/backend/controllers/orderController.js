const { ObjectId } = require('mongodb');

const addOrder = async (req, res, db) => {
    try {
        const orderData = {
            customerId: new ObjectId(req.body.customerId),
            menuItemId: new ObjectId(req.body.menuItemId),
            restaurantId: new ObjectId(req.body.restaurantId),
            quantity: req.body.quantity,
            date: new Date(req.body.date),
            timestamp: new Date(req.body.timestamp),
        };

        const result = await db.collection('OrderDetails').insertOne(orderData);
        res.status(201).json({ message: 'Order added successfully', id: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add order', details: err.message });
    }
};

const getAllOrders = async (req, res, db) => {
    try {
        const orders = await db.collection('OrderDetails').find().toArray();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch all orders', details: err.message });
    }
};

const getOrderByCustomerId = async (req, res, db) => {
    try {
        const customerId = new ObjectId(req.query.customerId);

        const result = await db.collection('OrderDetails').find({
            customerId: { $eq: customerId }
        }).toArray();

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Could not retrieve orders for the customer', details: err.message });
    }
};

const updateOrder = async (req, res, db) => {
    try {
        const orderId = req.params.id;
        const updateFields = {};

        if (req.body.newQuantity) {
            updateFields.quantity = req.body.newQuantity;
        }
        if (req.body.newDate) {
            updateFields.date = new Date(req.body.newDate);
        }

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ error: 'No fields provided to update' });
        }

        const result = await db.collection('OrderDetails').updateOne(
            { _id: new ObjectId(orderId) },
            { $set: updateFields }
        );

        if (result.modifiedCount > 0) {
            res.status(200).json({ message: 'Order updated successfully' });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to update order', details: err.message });
    }
};

const deleteOrder = async (req, res, db) => {
    try {
        const orderId = req.params.id;

        const result = await db.collection('OrderDetails').deleteOne(
            { _id: new ObjectId(orderId) }
        );

        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Order deleted successfully' });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete order', details: err.message });
    }
};

module.exports = {
    addOrder,
    getAllOrders,
    getOrderByCustomerId,
    updateOrder,
    deleteOrder,
};

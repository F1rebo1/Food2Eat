const { ObjectId } = require('mongodb');

const debug = require('../utils/printDebugs');

const addCustomer = async (req, res, db) => {
    try {
        if (debug) console.log("[customerController.js - addCustomer]");
        const customerData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            dob: new Date(req.body.dob),
            timestamp: new Date(),
            restaurantInfo: {
                allOrders: req.body.allOrders.map(orderId => new ObjectId(orderId)), // Ensuring allOrders are ObjectIds
                favorites: req.body.favorites.map(restaurantId => new ObjectId(restaurantId)), // Ensuring favorites are ObjectIds
                recentOrders: req.body.recentOrders.map(orderId => new ObjectId(orderId)) // Ensuring recentOrders are ObjectIds
            },
            isAdmin: req.body.isAdmin
        };

        const result = await db.collection('CustomerInfo').insertOne(customerData);
        res.status(201).json({ message: 'Customer added successfully', id: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add customer', details: err.message });
    }
};

const getCustomers = async (req, res, db) => {
    try {
        console.log("debug: " + debug);

        if (debug) console.log("[customerController.js - getCustomers]");
        const customers = await db.collection('CustomerInfo').find().toArray();
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch customers', details: err.message });
    }
};

const getCustomerByName = async (req, res, db) => {
    try {
        if (debug) console.log("[customerController.js - getCustomerByName]");
        const firstName = req.query.firstName;
        const lastName = req.query.lastName;

        const result = await db.collection('CustomerInfo').find({
            firstName: { $eq: firstName },
            lastName: { $eq: lastName }
        }).toArray();

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Could not retrieve customer information', details: err.message });
    }
};

const updateCustomer = async (req, res, db) => {
    try {
        if (debug) console.log("[customerController.js - updateCustomer]");
        const customerId = req.params.id;
        const updateFields = {};

        // Conditionally add fields to the update object based on what is in req.body
        if (req.body.newFirstName) {
            updateFields.firstName = req.body.newFirstName;
        }
        if (req.body.newLastName) {
            updateFields.lastName = req.body.newLastName;
        }
        if (req.body.newEmail) {
            updateFields.email = req.body.newEmail;
        }
        if (req.body.newPhone) {
            updateFields.phone = req.body.newPhone;
        }
        if (req.body.newFavorites) {
            updateFields['restaurantInfo.favorites'] = req.body.newFavorites.map(restaurantId => new ObjectId(restaurantId));
        }
        if (req.body.newRecentOrders) {
            updateFields['restaurantInfo.recentOrders'] = req.body.newRecentOrders.map(orderId => new ObjectId(orderId));
        }

        // If no fields were provided, return an error
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ error: 'No fields provided to update' });
        }

        const result = await db.collection('CustomerInfo').updateOne(
            { _id: new ObjectId(customerId) },
            { $set: updateFields }
        );

        if (result.modifiedCount > 0) {
            res.status(200).json({ message: 'Customer updated successfully' });
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to update customer', details: err.message });
    }
};

const deleteCustomer = async (req, res, db) => {
    try {
        if (debug) console.log("[customerController.js - deleteCustomer]");
        const customerId = req.params.id;

        const result = await db.collection('CustomerInfo').deleteOne(
            { _id: new ObjectId(customerId) }
        );

        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Customer deleted successfully' });
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete customer', details: err.message });
    }
};

module.exports = {
    addCustomer,
    getCustomers,
    updateCustomer,
    deleteCustomer,
    getCustomerByName
};

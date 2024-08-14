const { ObjectId } = require('mongodb');

const addCustomer = async (req, res, db) => {
    try {
        const customerData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            dob: new Date(req.body.dob),
            timestamp: new Date(),
            restaurantInfo: {
                allOrders: req.body.allOrders || [],
                favorites: req.body.favorites || [],
                recentOrders: req.body.recentOrders || []
            }
        };

        const result = await db.collection('CustomerInfo').insertOne(customerData);
        res.status(201).json({ message: 'Customer added successfully', id: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add customer', details: err.message });
    }
};

const getCustomers = async (req, res, db) => {
    try {
        const customers = await db.collection('CustomerInfo').find().toArray();
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch customers', details: err.message });
    }
};

const updateCustomer = async (req, res, db) => {
    try {
        const customerId = req.params.id;
        const newLastName = 'Asolkar';

        const result = await db.collection('CustomerInfo').updateOne(
            { _id: new ObjectId(customerId) },
            { $set: { lastName: newLastName } }
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

const getCustomerByName = async (req, res, db) => {
    try {
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

module.exports = {
    addCustomer,
    getCustomers,
    updateCustomer,
    deleteCustomer,
    getCustomerByName
};

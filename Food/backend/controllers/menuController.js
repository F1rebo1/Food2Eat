const { ObjectId } = require('mongodb');

const addMenuItem = async (req, res, db) => {
    try {
        const menuData = {
            restaurantId: new ObjectId(req.body.restaurantId), // Added to link menu item to a restaurant
            itemName: req.body.itemName,
            price: req.body.price,
            categories: req.body.categories,
            pictureURL: req.body.pictureURL
        };

        // Optional: Validate that the restaurantId exists in RestaurantInfo

        const result = await db.collection('Menu').insertOne(menuData);
        res.status(201).json({ message: 'Menu item added successfully', id: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add menu item', details: err.message });
    }
};

const getAllMenuItems = async (req, res, db) => {
    try {
        const items = await db.collection('Menu').find().toArray();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch menu items', details: err.message });
    }
};

const getMenuItem = async (req, res, db) => {
    try {
        const itemName = req.query.itemName;

        const result = await db.collection('Menu').find({
            itemName: { $eq: itemName }
        }).toArray();

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Could not retrieve item information', details: err.message });
    }
};

const updateMenuItem = async (req, res, db) => {
    try {
        const itemId = req.params.id;
        const updateFields = {};

        // Conditionally add fields to the update object based on what is in req.body
        if (req.body.newItemName) {
            updateFields.itemName = req.body.newItemName;
        }
        if (req.body.newItemPrice) {
            updateFields.price = req.body.newItemPrice;
        }
        if (req.body.newItemCategories) {
            updateFields.categories = req.body.newItemCategories;
        }
        if (req.body.newRestaurantId) {
            updateFields.restaurantId = new ObjectId(req.body.newRestaurantId); // Handle restaurantId update
        }

        // If no fields were provided, return an error
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ error: 'No fields provided to update' });
        }

        // Perform the update operation
        const result = await db.collection('Menu').updateOne(
            { _id: new ObjectId(itemId) },
            { $set: updateFields }
        );

        if (result.modifiedCount > 0) {
            res.status(200).json({ message: 'Menu item updated successfully' });
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to update menu item', details: err.message });
    }
};

const deleteMenuItem = async (req, res, db) => {
    try {
        const itemId = req.params.id;

        const result = await db.collection('Menu').deleteOne(
            { _id: new ObjectId(itemId) } // Fixed ObjectId creation
        );

        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Menu item deleted successfully' });
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete menu item', details: err.message });
    }
};

module.exports = {
    addMenuItem,
    getAllMenuItems,
    updateMenuItem,
    deleteMenuItem,
    getMenuItem
};

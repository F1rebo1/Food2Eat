const express = require('express');
const router = express.Router();
const connectToDatabase = require('../config/db');
const {
    addMenuItem,
    getAllMenuItems,
    updateMenuItem,
    deleteMenuItem,
    getMenuItem
} = require('../controllers/menuController');

router.post('/add-menu-item', async (req, res) => {
    const db = await connectToDatabase();
    await addMenuItem(req, res, db);
});

router.get('/menu', async (req, res) => {
    const db = await connectToDatabase();

    if (req.query.itemName) {
        await getMenuItem(req, res, db);
    } else {
        await getAllMenuItems(req, res, db);
    }
});

router.put('/update-menu-item/:id', async (req, res) => {
    const db = await connectToDatabase();
    await updateMenuItem(req, res, db);
});

router.delete('/delete-menu-item/:id', async (req, res) => {
    const db = await connectToDatabase();
    await deleteMenuItem(req, res, db);
});

module.exports = router;

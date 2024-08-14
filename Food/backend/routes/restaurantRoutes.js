const express = require('express');
const router = express.Router();
const connectToDatabase = require('../config/db');
const {
    addRestaurant,
    getAllRestaurants,
    getRestaurantByName,
    updateRestaurant,
    deleteRestaurant,
} = require('../controllers/restaurantController');

router.post('/add-restaurant', async (req, res) => {
    const db = await connectToDatabase();
    await addRestaurant(req, res, db);  // Added await here
});

router.get('/restaurants', async (req, res) => {
    const db = await connectToDatabase();

    if (req.query.restaurantName) {
        await getRestaurantByName(req, res, db);  // Added await here
    } else {
        await getAllRestaurants(req, res, db);  // Added await here
    }
});

router.put('/update-restaurant/:id', async (req, res) => {
    const db = await connectToDatabase();
    await updateRestaurant(req, res, db);  // Added await here
});

router.delete('/delete-restaurant/:id', async (req, res) => {
    const db = await connectToDatabase();
    await deleteRestaurant(req, res, db);  // Added await here
});

module.exports = router;

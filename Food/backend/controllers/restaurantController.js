import { ObjectId } from 'mongodb';

import debug from '../utils/printDebugs.js';

const addRestaurant = async (req, res, db) => {
    try {
        if (debug) console.log("[restaurantController.js - addRestaurant]");
        const restaurantData = {
            restaurantName: req.body.restaurantName,
            address: req.body.address,
            rating: req.body.rating,
        };

        const result = await db.collection('RestaurantInfo').insertOne(restaurantData);
        res.status(201).json({ message: 'Restaurant added successfully', id: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add restaurant', details: err.message });  // Updated error message
    }
};

const getAllRestaurants = async (req, res, db) => {
    try {
        if (debug) console.log("[restaurantController.js - getAllRestaurants]");
        const restaurants = await db.collection('RestaurantInfo').find().toArray();
        res.status(200).json(restaurants);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch all restaurants', details: err.message });
    }
};

const getAllCuisines = async (req, res, db) => {
    try {
        if (debug) console.log("[restaurantController.js - getAllCuisines]");
        const restaurants = await db.collection('RestaurantInfo').find().toArray();

        const cuisinesList = [];
        const set = new Set();
        for (let index = 0; index < restaurants.length; index++) {
            let cuisine = restaurants[index].cuisine;
            if(!set.has(cuisine)){
                cuisinesList.push(cuisine);
                set.add(cuisine);
            }
        }
        res.status(200).json(cuisinesList);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch all cuisines', details: err.message });
    }
};

const getAllRestaurantsForSelectedCuisine = async (req, res, db) => {
    try {
        if (debug) console.log("[restaurantController.js - getAllRestaurantsForSelectedCuisine]");
        const restaurants = await db.collection('RestaurantInfo').find().toArray();

        // We should pass in the desired cuisine selected/entered by the user in the body of a post request from the search bar/all restaurants page
        // const selectedCuisine = req.body.cuisine;
        
        // For the time being, I shall pass selectedCuisine in the query parameter
        const urlParams = new URLSearchParams(window.location.search);
        const selectedCuisine = urlParams.get('cuisine');

        const restaurantList = []; // This will contain a list of restaurant objects (so we have all data, including name, location, rating, cuisine)
        for (let index = 0; index < restaurants.length; index++) {
            let restaurant = restaurant[index];
            let cuisine = restaurants.cuisine;
            if(cuisine === selectedCuisine){
                restaurantList.push(restaurant);
            }
        }
        res.status(200).json(restaurantList);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch all restaurants for desired cuisine', details: err.message });
    }
};

const getRestaurantByName = async (req, res, db) => {
    try {
        if (debug) console.log("[restaurantController.js - getRestaurantByName]");
        const restaurantName = req.query.restaurantName;

        const result = await db.collection('RestaurantInfo').find({
            restaurantName: { $eq: restaurantName }
        }).toArray();

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Could not retrieve restaurant information', details: err.message });
    }
};

const updateRestaurant = async (req, res, db) => {
    try {
        if (debug) console.log("[restaurantController.js - updateRestaurant]");
        const restaurantId = req.params.id;
        const updateFields = {};

        // Conditionally add fields to the update object based on what is in req.body
        if (req.body.newRestaurantName) {
            updateFields.restaurantName = req.body.newRestaurantName;  // Updated key name
        }
        if (req.body.newRestaurantAddress) {
            updateFields.address = req.body.newRestaurantAddress;  // Updated key name
        }
        if (req.body.newRestaurantRating) {
            updateFields.rating = req.body.newRestaurantRating;  // Updated key name
        }

        // If no fields were provided, return an error
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ error: 'No fields provided to update' });
        }

        // Perform the update operation
        const result = await db.collection('RestaurantInfo').updateOne(
            { _id: new ObjectId(restaurantId) },
            { $set: updateFields }
        );

        if (result.modifiedCount > 0) {
            res.status(200).json({ message: 'Restaurant updated successfully' });
        } else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to update restaurant', details: err.message });
    }
};

const deleteRestaurant = async (req, res, db) => {
    try {
        if (debug) console.log("[restaurantController.js - deleteRestaurant]");
        const restaurantId = req.params.id;  // Use params.id instead of body.id
        const isAdmin = req.body.isAdmin;

        if (!isAdmin) {
            return res.status(403).json({ message: 'Permission denied' });
        }

        const result = await db.collection('RestaurantInfo').deleteOne(
            { _id: new ObjectId(restaurantId) }
        );

        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Restaurant deleted successfully' });
        } else {
            res.status(404).json({ message: 'Could not delete restaurant' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete restaurant', details: err.message });
    }
};

export default {
    addRestaurant,
    getAllRestaurants,
    getRestaurantByName,
    getAllCuisines,
    getAllRestaurantsForSelectedCuisine,
    updateRestaurant,
    deleteRestaurant,
};

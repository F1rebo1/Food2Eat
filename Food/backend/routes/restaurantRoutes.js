import { Router } from 'express';
const router = Router();
import connectToDatabase from '../config/db.js';
import controller from '../controllers/restaurantController.js';

router.post('/add-restaurant', async (req, res) => {
    const db = await connectToDatabase();
    await controller.addRestaurant(req, res, db);  
});

router.get('/restaurants', async (req, res) => {
    const db = await connectToDatabase();

    if (req.query.restaurantName) {
        await controller.getRestaurantByName(req, res, db);
    } else if (req.query.cuisine) {
        await controller.getAllRestaurantsForSelectedCuisine(req, res, db);
    } else {
        await controller.getAllRestaurants(req, res, db);  
    }
});

router.get('/cuisines', async (req, res) => {
    const db = await connectToDatabase();
    await controller.getAllCuisines(req, res, db);  
});

router.put('/update-restaurant/:id', async (req, res) => {
    const db = await connectToDatabase();
    await controller.updateRestaurant(req, res, db);  
});

router.delete('/delete-restaurant/:id', async (req, res) => {
    const db = await connectToDatabase();
    await controller.deleteRestaurant(req, res, db);  
});

export default router;

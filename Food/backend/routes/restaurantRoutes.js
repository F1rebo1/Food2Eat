import { Router } from 'express';
const router = Router();
import connectToDatabase from '../config/db.js';
import controller from '../controllers/restaurantController.js';

router.post('/add-restaurant', async (req, res) => {
    const db = await connectToDatabase();
    await controller.addRestaurant(req, res, db);  // Added await here
});

router.get('/restaurants', async (req, res) => {
    const db = await connectToDatabase();

    if (req.query.restaurantName) {
        await controller.getRestaurantByName(req, res, db);  // Added await here
    } else {
        await controller.getAllRestaurants(req, res, db);  // Added await here
    }
});

router.put('/update-restaurant/:id', async (req, res) => {
    const db = await connectToDatabase();
    await controller.updateRestaurant(req, res, db);  // Added await here
});

router.delete('/delete-restaurant/:id', async (req, res) => {
    const db = await connectToDatabase();
    await controller.deleteRestaurant(req, res, db);  // Added await here
});

export default router;

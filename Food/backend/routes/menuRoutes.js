import { Router } from 'express';
const router = Router();
import connectToDatabase from '../config/db.js';
import controller from '../controllers/menuController.js';

router.post('/add-menu-item', async (req, res) => {
    const db = await connectToDatabase();
    await controller.addMenuItem(req, res, db);
});

router.get('/menu', async (req, res) => {
    const db = await connectToDatabase();

    if (req.query.itemName) {
        await controller.getMenuItem(req, res, db);
    } else {
        await controller.getAllMenuItems(req, res, db);
    }
});

router.put('/update-menu-item/:id', async (req, res) => {
    const db = await connectToDatabase();
    await controller.updateMenuItem(req, res, db);
});

router.delete('/delete-menu-item/:id', async (req, res) => {
    const db = await connectToDatabase();
    await controller.deleteMenuItem(req, res, db);
});

export default router;

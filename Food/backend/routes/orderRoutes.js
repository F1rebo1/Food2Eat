import { Router } from 'express';
const router = Router();
import connectToDatabase from '../config/db.js';
import controller from '../controllers/orderController.js';

router.post('/add-order', async (req, res) => {
    const db = await connectToDatabase();
    await controller.addOrder(req, res, db);
});

router.get('/orders', async (req, res) => {
    const db = await connectToDatabase();

    if (req.query.customerId) {
        await controller.getOrderByCustomerId(req, res, db);
    } else {
        await controller.getAllOrders(req, res, db);
    }
});

router.put('/update-order/:id', async (req, res) => {
    const db = await connectToDatabase();
    await controller.updateOrder(req, res, db);
});

router.delete('/delete-order/:id', async (req, res) => {
    const db = await connectToDatabase();
    await controller.deleteOrder(req, res, db);
});

export default router;

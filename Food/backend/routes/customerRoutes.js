import { Router } from 'express';
const router = Router();
import connectToDatabase from '../config/db.js';
import controller from '../controllers/customerController.js';

router.post('/add-customer', async (req, res) => {
    const db = await connectToDatabase();
    await controller.addCustomer(req, res, db); // Added await for consistency
});

router.get('/customers', async (req, res) => {
    const db = await connectToDatabase();

    if (req.query.firstName && req.query.lastName) {
        // If firstName and lastName are provided, call getCustomerByName
        await controller.getCustomerByName(req, res, db); // Added await for consistency
    } else {
        // Otherwise, call getCustomers to fetch all customers
        await controller.getCustomers(req, res, db); // Added await for consistency
    }
});

router.put('/update-customer/:id', async (req, res) => {
    const db = await connectToDatabase();
    await controller.updateCustomer(req, res, db); // Added await for consistency
});

router.delete('/delete-customer/:id', async (req, res) => {
    const db = await connectToDatabase();
    await controller.deleteCustomer(req, res, db); // Added await for consistency
});

export default router;

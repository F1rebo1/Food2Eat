/*global process*/
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

import { MongoClient } from 'mongodb';

async function seedDatabase() {
    const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db("Food-Backend-DB");

        // 1. Insert Restaurants
        const restaurantInfo = database.collection("RestaurantInfo");
        const veganBistro = await restaurantInfo.insertOne({
            restaurantName: "Vegan Bistro",
            address: "123 Vegan Street, Plant City",
            rating: 4.5,
        });
        const spicyPalace = await restaurantInfo.insertOne({
            restaurantName: "Spicy Palace",
            address: "456 Spice Avenue, Flavor Town",
            rating: 4.7,
        });

        console.log("Inserted Restaurants:", veganBistro.insertedId, spicyPalace.insertedId);

        // 2. Insert Menu Items
        const menuInfo = database.collection("Menu");
        let pongal, butterChicken, idli, gheeRoast, samosa;
        try {
            pongal = await menuInfo.insertOne({
                restaurantId: veganBistro.insertedId,
                itemName: "Pongal",
                price: 7.99,
                categories: ["vegan", "vegetarian", "gluten free"],
                description: "A rice and lentil porridge, made with black pepper, ginger, turmeric, cashews, cumin, curry leaves, ghee (clarified butter), mung beans, and salt",
                src: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/01/pongal-ven-pongal-500x500.jpg"
            });
            console.log("Inserted Pongal Menu Item:", pongal.insertedId);
        } catch (err) {
            console.error('Failed to insert Pongal Menu Item:', err.message);
        }

        try {
            butterChicken = await menuInfo.insertOne({
                restaurantId: spicyPalace.insertedId,
                itemName: "Butter Chicken",
                price: 12.99,
                categories: ["spicy"],
                description: "A chicken curry made with a spiced tomato and butter (makhan) sauce",
                src: "https://cafedelites.com/wp-content/uploads/2019/01/Butter-Chicken-IMAGE-64.jpg"
            });
            console.log("Inserted Butter Chicken Menu Item:", butterChicken.insertedId);
        } catch (err) {
            console.error('Failed to insert Butter Chicken Menu Item:', err.message);
        }

        try {
            idli = await menuInfo.insertOne({
                restaurantId: veganBistro.insertedId,
                itemName: "Pongal",
                price: 6.99,
                categories: ["vegan", "vegetarian"],
                description: "A a soft and fluffy steamed rice cake made from a batter of fermented rice",
                src: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/04/idli-recipe.jpg"
            });
            console.log("Inserted Idli Menu Item:", idli.insertedId);
        } catch (err) {
            console.error('Failed to insert Idli Menu Item:', err.message);
        }

        try {
            gheeRoast = await menuInfo.insertOne({
                restaurantId: veganBistro.insertedId,
                itemName: "Ghee Roast Dosa",
                price: 11.99,
                categories: ["vegetarian"],
                description: "A thin, savory, fermented pancake or crepe made from rice and lentil batter",
                src: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/12/dosa-recipe.jpg"
            });
            console.log("Inserted Ghee Roast Dosa Menu Item:", gheeRoast.insertedId);
        } catch (err) {
            console.error('Failed to insert Ghee Roast Dosa Menu Item:', err.message);
        }

        try {
            samosa = await menuInfo.insertOne({
                restaurantId: spicyPalace.insertedId,
                itemName: "Samosa",
                price: 4.99,
                categories: ["spicy"],
                description: "A crispy, deep-fried pastry snack filled with vegetables, spiced potatoes, onions and peas",
                src: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/12/samosa-recipe.jpg"
            });
            console.log("Inserted Samosa Menu Item:", samosa.insertedId);
        } catch (err) {
            console.error('Failed to insert Samosa Menu Item:', err.message);
        }

        // 3. Insert Customers
        const customerInfo = database.collection("CustomerInfo");
        const cust1 = await customerInfo.insertOne({
            firstName: "Jane",
            lastName: "Doe",
            email: "janedoe@gmail.com",
            phone: "987654321",
            dob: new Date("2001-10-30T00:00:00.000Z"),
            timestamp: new Date(),
            restaurantInfo: {
                allOrders: [],
                favorites: [],
                recentOrders: []
            },
            isAdmin: false
        });
        const cust2 = await customerInfo.insertOne({
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@gmail.com",
            phone: "123456789",
            dob: new Date("2001-02-18T00:00:00.000Z"),
            timestamp: new Date(),
            restaurantInfo: {
                allOrders: [],
                favorites: [],
                recentOrders: []
            },
            isAdmin: true
        });

        console.log("Inserted Customers:", cust1.insertedId, cust2.insertedId);

        // 4. Insert Orders (using the menu items and customer IDs)
        const orderDetails = database.collection("OrderDetails");
        try {
            const order1 = await orderDetails.insertOne({
                customerId: cust1.insertedId,
                menuItemId: pongal.insertedId,
                restaurantId: veganBistro.insertedId,
                quantity: 2,
                date: new Date(),
                timestamp: new Date()
            });
            console.log("Inserted Order 1:", order1.insertedId);
        } catch (err) {
            console.error('Failed to insert Order 1:', err.message);
            if (err.errInfo && err.errInfo.details) {
                console.error('Order 1 Schema validation errors:', JSON.stringify(err.errInfo.details, null, 2));
            }
        }

        try {
            const order2 = await orderDetails.insertOne({
                customerId: cust2.insertedId,
                menuItemId: butterChicken.insertedId,
                restaurantId: spicyPalace.insertedId,
                quantity: 1,
                date: new Date(),
                timestamp: new Date()
            });
            console.log("Inserted Order 2:", order2.insertedId);
        } catch (err) {
            console.error('Failed to insert Order 2:', err.message);
            if (err.errInfo && err.errInfo.details) {
                console.error('Order 2 Schema validation errors:', JSON.stringify(err.errInfo.details, null, 2));
            }
        }

    } finally {
        await client.close();
    }
}

seedDatabase().catch(console.dir);

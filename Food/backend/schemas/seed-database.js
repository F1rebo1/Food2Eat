require('dotenv').config({ path: '.env.local' });

const { MongoClient, ObjectId } = require('mongodb');

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
        let pongal, butterChicken;
        try {
            pongal = await menuInfo.insertOne({
                restaurantId: veganBistro.insertedId,
                itemName: "Pongal",
                price: 7.99,
                categories: ["vegan", "vegetarian", "gluten free"],
                pictureURL: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/01/pongal-ven-pongal-500x500.jpg"
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
                pictureURL: "https://cafedelites.com/wp-content/uploads/2019/01/Butter-Chicken-IMAGE-64.jpg"
            });
            console.log("Inserted Butter Chicken Menu Item:", butterChicken.insertedId);
        } catch (err) {
            console.error('Failed to insert Butter Chicken Menu Item:', err.message);
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

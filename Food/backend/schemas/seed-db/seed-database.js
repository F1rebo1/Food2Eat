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
            cuisine: "South Indian",
            rating: 4.5,
            src: "https://www.worldofvegan.com/wp-content/uploads/2022/04/vegetarian-restaurant-vegan-food-near-me.webp",
        });
        const spicyPalace = await restaurantInfo.insertOne({
            restaurantName: "Spicy Palace",
            address: "456 Spice Avenue, Flavor Town",
            cuisine: "North Indian",
            rating: 4.7,
            src: "https://lh6.googleusercontent.com/proxy/_H7PnR3YLggOMju_hwEKcQvlDMhYvqCMePCYDwrBMGWm3s--TUsBtfP0nFwzAzau-TOlxR-c7leNhxrHjpxGhooanxvCSFuJ",
        });
        const churyce = await restaurantInfo.insertOne({
            restaurantName: "Churyce",
            address: "409 14th Ave SE, Minneapolis, MN 55414",
            cuisine: "Korean",
            rating: 4.7,
            src: "https://static.wixstatic.com/media/726e11_9c5baf1083534076a26060e53db62813~mv2.png/v1/fit/w_2500,h_1330,al_c/726e11_9c5baf1083534076a26060e53db62813~mv2.png",
        });
        const wallys = await restaurantInfo.insertOne({
            restaurantName: "Wally's Falafel and Hummus",
            address: "417 14th Ave SE, Minneapolis, MN 55414",
            cuisine: "Mediterranean",
            rating: 4.4,
            src: "https://images.happycow.net/venues/1024/18/12/hcmp181223_1422350.jpeg",
        });

        console.log("Inserted Restaurants:", veganBistro.insertedId, spicyPalace.insertedId, churyce.insertedId, wallys.insertedId);

        // 2. Insert Menu Items
        const menuInfo = database.collection("Menu");

        // Spicy Palace Menu Items
        const butterChicken = await menuInfo.insertOne({
            restaurantId: spicyPalace.insertedId,
            itemName: "Butter Chicken",
            price: 12.99,
            categories: ["spicy"],
            description: "A chicken curry made with a spiced tomato and butter (makhan) sauce",
            src: "https://cafedelites.com/wp-content/uploads/2019/01/Butter-Chicken-IMAGE-64.jpg",
        });
        
        const samosa = await menuInfo.insertOne({
            restaurantId: spicyPalace.insertedId,
            itemName: "Samosa",
            price: 4.99,
            categories: ["spicy"],
            description: "A crispy, deep-fried pastry snack filled with vegetables, spiced potatoes, onions and peas",
            src: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/12/samosa-recipe.jpg",
        });

        console.log("Inserted Spicy Palace Menu Items:", butterChicken.insertedId, samosa.insertedId);

        // Vegan Bistro Menu Items
        const pongal = await menuInfo.insertOne({
            restaurantId: veganBistro.insertedId,
            itemName: "Pongal",
            price: 7.99,
            categories: ["vegan", "vegetarian", "gluten free"],
            description: "A rice and lentil porridge, made with black pepper, ginger, turmeric, cashews, cumin, curry leaves, ghee (clarified butter), mung beans, and salt",
            src: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/01/pongal-ven-pongal-500x500.jpg",
        });

        const idli = await menuInfo.insertOne({
            restaurantId: veganBistro.insertedId,
            itemName: "Idli",
            price: 6.99,
            categories: ["vegan", "vegetarian"],
            description: "A soft and fluffy steamed rice cake made from a batter of fermented rice",
            src: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/04/idli-recipe.jpg",
        });

        const gheeRoast = await menuInfo.insertOne({
            restaurantId: veganBistro.insertedId,
            itemName: "Idli",
            price: 6.99,
            categories: ["vegan", "vegetarian"],
            description: "A soft and fluffy steamed rice cake made from a batter of fermented rice",
            src: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/12/dosa-recipe.jpg",
        });

        console.log("Inserted Vegan Bistro Menu Items:", pongal.insertedId, idli.insertedId, gheeRoast.insertedId);

        // Churyce Menu Items
        // const bulgogiKimbap = await menuInfo.insertOne({
        //     restaurantId: churyce.insertedId,
        //     itemName: "Bulgogi Kimbap",
        //     price: 8.99,
        //     categories: ["savory"],
        //     description: "Bulgogi, carrot, pickled raddish, egg, lettuce, seasoned rice rolled with seaweed sheet.",
        //     src: "https://static.wixstatic.com/media/726e11_a468d132df4b4a5eb7b432f7ed00efcc~mv2.jpg/v1/fill/w_232,h_232,usm_1.20_1.00_0.01/file.webp",
        // });

        // const donkatsu = await menuInfo.insertOne({
        //     restaurantId: churyce.insertedId,
        //     itemName: "Donkatsu",
        //     price: 15.99,
        //     categories: ["savory"],
        //     description: "Pork cutlet with cabbage salad and rice topped with ChuRyce house sauce.",
        //     src: "https://static.wixstatic.com/media/726e11_fb89ca26fd9540a0bae19ae952767afb~mv2.jpg/v1/fill/w_232,h_232,usm_1.20_1.00_0.01/file.webp",
        // });

        // console.log("Inserted Churyce Menu Items:", bulgogiKimbap.insertedId, donkatsu.insertedId);

        // Wally's Menu Items
        const spicyMusahabWrap = await menuInfo.insertOne({
            restaurantId: wallys.insertedId,
            itemName: "Spicy Musahab Wrap",
            price: 9.99,
            categories: ["spicy"],
            description: "Wally’s special hot spicy grilled chicken thighs, yellow rice, lettuce, tomato, chili sauce and garlic sauce wrapped in our homemade wrap.",
            src: "https://images.happycow.net/venues/1024/18/12/hcmp181223_1422350.jpeg",
        });

        const hummus = await menuInfo.insertOne({
            restaurantId: wallys.insertedId,
            itemName: "Hummus",
            price: 7.99,
            categories: ["vegetarian"],
            description: "Creamy hummus served with pita bread.",
            src: "https://static.wikia.nocookie.net/supermarioglitchy4/images/5/59/Beeg_Yoshi.png/revision/latest?cb=20211222200333",
        });

        console.log("Inserted Wally's Menu Items:", spicyMusahabWrap.insertedId, hummus.insertedId);

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

        const cust3 = await customerInfo.insertOne({
            firstName: "Emily",
            lastName: "Smith",
            email: "emilysmith@gmail.com",
            phone: "3332221111",
            dob: new Date("1998-12-15T00:00:00.000Z"),
            timestamp: new Date(),
            restaurantInfo: {
                allOrders: [],
                favorites: [],
                recentOrders: []
            },
            isAdmin: false
        });

        const cust4 = await customerInfo.insertOne({
            firstName: "Michael",
            lastName: "Johnson",
            email: "michaelj@gmail.com",
            phone: "4445556666",
            dob: new Date("1987-07-25T00:00:00.000Z"),
            timestamp: new Date(),
            restaurantInfo: {
                allOrders: [],
                favorites: [],
                recentOrders: []
            },
            isAdmin: false
        });

        console.log("Inserted Customers:", cust1.insertedId, cust2.insertedId, cust3.insertedId, cust4.insertedId);

        // 4. Insert Orders
        const orderDetails = database.collection("OrderDetails");

        const order1 = await orderDetails.insertOne({
            customerId: cust1.insertedId,
            menuItemId: pongal.insertedId,
            restaurantId: veganBistro.insertedId,
            quantity: 2,
            date: new Date(),
            timestamp: new Date()
        });

        const order2 = await orderDetails.insertOne({
            customerId: cust2.insertedId,
            menuItemId: butterChicken.insertedId,
            restaurantId: spicyPalace.insertedId,
            quantity: 1,
            date: new Date(),
            timestamp: new Date()
        });

        // const order3 = await orderDetails.insertOne({
        //     customerId: cust3.insertedId,
        //     menuItemId: bulgogiKimbap.insertedId,
        //     restaurantId: churyce.insertedId,
        //     quantity: 3,
        //     date: new Date(),
        //     timestamp: new Date()
        // });

        const order4 = await orderDetails.insertOne({
            customerId: cust4.insertedId,
            menuItemId: hummus.insertedId,
            restaurantId: wallys.insertedId,
            quantity: 2,
            date: new Date(),
            timestamp: new Date()
        });

        // console.log("Inserted Orders:", order1.insertedId, order2.insertedId, order3.insertedId, order4.insertedId);
        console.log("Inserted Orders:", order1.insertedId, order2.insertedId, order4.insertedId);

    } finally {
        await client.close();
    }
}

seedDatabase().catch(console.dir);

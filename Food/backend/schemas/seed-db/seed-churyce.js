/*global process*/
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

import { MongoClient, ObjectId } from 'mongodb';

async function seedChuryceMenuItems() {
    const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db("Food-Backend-DB");
        const menuInfo = database.collection("Menu");

        // Fetch the Churyce restaurant ID
        const churyce = await database.collection("RestaurantInfo").findOne({ restaurantName: "Churyce" });

        if (!churyce) {
            console.error("Churyce restaurant not found in the database.");
            return;
        }

        const churyceId = churyce._id;

        // Array of Churyce menu items
        const churyceMenuItems = [
            {
                restaurantId: churyceId,
                itemName: "Original Tteokbokki",
                price: 24.99,
                categories: ["spicy", "savory"],
                description: "Rice cake, Fishcake, Cabbage, Sausages, Two Boiled Eggs, topped with Mozzarella Cheese in ChuRyce Original Spicy Sauce. Choose from Spicy level 1, 2, 3. Serves for 2 persons. (Sausages contain pork, beef, chicken)",
                src: "https://static.wixstatic.com/media/726e11_9c5baf1083534076a26060e53db62813~mv2.png"
            },
            {
                restaurantId: churyceId,
                itemName: "Rosé Tteokbokki",
                price: 25.99,
                categories: ["savory"],
                description: "Rice cake, Fishcake, Cabbage, Sausages, Two Boiled Eggs topped with Mozzarella Cheese in ChuRyce Rose Sauce. Serves for 2 persons. (Sausages contain pork, beef, chicken)",
                src: "https://static.wixstatic.com/media/726e11_9c5baf1083534076a26060e53db62813~mv2.png"
            },
            {
                restaurantId: churyceId,
                itemName: "Black Bean Tteokbokki",
                price: 27.99,
                categories: ["savory"],
                description: "Rice cake, Ground Beef, Fishcake, Sausages, Onion, Two Boiled Eggs in ChuRyce Black Bean Sauce. Serves for 2 persons. (Sausages contain pork, beef, chicken) (Spicy version available upon request)",
                src: "https://static.wixstatic.com/media/726e11_9c5baf1083534076a26060e53db62813~mv2.png"
            },
            {
                restaurantId: churyceId,
                itemName: "Spicy Mala Tteokbokki",
                price: 26.99,
                categories: ["spicy"],
                description: "Rice cake, Fishcake, Cabbage, Sausages, Two Boiled Eggs in ChuRyce Mala Sauce. Serves for 2 persons. (Sausages contain pork, beef, chicken)",
                src: "https://static.wixstatic.com/media/726e11_9c5baf1083534076a26060e53db62813~mv2.png"
            },
            {
                restaurantId: churyceId,
                itemName: "Vegetarian Kimbap",
                price: 7.99,
                categories: ["vegetarian"],
                description: "Fried tofu, carrot, pickled raddish, egg, lettuce, seasoned rice rolled with seaweed sheet.",
                src: "https://static.wixstatic.com/media/726e11_9c5baf1083534076a26060e53db62813~mv2.png"
            },
            {
                restaurantId: churyceId,
                itemName: "Bulgogi Kimbap",
                price: 8.99,
                categories: ["savory"],
                description: "Bulgogi, carrot, pickled raddish, egg, lettuce, seasoned rice rolled with seaweed sheet.",
                src: "https://static.wixstatic.com/media/726e11_a468d132df4b4a5eb7b432f7ed00efcc~mv2.jpg/v1/fill/w_232,h_232,usm_1.20_1.00_0.01/file.webp"
            },
            {
                restaurantId: churyceId,
                itemName: "Tuna Kimbap",
                price: 8.99,
                categories: ["savory"],
                description: "Onion mayo seasoned tuna, carrot, pickled raddish, egg, lettuce, seasoned rice rolled with seaweed sheet.",
                src: "https://static.wixstatic.com/media/726e11_9c5baf1083534076a26060e53db62813~mv2.png"
            },
            {
                restaurantId: churyceId,
                itemName: "Spam Kimbap",
                price: 8.99,
                categories: ["savory"],
                description: "Fried spam, carrot, pickled raddish, egg, lettuce, seasoned rice rolled with seaweed sheet.",
                src: "https://static.wixstatic.com/media/726e11_9c5baf1083534076a26060e53db62813~mv2.png"
            },
            {
                restaurantId: churyceId,
                itemName: "Cheese Kimbap",
                price: 7.99,
                categories: ["vegetarian"],
                description: "American cheese, carrot, pickled raddish, egg, lettuce, seasoned rice rolled with seaweed sheet.",
                src: "https://static.wixstatic.com/media/726e11_9c5baf1083534076a26060e53db62813~mv2.png"
            },
            {
                restaurantId: churyceId,
                itemName: "Bulgogi Rice Bowl",
                price: 8.99,
                categories: ["savory"],
                description: "Ground beef bulgogi, onion, kernel corn and special mayonnaise sauce",
                src: "https://static.wixstatic.com/media/726e11_9c5baf1083534076a26060e53db62813~mv2.png"
            },
            {
                restaurantId: churyceId,
                itemName: "Spam-Mayo Rice Bowl",
                price: 7.99,
                categories: ["savory"],
                description: "Spam, onion, kernel corn and special mayonnaise sauce with dried seaweed on top",
                src: "https://static.wixstatic.com/media/726e11_9c5baf1083534076a26060e53db62813~mv2.png"
            },
            {
                restaurantId: churyceId,
                itemName: "Tuna-Mayo Rice Bowl",
                price: 7.99,
                categories: ["savory"],
                description: "Tuna, onion, kernel corn and special mayonnaise sauce with dried seaweed on top",
                src: "https://static.wixstatic.com/media/726e11_9c5baf1083534076a26060e53db62813~mv2.png"
            },
            {
                restaurantId: churyceId,
                itemName: "Blossom Fries",
                price: 14.99,
                categories: ["savory"],
                description: "French fries with ground beef bulgogi topped with sunny side up egg and house special sauce",
                src: "https://static.wixstatic.com/media/726e11_9c5baf1083534076a26060e53db62813~mv2.png"
            },
            {
                restaurantId: churyceId,
                itemName: "Fishcake Soup",
                price: 12.99,
                categories: ["savory"],
                description: "Fishcake soup with green onion.",
                src: "https://static.wixstatic.com/media/726e11_9c5baf1083534076a26060e53db62813~mv2.png"
            },
            {
                restaurantId: churyceId,
                itemName: "Spicy Ramyun",
                price: 7.99,
                categories: ["spicy", "savory"],
                description: "Spicy Ramyun noodle soup with egg, thinly sliced fishcake topped with green onion.",
                src: "https://static.wixstatic.com/media/726e11_9c5baf1083534076a26060e53db62813~mv2.png"
            },
            {
                restaurantId: churyceId,
                itemName: "Spicy Cheese Ramyun",
                price: 8.99,
                categories: ["spicy", "savory"],
                description: "Spicy Ramyun noodle soup with American cheese, egg, thinly sliced fishcake topped with green onion.",
                src: "https://static.wixstatic.com/media/726e11_9c5baf1083534076a26060e53db62813~mv2.png"
            },
            {
                restaurantId: churyceId,
                itemName: "Seaweed Wrapped Glass Noodle",
                price: 6.99,
                categories: ["savory", "fried"],
                description: "6 pieces of seaweed wrapped glass noodles, perfect when dipped in tteokbokki sauce.",
                src: "https://static.wixstatic.com/media/726e11_9c5baf1083534076a26060e53db62813~mv2.png"
            },
            {
                restaurantId: churyceId,
                itemName: "Mandu",
                price: 6.99,
                categories: ["savory", "fried"],
                description: "Korean bulgogi dumplings. 6 pieces. (Vegetarian mandu available upon request)",
                src: "https://static.wixstatic.com/media/726e11_9c5baf1083534076a26060e53db62813~mv2.png"
            },
            {
                restaurantId: churyceId,
                itemName: "Cheese Stick",
                price: 5.99,
                categories: ["savory", "fried"],
                description: "6 pieces of cheese sticks.",
                src: "https://static.wixstatic.com/media/726e11_9c5baf1083534076a26060e53db62813~mv2.png"
            },
            {
                restaurantId: churyceId,
                itemName: "Shrimp",
                price: 8.99,
                categories: ["savory", "fried"],
                description: "6 pieces of fried shrimp.",
                src: "https://static.wixstatic.com/media/726e11_9c5baf1083534076a26060e53db62813~mv2.png"
            },
            {
                restaurantId: churyceId,
                itemName: "Sweet Potato",
                price: 4.99,
                categories: ["savory", "fried"],
                description: "6 pieces of fried sweet potato.",
                src: "https://static.wixstatic.com/media/726e11_9c5baf1083534076a26060e53db62813~mv2.png"
            },
            {
                restaurantId: churyceId,
                itemName: "Deep Fried Set",
                price: 12.99,
                categories: ["savory", "fried"],
                description: "Seaweed Wrapped Glass Noodle (2), Mandu (3), Cheese Stick (3), Shrimp (1), Sweet Potato (2)",
                src: "https://static.wixstatic.com/media/726e11_9c5baf1083534076a26060e53db62813~mv2.png"
            },
            {
                restaurantId: churyceId,
                itemName: "Sotteok Sotteok",
                price: 5.99,
                categories: ["savory", "snack"],
                description: "Deep fried rice cakes and sausages skewer with sweet & spicy special sauce. (Sausages contain pork, beef, chicken)",
                src: "https://static.wixstatic.com/media/726e11_9c5baf1083534076a26060e53db62813~mv2.png"
            },
            {
                restaurantId: churyceId,
                itemName: "Rice Cake Skewer",
                price: 5.99,
                categories: ["savory", "snack"],
                description: "Deep fried rice cakes skewer with sweet & spicy special sauce.",
                src: "https://static.wixstatic.com/media/726e11_9c5baf1083534076a26060e53db62813~mv2.png"
            },
            {
                restaurantId: churyceId,
                itemName: "Corn Cheese",
                price: 6.99,
                categories: ["savory", "snack"],
                description: "Kernel corn with special mayonnaise sauce and mozzarella cheese.",
                src: "https://static.wixstatic.com/media/726e11_9c5baf1083534076a26060e53db62813~mv2.png"
            },
            {
                restaurantId: churyceId,
                itemName: "Set A",
                price: 35.99,
                categories: ["set menu"],
                description: "Pick one Tteokbokki + Deep fried set",
                src: "https://static.wixstatic.com/media/726e11_9c5baf1083534076a26060e53db62813~mv2.png"
            },
            {
                restaurantId: churyceId,
                itemName: "Set B",
                price: 42.99,
                categories: ["set menu"],
                description: "Pick one Tteokbokki + Deep fried set + Pick one rice bowl",
                src: "https://static.wixstatic.com/media/726e11_9c5baf1083534076a26060e53db62813~mv2.png"
            },
        ];

        // Insert menu items into the database
        const result = await menuInfo.insertMany(churyceMenuItems);
        console.log("Inserted Churyce Menu Items:", result.insertedIds);

    } finally {
        await client.close();
    }
}

seedChuryceMenuItems().catch(console.dir);

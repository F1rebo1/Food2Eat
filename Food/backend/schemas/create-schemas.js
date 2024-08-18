/*global process*/
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

import { MongoClient } from 'mongodb';

async function createCollectionWithSchema() {
    const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db("Food-Backend-DB");

        const orderDetails = await database.createCollection("OrderDetails", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    title: "OrderDetails",
                    required: ["_id", "customerId", "menuItemId", "restaurantId", "quantity", "date", "timestamp"],
                    properties: {
                        _id: {
                            bsonType: "objectId"
                        },
                        customerId: {
                            bsonType: "objectId"  // References the _id from the CustomerInfo collection
                        },
                        menuItemId: {
                            bsonType: "objectId"  // References the _id from the Menu collection
                        },
                        restaurantId: {
                            bsonType: "objectId"  // References the _id from the RestaurantInfo collection
                        },
                        quantity: {
                            bsonType: "int"
                        },
                        date: {
                            bsonType: "date"
                        },
                        timestamp: {
                            bsonType: "date"
                        }
                    }
                }
            }
        });

        console.log("OrderDetails created with schema:", orderDetails.collectionName);

        const customerInfo = await database.createCollection("CustomerInfo", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    title: "CustomerInfo",
                    required: ["_id", "firstName", "lastName", "email", "phone", "dob", "timestamp", "isAdmin"],
                    properties: {
                        _id: {
                            bsonType: "objectId"
                        },
                        firstName: {
                            bsonType: "string"
                        },
                        lastName: {
                            bsonType: "string"
                        },
                        email: {
                            bsonType: "string"
                        },
                        phone: {
                            bsonType: "string"
                        },
                        dob: {
                            bsonType: "date"
                        },
                        timestamp: {
                            bsonType: "date"
                        },
                        isAdmin: {
                            bsonType: "bool"
                        },
                        // Define restaurantInfo as an object
                        restaurantInfo: {
                            bsonType: "object",
                            properties: {
                                allOrders: {
                                    bsonType: "array",  // Define allOrders as an array
                                    items: {
                                        bsonType: "objectId"  // Each item in the array is an ObjectId
                                    }
                                },
                                favorites: {
                                    bsonType: "array",  // Define favorites as an array
                                    items: {
                                        bsonType: "objectId",  // Each item in the array is an ObjectId
                                        description: "References the _id field in RestaurantInfo"
                                    }
                                },
                                recentOrders: {
                                    bsonType: "array",  // Define recentOrders as an array
                                    items: {
                                        bsonType: "objectId",  // Each item in the array is an ObjectId
                                        description: "References the _id field in OrderDetails"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        console.log("CustomerInfo created with schema:", customerInfo.collectionName);

        const menuInfo = await database.createCollection("Menu", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    title: "Menu",
                    required: ["_id", "restaurantId", "itemName", "price", "categories", "description"],
                    properties: {
                        _id: {
                            bsonType: "objectId"
                        },
                        restaurantId: {
                            bsonType: "objectId"  // References the _id from the RestaurantInfo collection
                        },
                        itemName: {
                            bsonType: "string"
                        },
                        price: {
                            bsonType: "double"
                        },
                        categories: {
                            bsonType: "array",
                            items: {
                                bsonType: "string"
                            }
                        },
                        description: {
                            bsonType: "string"
                        },
                        src: {
                            bsonType: "string"
                        },
                    }
                }
            }
        });

        console.log("MenuInfo created with schema:", menuInfo.collectionName);

        const restaurantInfo = await database.createCollection("RestaurantInfo", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    title: "RestaurantInfo",
                    required: ["_id", "restaurantName", "address", "cuisine", "rating"],
                    properties: {
                        _id: {
                            bsonType: "objectId"
                        },
                        restaurantName: {
                            bsonType: "string"
                        },
                        address: {
                            bsonType: "string"
                        },
                        cuisine: {
                            bsonType: "string"
                        },
                        rating: {
                            bsonType: "double"
                        },
                    }
                }
            }
        });

        console.log("RestaurantInfo created with schema:", restaurantInfo.collectionName);
    } finally {
        await client.close();
    }
}

createCollectionWithSchema().catch(console.dir);

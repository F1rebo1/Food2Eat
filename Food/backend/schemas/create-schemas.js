require('dotenv').config({ path: '.env.local' });

const { MongoClient } = require('mongodb');

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
                    required: ["_id", "product", "price", "quantity", "date", "timestamp", "restaurant"],
                    properties: {
                        _id: {
                            bsonType: "objectId"
                        },
                        product: {
                            bsonType: "string"
                        },
                        price: {
                            bsonType: "number"
                        },
                        quantity: {
                            bsonType: "number"
                        },
                        date: {
                            bsonType: "date"
                        },
                        timestamp: {
                            bsonType: "date"  // Changed from "timestamp" to "date"
                        },
                        restaurant: {
                            bsonType: "objectId"
                        }
                    }
                }
            }
        });

        const customerInfo = await database.createCollection("CustomerInfo", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    title: "CustomerInfo",
                    required: ["_id", "firstName", "lastName", "email", "phone", "dob", "timestamp"],
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
                            bsonType: "date"  // Changed from "timestamp" to "date"
                        },
                        restaurantInfo: {
                            bsonType: "object",  // Define restaurantInfo as an object
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
                                        bsonType: "objectId"  // Each item in the array is an ObjectId
                                    }
                                },
                                recentOrders: {
                                    bsonType: "array",  // Define recentOrders as an array
                                    items: {
                                        bsonType: "objectId"  // Each item in the array is an ObjectId
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        console.log("OrderDetails created with schema:", orderDetails.collectionName);
        console.log("CustomerInfo created with schema:", customerInfo.collectionName);
    } finally {
        await client.close();
    }
}

createCollectionWithSchema().catch(console.dir);

const { MongoClient, ServerApiVersion } = require('mongodb');

async function connect_to_database(URL, database_name) {
    // Creating a new MongoDB client with the specified URL
    const client = new MongoClient(URL, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    let database;
    let connection_status = false;

    try {
        // Connecting to the MongoDB Database
        await client.connect();
        
        console.log("MongoDB is connected.");
        connection_status = true;

        // Assigning MongoDB client to the working database
        database = client.db(database_name);

        // Return both database and connection status
        return { database, connection_status , client};

    } catch (error) {
        console.log("Error in connecting to the MongoDB database.");
        console.error(error);

        // Return null database and false connection status
        return { database: null, connection_status: false };

    }
}

module.exports = { connect_to_database };

require("dotenv").config()
const PORT = process.env.BACKEND_PORT || 4000
const {connect_to_database} = require("./mongo")
const express = require("express");
const cors = require('cors')
const app = express()

// Setting up the CORS to allow the Backend to send and receive jokes from any url or from the url used by the frontend/ web interface. 
app.use(cors({
    origin: "*"
}))

//Mongodb URL
const MONGODB_URL = process.env.MONGODB_URL

// Mongodb database name for the jokes
const Jokes_database_name = "JOKES";

// Converting the body of the requests to json to add jokes to the database when the client requests on the /addjokes route
app.use(express.json())

// Setting a default route so that we can check whether the backend is up and running or not.
app.get('/',(req, res)=>{
    
    res.send("Hello World")
})

// Sending jokes based on URL params
app.get('/jokes', async(req, res)=>{
    // Converting the NO_OF_JOKES URL query params to an integer value. 
    const NO_OF_JOKES = parseInt(req.query.NO_OF_JOKES);

    // The collection name for the jokes should be in the format LANGUAGE_JOKES e.g. ENGLISH_JOKES
    const LANGUAGE = req.query.LANGUAGE.toUpperCase();
    
    // Connecting to the database and fetching jokes
        let {database, connection_status, client} = await connect_to_database(MONGODB_URL, Jokes_database_name);
        // Handling error if the connection to the mongodb is not successful.
        if(connection_status == false){
            res.sendStatus(500).send("Server is facing some issues. /n Try again after few minutes")
        }
        else{
           // Sending jokes in the response by fetching jokes from the mongodb and converting it to a string.
           let jokes = JSON.stringify(await database.collection(`${LANGUAGE}_JOKES`).find().limit(NO_OF_JOKES).toArray());
           res.send(jokes)

           // Closing the database connection
           await client.close()
           console.log("Connection closed successfully.");
           
        }
    })


// Adding new jokes to a particular collection based on the LANGUAGE query
app.post("/addjokes", async(req, res)=>{

    // Collection name to which the new jokes should be added
    const collection_name = `${req.query.LANGUAGE.toUpperCase()}_JOKES`;
    
    // Adding "jokes" key to all the jokes received in the form of an array of jokes so that a proper structure of MongoDB document is created.
    const jokes_array = req.body.jokes.map(joke => ({ jokes: joke }));

    // Connecting to the database to add new jokes
    let {database, connection_status, client} = await connect_to_database(MONGODB_URL, Jokes_database_name);

    // Handling the error part if jokes are not added because the connection to the mongodb cannot be made.
    if (connection_status == false){
        res.sendStatus(500).send("Server is facing some issues. Jokes were not added. /n Try again after some time")
    }
    else{
        // Adding data to the collection
        await database.collection(collection_name).insertMany(jokes_array)

        // Closing the database connection
        await client.close()
        console.log("Connection closed successfully");
        
        // Sending resposne to the client if jokes are added successfully to the database.
        res.sendStatus(201).send("Jokes added successfully.")
        
    }


})



//Starting the Server
app.listen(PORT,()=>{
    console.log(`Server is listening on PORT ${PORT}`);
})
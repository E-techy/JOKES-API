require("dotenv").config()
const PORT = process.env.BACKEND_PORT || 4000
const {connect_to_database} = require("./mongo")
const express = require("express");
const cors = require('cors')
const app = express()

// Setting up the CORS to allow the web interface to connect to the Backend interface
app.use(cors({
    origin: "*"
}))

//Mongodb URL
const MONGODB_URL = process.env.MONGODB_URL

// Mongodb database name for the jokes
const Jokes_database_name = "JOKES";

// Converting the body of objects to json
app.use(express.json())


app.get('/',(req, res)=>{
    
    res.send("Hello World")
})

// Sending jokes based on URL params
app.get('/jokes', async(req, res)=>{
    const NO_OF_JOKES = parseInt(req.query.NO_OF_JOKES);

    // The collection name for the jokes should be in the format LANGUAGE_JOKES e.g. ENGLISH_JOKES
    const LANGUAGE = req.query.LANGUAGE.toUpperCase();
    
    // Connecting to the database and fetching jokes
        let {database, connection_status, client} = await connect_to_database(MONGODB_URL, Jokes_database_name);

        if(connection_status == false){
            res.sendStatus(500).send("Server is facing some issues. /n Try again after few minutes")
        }
        else{
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

    const jokes_array = req.body.jokes.map(joke => ({ jokes: joke }));

    // Connecting to the database to add new jokes
    let {database, connection_status, client} = await connect_to_database(MONGODB_URL, Jokes_database_name);

    if (connection_status == false){
        res.sendStatus(500).send("Server is facing some issues. Jokes were not added. /n Try again after some time")
    }
    else{
        // Adding data to the collection
        await database.collection(collection_name).insertMany(jokes_array)

        // Closing the database connection
        await client.close()
        console.log("Connection closed successfully");
        
        res.sendStatus(201).send("Jokes added successfully.")
        
    }


})



//Starting the Server
app.listen(PORT,()=>{
    console.log(`Server is listening on PORT ${PORT}`);
})
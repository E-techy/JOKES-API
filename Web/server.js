require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path'); 
const WebPORT = process.env.FRONTEND_PORT || 3000

// Serve static files from the "public" folder
app.use('/public', express.static(path.join(__dirname, 'public')));


app.get("/",(req,res)=>{
    res.sendFile(`${__dirname}/jokes-api.html`)
})


// Starting the frontend server
app.listen(WebPORT,()=>{
    console.log(`Web interface has started on PORT ${WebPORT}`)
})
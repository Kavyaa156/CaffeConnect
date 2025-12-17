//we need .env file
require('dotenv').config();

const express = require('express');

const cors = require('cors');

//import the routes
const cafeRoutes = require('./routes/cafes');

//we need mongoose
const mongoose = require('mongoose');

const port = 3000;

const app = express();

//use cors middleware
app.use(cors());

//middleware - to parse
app.use(express.json());

//prints path and method used
app.use((req, res, next) => { 
console.log(req.path, req.method)
next()
})

//use the routes
app.use('/api/cafes', cafeRoutes);
app.use('/api/cafes/:id', cafeRoutes)        

//test route
app.get('/api/test', (req, res) => {
    console.log("GET request successfull");
    res.send({message: "API working!"})
})

//connect to db
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {                           
        app.listen(port, ()=> {             
        console.log(`Connected to db & listening on port ${port}`);
        })
    })
    .catch((error) => {                     
        console.log(error)
    })




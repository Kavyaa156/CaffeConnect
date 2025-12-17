const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Defining the structure of data
const cafeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        
    },
    description: {
        type: String,
        
    },
    image: {
        type: String,
        required: true
    }
}, {timestamps: true})          //info about cafe:createdAt, updatedAt

//creates the model to work with db. export it for other code files
module.exports = mongoose.model("Cafe", cafeSchema)
//file with the all the logic(function)

const Cafe = require('../models/cafeModel');
const mongoose = require('mongoose')

//get all cafes
const getCafes = async (req, res) => {
    const cafes = await Cafe.find({}).sort({createdAt: -1})         //-1 will display the cafes in descending order. Newest cafes at top
    res.status(200).json(cafes)
}

//get a single cafe
const getCafe = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such cafe'})
    }
    const cafe = await Cafe.findById(id)
    if (!cafe) {
        return res.status(404).json({error: 'No such cafe'})
    }

    res.status(200).json(cafe)
}

//create new cafe
const createCafe = async (req, res) => {
    const {name, location, image, rating, description} = req.body

    //add doc in db
    try{
        const cafe = await Cafe.create({name, location, image, rating, description})
        res.status(200).json(cafe)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a cafe
const deleteCafe = async (req, res) => {
    const { id } = req.params           //access the properties of parameters
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such cafe'})
    }

    const cafe = await Cafe.findOneAndDelete({_id: id})         //_id is the property

    if (!cafe) {
        return res.status(404).json({error: 'No such cafe'})
    }

    res.status(202).json(cafe)
}

//update a cafe
const updateCafe = async (req, res) => {
    const { id } = req.params           
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such cafe'})
    }

    const cafe = await Cafe.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!cafe) {
        return res.status(404).json({error: 'No such cafe'})
    }

    res.status(202).json(cafe)
}

module.exports = {
    getCafes,
    getCafe,
    createCafe,
    deleteCafe,
    updateCafe
}
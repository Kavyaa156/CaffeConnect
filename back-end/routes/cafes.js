//all our routes in one place
const express = require('express');
const {
    createCafe,
    getCafes,
    getCafe,
    deleteCafe,
    updateCafe
} = require('../controllers/cafeController')

//we need express router
const router = express.Router()

//GET all cafes
router.get('/', getCafes)

//GET single cafe
router.get('/:id', getCafe)

//POST a cafe
router.post('/', createCafe)

//DELETE a cafe
router.delete('/:id', deleteCafe)

//UPDATE a cafe
router.patch('/:id', updateCafe)

//export this to server.js
module.exports = router
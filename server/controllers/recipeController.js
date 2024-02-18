const express = require('express');
const router = express.Router();
const User = require('../models/user');
const brycpt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const APP_ID = process.env.RECIPE_APP_ID;
const APP_KEY = process.env.RECIPE_APP_KEY;



const getRecipe = async (req, res) => {
    // console.log("Hello");
    const { query } = req.body;
    // console.log(query);
    try { 
        // console.log("Hello")
        const response = await axios.get(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
        // console.log(response.data.hits);
        return res.json(response.data.hits);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports = {getRecipe};
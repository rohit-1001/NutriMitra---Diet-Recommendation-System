const express = require('express');
const router = express.Router();

const {getRecipe} = require("../controllers/recipeController");

router.post('/getrecipe',getRecipe);

module.exports = router; 
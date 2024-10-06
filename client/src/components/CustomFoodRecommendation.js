import React, { useState } from "react";
import axios from "axios";
import { Slider, Box, Typography, Button, Grid, CircularProgress, TextField } from '@mui/material';
import { styled } from '@mui/system';
import DisplayRecommendations from './DisplayRecommendations';

// Custom styled slider for green theme
const GreenSlider = styled(Slider)(({ theme }) => ({
  color: 'green',
  '& .MuiSlider-thumb': {
    backgroundColor: 'white',
    border: '2px solid green',
  },
  '& .MuiSlider-track': {
    backgroundColor: 'green',
  },
}));

const CustomFoodRecommendation = () => {
  const [nutritionalValues, setNutritionalValues] = useState({
    calories: 1000,
    fatContent: 50,
    saturatedFatContent: 6,
    cholesterolContent: 150,
    sodiumContent: 1100,
    carbohydrateContent: 160,
    fiberContent: 25,
    sugarContent: 23,
    proteinContent: 25,
  });

  const [numberOfMeals, setNumberOfMeals] = useState(3);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [ingredients, setIngredients] = useState("");

  const handleChange = (name, value) => {
    setNutritionalValues({
      ...nutritionalValues,
      [name]: value,
    });
  };

  const handleMealNumberChange = (event, newValue) => {
    setNumberOfMeals(newValue);
  };

  const handleIngredientsChange = (event) => {
    setIngredients(event.target.value);
  };

  const generateRandomOffset = (value, maxValue) => {
    const offsetPercentage = Math.random() * 0.3 - 0.2;
    return Math.floor(value * offsetPercentage);
  };

  const generateRecommendations = async () => {
    setLoading(true);
    setShowRecommendations(false);
    const generatedRecommendations = [];

    try {
      const jwtToken = localStorage.getItem("token");
      const meals = getMeals(numberOfMeals);
      const ingredientsList = ingredients.split(',').map(item => item.trim());

      for (const meal of meals) {
        const modifiedNutritionalValues = Object.keys(nutritionalValues).reduce((acc, key) => {
          const maxValues = {
            calories: 500,
            fatContent: 100,
            saturatedFatContent: 13,
            cholesterolContent: 300,
            sodiumContent: 400,
            carbohydrateContent: 325,
            fiberContent: 50,
            sugarContent: 46,
            proteinContent: 50,
          };

          const randomOffset = generateRandomOffset(nutritionalValues[key], maxValues[key]);
          acc[key] = nutritionalValues[key] + randomOffset;
          return acc;
        }, {});

        const response = await axios.post(
          "http://localhost:8000/predict",
          {
            nutrition_input: Object.values(modifiedNutritionalValues),
            ingredients: ingredientsList,
            params: { n_neighbors: 5, return_distance: false },
          },
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        generatedRecommendations.push(response.data.output);
      }
      console.log("RESPONSE FROM CUSTOM RECOMMENDATION: ", generatedRecommendations);
      setRecommendations(generatedRecommendations);
      setShowRecommendations(true);
    } catch (error) {
      console.error("Error generating custom recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  const getMeals = (number) => {
    const mealOptions = {
      3: ["Breakfast", "Lunch", "Dinner"],
      4: ["Breakfast", "Lunch", "Dinner", "Morning Snack"],
      5: ["Breakfast", "Lunch", "Dinner", "Morning Snack", "Afternoon Snack"],
    };

    return mealOptions[number] || [];
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    generateRecommendations();
  };

  const slidersData = [
    { label: 'Calories', key: 'calories', min: 0, max: 2000 },
    { label: 'Fat Content', key: 'fatContent', min: 0, max: 100 },
    { label: 'Saturated Fat Content', key: 'saturatedFatContent', min: 0, max: 13 },
    { label: 'Cholesterol Content', key: 'cholesterolContent', min: 0, max: 300 },
    { label: 'Sodium Content', key: 'sodiumContent', min: 0, max: 2300 },
    { label: 'Carbohydrate Content', key: 'carbohydrateContent', min: 0, max: 325 },
    { label: 'Fiber Content', key: 'fiberContent', min: 0, max: 50 },
    { label: 'Sugar Content', key: 'sugarContent', min: 0, max: 40 },
    { label: 'Protein Content', key: 'proteinContent', min: 0, max: 40 },
  ];

  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom>
        Customize Your Nutritional Values
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" flexDirection="column" alignItems="stretch">
              <Typography
                variant="body1"
                style={{ marginBottom: 8, color: 'grey', textAlign: 'left', marginLeft: "1.5em", fontSize: "0.9em" }}>
                Number of Meals:
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="caption" style={{ width: '40px' }}>3</Typography>
                <Box width="100%">
                  <GreenSlider
                    value={numberOfMeals}
                    onChange={handleMealNumberChange}
                    min={3}
                    max={5}
                    step={1}
                    marks
                    valueLabelDisplay="auto"
                  />
                </Box>
                <Typography variant="caption" style={{ width: '40px', textAlign: 'right' }}>5</Typography>
              </Box>
            </Box>
          </Grid>

          {slidersData.map(({ label, key, min, max }) => (
            <Grid item xs={12} key={key}>
              <Box display="flex" flexDirection="column" alignItems="stretch">
                <Typography
                  variant="body1"
                  style={{ marginBottom: 8, color: 'grey', textAlign: 'left', marginLeft: "1.5em", fontSize: "0.9em" }}>
                  {label}:
                </Typography>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="caption" style={{ width: '40px' }}>{min}</Typography>
                  <Box width="100%">
                    <GreenSlider
                      value={nutritionalValues[key]}
                      onChange={(event, newValue) => handleChange(key, newValue)}
                      min={min}
                      max={max}
                      step={1}
                      valueLabelDisplay="auto"
                    />
                  </Box>
                  <Typography variant="caption" style={{ width: '40px', textAlign: 'right' }}>{max}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Enter ingredients (comma separated)"
            variant="outlined"
            value={ingredients}
            onChange={handleIngredientsChange}
            placeholder="e.g. tomato, chicken, rice"
          />
        </Grid>
        <Button
          type="submit"
          variant="contained"
          style={{
            margin: "20px auto",
            display: "block",
            width: "150px",
            borderRadius: "20px",
            color: "white",
            backgroundColor: "#168445",
          }}
        >
          Submit
        </Button>
      </form>

      {loading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress color="success" />
        </Box>
      )}

      {showRecommendations && recommendations.length > 0 && (
        <Box sx={{ mt: 2, width: '100%' }}>
          <DisplayRecommendations
            details={{
              recommendations,
              mealsPerDay: numberOfMeals,
              requiredCalories: nutritionalValues.calories,
              meals: getMeals(numberOfMeals),
              nutrition: [
                { id: 'calories', value: nutritionalValues.calories, label: 'Calories' },
                { id: 'fat', value: nutritionalValues.fatContent, label: 'Fat Content' },
                { id: 'saturatedFat', value: nutritionalValues.saturatedFatContent, label: 'Saturated Fat Content' },
                { id: 'cholesterol', value: nutritionalValues.cholesterolContent, label: 'Cholesterol Content' },
                { id: 'sodium', value: nutritionalValues.sodiumContent, label: 'Sodium Content' },
                { id: 'carbohydrate', value: nutritionalValues.carbohydrateContent, label: 'Carbohydrate Content' },
                { id: 'fiber', value: nutritionalValues.fiberContent, label: 'Fiber Content' },
                { id: 'sugar', value: nutritionalValues.sugarContent, label: 'Sugar Content' },
                { id: 'protein', value: nutritionalValues.proteinContent, label: 'Protein Content' },
              ]
            }}
          />
        </Box>
      )}
    </div>
  );
};

export default CustomFoodRecommendation;
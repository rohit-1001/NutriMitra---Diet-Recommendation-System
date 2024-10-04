import React, { useState } from "react";
import axios from "axios";
import { Slider, Box, Typography, Button, Grid, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import DisplayRecommendations from './DisplayRecommendations'; // Import your DisplayRecommendations component

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
  // State to capture custom nutritional inputs
  const [nutritionalValues, setNutritionalValues] = useState({
    calories: 500,
    fatContent: 100,
    saturatedFatContent: 13,
    cholesterolContent: 300,
    sodiumContent: 400,
    carbohydrateContent: 325,
    fiberContent: 50,
    sugarContent: 46,
    proteinContent: 50,
  });

  // States for recommendations and loading spinner
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false); // To control when to show recommendations
  const generatedRecommendations = [];
  // Handle slider value change
  const handleChange = (name, value) => {
    setNutritionalValues({
      ...nutritionalValues,
      [name]: value,
    });
  };

  // Function to generate custom recommendations based on the input
  const generateRecommendations = async () => {
    setLoading(true); // Show loading spinner while fetching data
    setShowRecommendations(false); // Hide recommendations while fetching
    try {
      const jwtToken = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/predict", // Assuming this is the same API used in UserForm.js
        {
          nutrition_input: Object.values(nutritionalValues), // Sending the custom nutrition values
          ingredients: [], // Assuming no ingredients input for now
          params: { n_neighbors: 5, return_distance: false }, // Assuming these are the same parameters
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log("Hello world")
      console.log("RESPONSE FROM CUSTOM RECOMMENDATION: ", response.data.output);
      generatedRecommendations.push(response.data.output);
      setRecommendations(generatedRecommendations); // Set the recommendations received from the API
      setShowRecommendations(true); // Show the recommendations after fetching
    } catch (error) {
      console.error("Error generating custom recommendations:", error);
    } finally {
      setLoading(false); // Hide the loading spinner
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    generateRecommendations(); // Generate custom recommendations on form submit
  };

  // Sliders data for each nutritional parameter
  const slidersData = [
    { label: 'Calories', key: 'calories', min: 0, max: 2000 },
    { label: 'Fat Content', key: 'fatContent', min: 0, max: 100 },
    { label: 'Saturated Fat Content', key: 'saturatedFatContent', min: 0, max: 100 },
    { label: 'Cholesterol Content', key: 'cholesterolContent', min: 0, max: 500 },
    { label: 'Sodium Content', key: 'sodiumContent', min: 0, max: 2000 },
    { label: 'Carbohydrate Content', key: 'carbohydrateContent', min: 0, max: 500 },
    { label: 'Fiber Content', key: 'fiberContent', min: 0, max: 100 },
    { label: 'Sugar Content', key: 'sugarContent', min: 0, max: 100 },
    { label: 'Protein Content', key: 'proteinContent', min: 0, max: 100 },
  ];

  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom>
        Customize Your Nutritional Values
      </Typography>

      {/* Form for sliders */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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

      {/* Show loading spinner when fetching recommendations */}
      {loading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress color="success" />
        </Box>
      )}

      {/* Display recommendations using DisplayRecommendations component */}
      {showRecommendations && recommendations.length > 0 && (
        <Box mt={2}>
          <DisplayRecommendations 
            details={{
              recommendations,
              mealsPerDay: 3, // Example value; replace with actual data if necessary
              requiredCalories: 3, // Example value; you can adjust as needed
              meals: ["Breakfast", "Lunch", "Dinner"], // Provide meals names as per your requirements
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
              ] // Pass nutrition values as an array of objects
            }} 
          />
        </Box>
      )}
    </div>
  );
};

export default CustomFoodRecommendation;

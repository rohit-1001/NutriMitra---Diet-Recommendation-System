import React, { useState } from 'react';
import { Slider, Box, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';

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

function CustomFoodRecommendation() {
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

  const handleChange = (name, value) => {
    setNutritionalValues({
      ...nutritionalValues,
      [name]: value,
    });
  };

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
      <Grid container spacing={2}>
        {slidersData.map(({ label, key, min, max }) => (
          <Grid item xs={12} key={key}>
            <Box display="flex" flexDirection="column" alignItems="stretch">
              <Typography variant="body1" style={{ marginBottom: 8, color: 'grey', textAlign: 'left', marginLeft: "1.5em", fontSize: "0.9em" }}>
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
      <Box mt={2}>
        <Typography variant="h6">Selected Values:</Typography>
        <ul style={{
            textAlign: "left"
        }}>
          {Object.entries(nutritionalValues).map(([key, value]) => (
            <li key={key}>{key}: {value}</li>
          ))}
        </ul>
      </Box>
    </div>
  );
}

export default CustomFoodRecommendation;

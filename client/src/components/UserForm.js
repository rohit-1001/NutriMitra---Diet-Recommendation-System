import React, { useEffect, useState } from "react";
import "../../src/App.css";
import BMICalculator from "./BMICalculator";
import DisplayCalories from "./DisplayCalories";
import axios from "axios";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  select: {
    "& label": {
      color: "#168445", // Change label color to green after input
    },
  },
  menuItem: {
    marginTop: theme.spacing(1), // Add margin top to menu items
  },
  labelRoot: {
    color: "#168445 !important", // Change label color to green
  },
  textField: {
    "& label": {
      color: "#168445", // Change label color to green after input
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green", // Change color of the underline after input
    },
  },
  selectField: {
    "& .MuiSelect-root": {
      "&:after": {
        borderBottomColor: "green", // Change color of the underline after input in select menu
      },
    },
  },
  // select: {
  //   "&:focus": {
  //     backgroundColor: "transparent", // Remove default blue color on focus
  //   },
  // },
}));

const UserForm = () => {
  const classes = useStyles();
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [weightLossPlan, setWeightLossPlan] = useState("");
  const [mealsPerDay, setMealsPerDay] = useState("");
  const [meals_calories_perc, setMealCalories] = useState({});
  const [weight_loss, setWeightLoss] = useState(0);
  const [recommendations, setRecommendations] = useState([]);

  const [show, setShow] = useState(false);

  // const plans = [
  //   "Maintain weight",
  //   "Mild weight loss",
  //   "Weight loss",
  //   "Extreme weight loss",
  // ];
  // const weights = [1, 0.9, 0.8, 0.6];
  // const losses = ["-0 kg/week", "-0.25 kg/week", "-0.5 kg/week", "-1 kg/week"];

  const calculateBMR = () => {
    if (gender === "Male") {
      return (
        10 * parseInt(weight) +
        6.25 * parseInt(height) -
        5 * parseInt(age) +
        5
      );
    } else {
      return (
        10 * parseInt(weight) +
        6.25 * parseInt(height) -
        5 * parseInt(age) -
        161
      );
    }
  };

  const caloriesCalculator = () => {
    const activities = [
      "Little/no exercise",
      "Light exercise",
      "Moderate exercise (3-5 days/wk)",
      "Very active (6-7 days/wk)",
      "Extra active (very active & physical job)",
    ];
    const weights2 = [1.2, 1.375, 1.55, 1.725, 1.9];
    const weight = weights2[activities.indexOf(activityLevel)];
    const maintainCalories = calculateBMR() * weight;
    console.log("BMR CALCULATED:", calculateBMR());
    console.log("maintainCalories CALCULATED:", maintainCalories);
    return maintainCalories;
  };

  const rnd = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };


  useEffect(() => {
    if (mealsPerDay === 3) {
      setMealCalories({
        breakfast: 0.35,
        lunch: 0.4,
        dinner: 0.25,
      });
    } else if (mealsPerDay === 4) {
      setMealCalories({
        breakfast: 0.3,
        morningsnack: 0.05,
        lunch: 0.4,
        dinner: 0.25,
      });
    } else {
      setMealCalories({
        breakfast: 0.3,
        morningsnack: 0.05,
        lunch: 0.4,
        afternoonsnack: 0.05,
        dinner: 0.2,
      });
    }

    console.log("MEALS Calories setted")
  }, [mealsPerDay]);

  const generate_recommendations = async () => {
    console.log("I am punching weight_loss here " + weight_loss);
    const total_calories = weight_loss * caloriesCalculator();
    console.log("I am kicking here" + total_calories);
    const generatedRecommendations = [];
    for (const meal in meals_calories_perc) {
      const meal_calories = meals_calories_perc[meal] * total_calories;
      let recommended_nutrition;
      if (meal === "breakfast") {
        recommended_nutrition = [
          meal_calories,
          rnd(10, 30),
          rnd(0, 4),
          rnd(0, 30),
          rnd(0, 400),
          rnd(40, 75),
          rnd(4, 10),
          rnd(0, 10),
          rnd(30, 100),
        ];
      } else if (meal === "lunch" || meal === "dinner") {
        recommended_nutrition = [
          meal_calories,
          rnd(20, 40),
          rnd(0, 4),
          rnd(0, 30),
          rnd(0, 400),
          rnd(40, 75),
          rnd(4, 20),
          rnd(0, 10),
          rnd(50, 175),
        ];
      } else {
        recommended_nutrition = [
          meal_calories,
          rnd(10, 30),
          rnd(0, 4),
          rnd(0, 30),
          rnd(0, 400),
          rnd(40, 75),
          rnd(4, 10),
          rnd(0, 10),
          rnd(30, 100),
        ];
      }
      console.log("RECOMMENDED NUTRITION", recommended_nutrition);
      try {
        const jwtToken = localStorage.getItem('token');
        const response = await axios.post("http://localhost:8000/predict", {
          nutrition_input: recommended_nutrition,
          ingredients: [],
          params: { n_neighbors: 5, return_distance: false }
        }, {
          headers: {
            'Authorization': `Bearer ${jwtToken}`
          }
        });

        console.log("RESPONSE FROM RECOMMENDATION: ", response.data)

        generatedRecommendations.push(response.data.output);
      } catch (error) {
        console.error("Error generating recommendations:", error);
      }
    }
    // recommendations.forEach((recommendation) => {
    //   recommendation.forEach((recipe) => {
    //     recipe["image_link"] = find_image(recipe["Name"]);
    //   });
    // });
    setRecommendations(recommendations);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    generate_recommendations();
    setShow(true);
    // Here you can make your API call to send the form data to the backend
    console.log({
      age,
      height,
      weight,
      gender,
      activityLevel,
      weightLossPlan,
      mealsPerDay,
    });
  };

  // const handleWeightLossPlanChange = (event) => {
  //   console.log("SELECTED INDEX:", event.target)
  //   const selectedIndex = event.target.selectedIndex;
  //   setWeightLoss(selectedIndex);
  //   const selectedValue = event.target.value;
  //   setWeightLossPlan(selectedValue);
  // };

  const handleWeightLossPlanChange = (event) => {
    const valueIndex = event.target.value.split(';');
    const selectedValue = valueIndex[0]; // the plan name
    const selectedIndex = parseInt(valueIndex[1], 10); // the index
  
    setWeightLossPlan(selectedValue);
    setWeightLoss(selectedIndex);
  
    console.log("Selected Plan:", selectedValue, "Index:", selectedIndex);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          fullWidth
          margin="normal"
          className={classes.textField}
        />
        <TextField
          label="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          fullWidth
          margin="normal"
          className={classes.textField}
        />
        <TextField
          label="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          fullWidth
          margin="normal"
          className={classes.textField}
        />
        <FormControl className={classes.formControl} fullWidth margin="normal">
          <InputLabel classes={{ root: classes.labelRoot }}>Gender</InputLabel>
          <Select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className={classes.select}
          >
            <MenuItem value="Male" className={classes.menuItem}>
              Male
            </MenuItem>
            <MenuItem value="Female" className={classes.menuItem}>
              Female
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} fullWidth margin="normal">
          <InputLabel classes={{ root: classes.labelRoot }}>
            Activity Level
          </InputLabel>
          <Select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            className={classes.select}
          >
            {[
              "Little/no exercise",
              "Light exercise",
              "Moderate exercise (3-5 days/wk)",
              "Very active (6-7 days/wk)",
              "Extra active (very active & physical job)",
            ].map((activity, index) => (
              <MenuItem
                key={index}
                value={activity}
                className={classes.menuItem}
              >
                {activity}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} fullWidth margin="normal">
          <InputLabel classes={{ root: classes.labelRoot }}>
            Choose your weight loss plan
          </InputLabel>
          <Select
            value={weightLossPlan}
            // onChange={(e) => setWeightLossPlan(e.target.value)}
            onChange={handleWeightLossPlanChange}
            className={classes.selectField}
            renderValue={(selected) => `${selected.split(';')[0]}`}
          >
            {[
              "Maintain weight",
              "Mild weight loss",
              "Weight loss",
              "Extreme weight loss",
            ].map((plan, index) => (
              <MenuItem
                key={index}
                value={`${plan};${index}`}
                className={classes.selectField}
              >
                {plan}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} fullWidth margin="normal">
          <InputLabel classes={{ root: classes.labelRoot }}>
            Meals per day
          </InputLabel>
          <Select
            value={mealsPerDay}
            onChange={(e) => setMealsPerDay(e.target.value)}
            className={classes.select}
          >
            {[3, 4, 5].map((meal, index) => (
              <MenuItem key={index} value={meal} className={classes.menuItem}>
                {meal}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          style={{
            margin: "0 auto",
            display: "block",
            width: "150px",
            borderRadius: "20px",
            color: "white",
            marginTop: "20px",
            backgroundColor: "#168445",
          }}
        >
          Submit
        </Button>
      </form>

      <div>
        {show && (
          <BMICalculator
            age={age}
            height={height}
            weight={weight}
            gender={gender}
          />
        )}
      </div>
      <div>
        {show && (
          <DisplayCalories
            person={{
              age,
              height,
              weight,
              gender,
              activityLevel,
              weightLossPlan,
              mealsPerDay,
            }}
          ></DisplayCalories>
        )}
      </div>
    </>
  );
};

export default UserForm;

import React, { useState } from "react";
import "../../src/App.css";
import BMICalculator from "./BMICalculator";
import DisplayCalories from "./DisplayCalories";
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
  const [show, setShow] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
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
            onChange={(e) => setWeightLossPlan(e.target.value)}
            className={classes.selectField}
          >
            {[
              "Maintain weight",
              "Mild weight loss",
              "Weight loss",
              "Extreme weight loss",
            ].map((plan, index) => (
              <MenuItem
                key={index}
                value={plan}
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

      <div>{show && <BMICalculator age={age} height={height} weight={weight} gender={gender}/>}</div>
      <div>{show && <DisplayCalories person={{age,height,weight,gender,activityLevel,weightLossPlan,mealsPerDay}}></DisplayCalories>}</div>
    </>
  );
};

export default UserForm;

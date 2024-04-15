import React, { useEffect } from "react";

const DisplayCalories = ({ person }) => {
  console.log("INSIDE DisplayCalories.js", person);
  const plans = [
    "Maintain weight",
    "Mild weight loss",
    "Weight loss",
    "Extreme weight loss",
  ];
  const weights = [1, 0.9, 0.8, 0.6];
  const losses = ["-0 kg/week", "-0.25 kg/week", "-0.5 kg/week", "-1 kg/week"];
  

  const calculateBMR = () => {
    if (person.gender === "Male") {
      return (
        10 * parseInt(person.weight) +
        6.25 * parseInt(person.height) -
        5 * parseInt(person.age) +
        5
      );
    } else {
      return (
        10 * parseInt(person.weight) +
        6.25 * parseInt(person.height) -
        5 * parseInt(person.age) -
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
    const weights = [1.2, 1.375, 1.55, 1.725, 1.9];
    const weight = weights[activities.indexOf(person.activityLevel)];
    const maintainCalories = calculateBMR() * weight;
    console.log("BMR CALCULATED:", calculateBMR());
    console.log("maintainCalories CALCULATED:", maintainCalories);
    return maintainCalories;
  };

  return (
    <>
      <div
        style={{
          fontSize: "1.3rem",
          fontWeight: "bold",
          //  textDecoration: 'underline'
          marginTop: "2em",
          // border: '1px solid grey',
          backgroundColor: "lightgrey",
          padding: "0.5em",
        }}
      >
        CALORIES CALCULATOR
      </div>
      <p
        style={{
          // border: '1px solid grey',
          fontSize: "0.9rem",
          color: "grey",
          margin: "0.5rem 0",
        }}
      >
        The results below show a number of daily calorie estimates that can be
        used as a guideline for how many calories to consume each day to
        maintain, lose, or gain weight at a chosen rate.
      </p>
      <div style={{ display: "flex" }}>
        {plans.map((plan, index) => (
          <div
            key={index}
            style={{ flex: 1, textAlign: "center", padding: "10px" }}
          >
            <div
              style={{
                fontSize: "0.8rem",
                marginTop: "0.4rem",
              }}
            >
              {plan}
            </div>
            <div
              style={{
                fontSize: "1.2rem",
                fontWeight: "bolder",
              }}
            >{`${Math.round(
              caloriesCalculator() * weights[index]
            )} Calories/day`}</div>
            <p
              style={{
                fontSize: "1rem",
                color: "#168445",
                // margin: "0.5rem 0",
              }}
            >{` \u2193 ${losses[index]}`}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default DisplayCalories;

import React, { useEffect, useState } from 'react';

const BMICalculator = (props) => {
  const [bmiResult, setBMIResult] = useState('');
  const age = props.age;
  const height = props.height;
  const weight = props.weight;
  const gender = props.gender;
  const [category, setCategory] = useState('');
  const [bmi, setBMI] = useState('');
  const healthyRange = '18.5 kg/m² - 25 kg/m²';

  const calculateBMI = () => {
    const bmiValue = (weight / ((height / 100) ** 2)).toFixed(2);
    setBMI(bmiValue);
    if (bmiValue < 18.5) {
      setCategory('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setCategory('Normal weight');
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setCategory('Overweight');
    } else {
      setCategory('Obese');
    }
  };

  useEffect(() => {
    calculateBMI();
  }, []);

  const categoryStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };

  let categoryColor = '';
  switch (category) {
    case 'Underweight':
      categoryColor = '#3498db'; // blue
      break;
    case 'Normal weight':
      categoryColor = '#2ecc71'; // green
      break;
    case 'Overweight':
      categoryColor = '#f1c40f'; // yellow
      break;
    case 'Obese':
      categoryColor = '#e74c3c'; // red
      break;
    default:
      categoryColor = '#95a5a6'; // grey
  }

  return (
    <div style={{
        margin: '1.5rem 0',
    }}>
      <div style={{
         fontSize: '1.3rem',
         fontWeight: 'bold',
        //  textDecoration: 'underline'
         marginTop: '2em',
         // border: '1px solid grey',
         backgroundColor: 'lightgrey',
         padding: '0.5em',
      }}>BMI CALCULATOR</div>
      <div>
        <div style={{
            fontSize: '0.8rem',
            marginTop: '1rem',
        }}>Body Mass Index (BMI)</div>
        <div style={{
            fontSize: '1.2rem',
            fontWeight: 'bolder',
        }}>{bmi} kg/m²</div>
        <div style={{
            fontSize: '0.8rem',
            marginTop: '1rem',
        }}>Category : </div>
        <div style={{ ...categoryStyle, color: categoryColor }}>{category}</div>
        <div style={{
            fontSize: '1.1rem',
            fontWeight: 'bold',
            marginTop: '0.8rem',
        }}>Healthy BMI Range: {healthyRange}</div>
      </div>
    </div>
  );
};

export default BMICalculator;

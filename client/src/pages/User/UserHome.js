import React, { useState } from 'react';
import '../../css_files/userhome.css'; // Import the CSS file for styles
import UserForm from '../../components/UserForm';
import CustomFoodRecommendation from '../../components/CustomFoodRecommendation';

const UserHome = () => {
  const [selectedOption, setSelectedOption] = useState('dietRecommendation');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="container" style={{ margin: "2em auto" }}>
      {/* <h3 className="title">Diet Recommendation</h3> */}
      <div className="button-group">
  <button
    className={`button ${selectedOption === 'dietRecommendation' ? 'active' : 'inactive'}`}
    onClick={() => handleOptionChange('dietRecommendation')}
  >
    Diet Recommendation
  </button>
  <button
    className={`button ${selectedOption === 'customFoodRecommendation' ? 'active' : 'inactive'}`}
    onClick={() => handleOptionChange('customFoodRecommendation')}
  >
    Custom Food Recommendation
  </button>
</div>

      <div className="content">
        {selectedOption === 'dietRecommendation' && <UserForm />}
        {selectedOption === 'customFoodRecommendation' && <CustomFoodRecommendation />}
      </div>
    </div>
  );
};

export default UserHome;
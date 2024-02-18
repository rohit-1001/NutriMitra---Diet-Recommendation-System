import React, { useState } from 'react';
import Recipe from '../../components/Recipe';
import "../../css_files/recipes.css";
import axios from 'axios';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');

  const getRecipes = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/getrecipe`, { query: search });
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  return (
    <div>
    <br></br>
      <h1 className='heading-top'>Search for Recipes</h1><br />
      <form onSubmit={getRecipes} className="search-form">
        <input className='search-bar' type='text' value={search} onChange={updateSearch} />
        <button className='search-button' type="submit"> Search</button>
      </form>
      <div className='innerform'>
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  )
}

export default Recipes;

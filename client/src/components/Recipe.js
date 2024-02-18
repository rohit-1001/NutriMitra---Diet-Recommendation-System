import React from "react";
import style from "../css_files/Recipe.module.css" 
const Recipe = ({title,calories,image,ingredients}) =>{
    return(
        <div className={style.recipe}>
            <h1 >Title : {title}</h1>
            <p>Calories : {calories}</p>
            <ol>Ingredients :  {ingredients.map(ingredient =>(
                <li>{ingredient.text}</li>
            ))}</ol>
            <img className = {style.image}src={image} alt =''/>
        </div>
    );

};

export default Recipe
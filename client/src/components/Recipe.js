import React from "react";
import style from "../css_files/Recipe.module.css" 
const Recipe = ({title,calories,image,ingredients}) =>{
    return(
        <div style={{
            // border: '1px solid black',  
            borderRadius: '30px',
            width: '30%',
            margin: '10px',
            padding: "1rem",
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px',
              
            }}>
            <img className = {style.image}src={image} alt =''/>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                padding: '10px',
                textAlign: 'justify'
            
            }}>
            <h3>Title : {title}</h3>
            <h5>Calories : {calories}</h5>
            <ol><h5>Ingredients :</h5>
            {ingredients.map(ingredient =>(
                <li style={{
                    margin: "0 0 0 15px"
                }}>{ingredient.text}</li>
            ))}</ol>
            </div>
           
        </div>
    );

};

export default Recipe
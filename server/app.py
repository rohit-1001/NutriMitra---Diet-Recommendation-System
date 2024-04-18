# from flask import Flask, request, jsonify
# from flask_cors import CORS

# # Import your custom functions
# from model import recommend, output_recommended_recipes

# import pandas as pd

# # Load your dataset


# app = Flask(__name__)
# CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}})
# dataset = pd.read_csv('dataset2.csv', compression='gzip')
# @app.route("/")
# def home():
#     return jsonify({"health_check": "OK"})

# @app.route("/predict", methods=['POST'])
# def predict():
#     data = request.get_json()
    
#     nutrition_input = data.get('nutrition_input', [])
#     print("nutrition input:  " , nutrition_input)
#     ingredients = data.get('ingredients', [])
#     print("ingrediaents:  " , ingredients)
#     params = data.get('params', {'n_neighbors': 5, 'return_distance': False})
#     print("I am params" , params)

#     # Call your model function to get recommendations
#     recommendation_dataframe = recommend(dataset, nutrition_input, ingredients, params)

#     # if recommendation_dataframe is None or recommendation_dataframe.empty:
#     #     return jsonify({"error": "Not enough data to generate recommendations"}), 404

#     # output = output_recommended_recipes(recommendation_dataframe)

#     # response_data = {
#     #     "output": [{
#     #         "Name": recipe.get("Name"),
#     #         "CookTime": recipe.get("CookTime"),
#     #         "PrepTime": recipe.get("PrepTime"),
#     #         "TotalTime": recipe.get("TotalTime"),
#     #         "RecipeIngredientParts": recipe.get("RecipeIngredientParts"),
#     #         "Calories": recipe.get("Calories"),
#     #         "FatContent": recipe.get("FatContent"),
#     #         "SaturatedFatContent": recipe.get("SaturatedFatContent"),
#     #         "CholesterolContent": recipe.get("CholesterolContent"),
#     #         "SodiumContent": recipe.get("SodiumContent"),
#     #         "CarbohydrateContent": recipe.get("CarbohydrateContent"),
#     #         "FiberContent": recipe.get("FiberContent"),
#     #         "SugarContent": recipe.get("SugarContent"),
#     #         "ProteinContent": recipe.get("ProteinContent"),
#     #         "RecipeInstructions": recipe.get("RecipeInstructions")
#     #     } for recipe in output]
#     # }
#     return jsonify("Hlll")
#     return jsonify(response_data)

# if __name__ == "__main__":
#     app.run(debug=True, port=8000)


from fastapi import FastAPI
from pydantic import BaseModel, conlist
from typing import List, Optional
import pandas as pd
from model import recommend, output_recommended_recipes
from fastapi.middleware.cors import CORSMiddleware

dataset = pd.read_csv('dataset2.csv', compression='gzip')

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # List of allowed origins (you can use ["*"] for all origins)
    allow_credentials=True,
    allow_methods=["*"],  # List of allowed methods
    allow_headers=["*"],  # List of allowed headers
)

class Params(BaseModel):
    n_neighbors: int = 5
    return_distance: bool = False

class PredictionIn(BaseModel):
    nutrition_input: conlist(float, min_items=9, max_items=9)
    ingredients: List[str] = []
    params: Optional[Params]

class Recipe(BaseModel):
    Name: str
    CookTime: str
    PrepTime: str
    TotalTime: str
    RecipeIngredientParts: List[str]
    Calories: float
    FatContent: float
    SaturatedFatContent: float
    CholesterolContent: float
    SodiumContent: float
    CarbohydrateContent: float
    FiberContent: float
    SugarContent: float
    ProteinContent: float
    RecipeInstructions: List[str]

class PredictionOut(BaseModel):
    output: Optional[List[Recipe]] = None

@app.get("/")
def home():
    return {"health_check": "OK"}

@app.post("/predict/", response_model=PredictionOut)
def update_item(prediction_input: PredictionIn):
    recommendation_dataframe = recommend(dataset, prediction_input.nutrition_input, prediction_input.ingredients, prediction_input.params.dict())
    output = output_recommended_recipes(recommendation_dataframe)
    if output is None:
        return {"output": None}
    else:
        return {"output": output}


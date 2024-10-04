import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { PieChart } from "@mui/x-charts/PieChart";

const DisplayRecommendations = (props) => {
  const { recommendations, mealsPerDay, requiredCalories, meals, nutrition } = props.details;
  let data = nutrition.map((item) => ({
    id: item.id,
    value: item.value,
    label: item.label,
  }));

  const [currRecipe, setCurrRecipe] = useState({});
  const [open, setOpen] = React.useState(false);

  const handleOpen = (recipe) => {
    setCurrRecipe(recipe);
    console.log(recipe);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrRecipe({});
  };

  return (
    <>
      <div
        style={{
          fontSize: "1.3rem",
          fontWeight: "bold",
          marginTop: "2em",
          backgroundColor: "lightgrey",
          padding: "0.5em",
        }}
      >
        DIET RECOMMENDATOR
      </div>
      <div
        style={{
          fontSize: "1.2rem",
          fontWeight: "bolder",
          marginTop: "1em",
          marginBottom: "1em",
        }}
      >
        Recommended recipes:
      </div>
      <div style={{ display: "flex" }}>
        {recommendations.map((recipeArray, index) => (
          <div
            key={index}
            style={{
              marginRight: "20px",
              marginBottom: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <h3>{meals[index]}</h3>
            </div>
            <div
              key={index}
              style={{
                flex: 1,
                border: "1px solid black",
                padding: "10px",
              }}
            >
              {recipeArray.map((recipe, recipeIndex) => (
                <div
                  key={recipeIndex}
                  style={{ marginBottom: "10px", fontSize: "14px" }}
                >
                  <Button onClick={() => handleOpen(recipe)}>
                    {recipe.Name}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 1000,
            maxWidth: "90%",
            maxHeight: "90vh",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            style={{
              marginBottom: "20px",
            }}
          >
            {currRecipe.Name}
          </Typography>

          <div>
            <table
              style={{
                marginBottom: "20px",
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <tbody>
                <tr>
                  {["Calories", "Carbohydrate", "Protein", "Cholesterol", "Fat", "Fiber", "Saturated Fat", "Sodium", "Sugar Content"].map((header) => (
                    <td
                      key={header}
                      style={{
                        flex: "1",
                        border: "1px solid black",
                        padding: "5px",
                        backgroundColor: "lightgrey",
                        height: "30px",
                      }}
                    >
                      <strong>{header}</strong>
                    </td>
                  ))}
                </tr>
                <tr>
                  {["Calories", "CarbohydrateContent", "ProteinContent", "CholesterolContent", "FatContent", "FiberContent", "SaturatedFatContent", "SodiumContent", "SugarContent"].map((content) => (
                    <td
                      key={content}
                      style={{
                        flex: "1",
                        border: "1px solid black",
                        padding: "5px",
                      }}
                    >
                      {currRecipe[content] || "-"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <tbody>
                {[
                  { label: "Prep Time", value: `${currRecipe.PrepTime} minutes` },
                  { label: "Cook Time", value: `${currRecipe.CookTime} minutes` },
                  { label: "Total Time", value: `${currRecipe.TotalTime} minutes` },
                  { label: "Ingredients", value: currRecipe.RecipeIngredientParts && currRecipe.RecipeIngredientParts.join(", ") },
                ].map(({ label, value }) => (
                  <tr key={label}>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "5px",
                        backgroundColor: "lightgrey",
                      }}
                    >
                      <strong>{label}:</strong>
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "5px",
                      }}
                    >
                      {value}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      backgroundColor: "lightgrey",
                    }}
                  >
                    <strong>Instructions:</strong>
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                    }}
                  >
                    {currRecipe.RecipeInstructions &&
                      currRecipe.RecipeInstructions.map((instruction, index) => (
                        <div key={index}>
                          <strong>{index + 1}.</strong> {instruction}
                        </div>
                      ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default DisplayRecommendations;
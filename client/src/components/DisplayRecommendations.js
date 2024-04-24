import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import { PieChart } from "@mui/x-charts/PieChart";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DisplayRecommendations = (props) => {
  const { recommendations, mealsPerDay, requiredCalories, meals, nutrition } =
    props.details;
    let data = [];
    nutrition.map((item) => {
        data.push({
            id: item.id,
            value: item.value,
            label: item.label,
        });
    });
  const [currRecipe, setCurrRecipe] = useState({});

  const [open, setOpen] = React.useState(false);
  const handleOpen = (recipe) => {
    setCurrRecipe(recipe);
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
        {/* Map over each array of recipes */}
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
              {/* Map over each recipe in the array */}
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
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
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
                  <td
                    style={{
                      flex: "1",
                      border: "1px solid black",
                      padding: "5px",
                      backgroundColor: "lightgrey",
                      height: "30px",
                    }}
                  >
                    <strong>Calories</strong>
                  </td>
                  <td
                    style={{
                      flex: "1",
                      border: "1px solid black",
                      padding: "5px",
                      backgroundColor: "lightgrey",
                      height: "30px",
                    }}
                  >
                    <strong>Carbohydrate</strong>
                  </td>
                  <td
                    style={{
                      flex: "1",
                      border: "1px solid black",
                      padding: "5px",
                      backgroundColor: "lightgrey",
                      height: "30px",
                    }}
                  >
                    <strong>Protein</strong>
                  </td>
                  <td
                    style={{
                      flex: "1",
                      border: "1px solid black",
                      padding: "5px",
                      backgroundColor: "lightgrey",
                      height: "30px",
                    }}
                  >
                    <strong>Cholesterol</strong>
                  </td>
                  <td
                    style={{
                      flex: "1",
                      border: "1px solid black",
                      padding: "5px",
                      backgroundColor: "lightgrey",
                      height: "30px",
                    }}
                  >
                    <strong>Fat</strong>
                  </td>
                  <td
                    style={{
                      flex: "1",
                      border: "1px solid black",
                      padding: "5px",
                      backgroundColor: "lightgrey",
                      height: "30px",
                    }}
                  >
                    <strong>Fiber</strong>
                  </td>
                  <td
                    style={{
                      flex: "1",
                      border: "1px solid black",
                      padding: "5px",
                      backgroundColor: "lightgrey",
                      height: "30px",
                    }}
                  >
                    <strong>Saturated Fat</strong>
                  </td>
                  <td
                    style={{
                      flex: "1",
                      border: "1px solid black",
                      padding: "5px",
                      backgroundColor: "lightgrey",
                      height: "30px",
                    }}
                  >
                    <strong>Sodium</strong>
                  </td>
                  <td
                    style={{
                      flex: "1",
                      border: "1px solid black",
                      padding: "5px",
                      backgroundColor: "lightgrey",
                      height: "30px",
                    }}
                  >
                    <strong>Sugar Content</strong>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      flex: "1",
                      border: "1px solid black",
                      padding: "5px",
                    }}
                  >
                    {currRecipe.Calories || "-"}
                  </td>
                  <td
                    style={{
                      flex: "1",
                      border: "1px solid black",
                      padding: "5px",
                    }}
                  >
                    {currRecipe.CarbohydrateContent || "-"}
                  </td>
                  <td
                    style={{
                      flex: "1",
                      border: "1px solid black",
                      padding: "5px",
                    }}
                  >
                    {currRecipe.ProteinContent || "-"}
                  </td>
                  <td
                    style={{
                      flex: "1",
                      border: "1px solid black",
                      padding: "5px",
                    }}
                  >
                    {currRecipe.CholesterolContent || "-"}
                  </td>
                  <td
                    style={{
                      flex: "1",
                      border: "1px solid black",
                      padding: "5px",
                    }}
                  >
                    {currRecipe.FatContent || "-"}
                  </td>
                  <td
                    style={{
                      flex: "1",
                      border: "1px solid black",
                      padding: "5px",
                    }}
                  >
                    {currRecipe.FiberContent || "-"}
                  </td>
                  <td
                    style={{
                      flex: "1",
                      border: "1px solid black",
                      padding: "5px",
                    }}
                  >
                    {currRecipe.SaturatedFatContent || "-"}
                  </td>
                  <td
                    style={{
                      flex: "1",
                      border: "1px solid black",
                      padding: "5px",
                    }}
                  >
                    {currRecipe.SodiumContent || "-"}
                  </td>
                  <td
                    style={{
                      flex: "1",
                      border: "1px solid black",
                      padding: "5px",
                    }}
                  >
                    {currRecipe.SugarContent || "-"}
                  </td>
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
                <tr>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      backgroundColor: "lightgrey",
                    }}
                  >
                    <strong>Prep Time:</strong>
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                    }}
                  >
                    {currRecipe.PrepTime} minutes
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      backgroundColor: "lightgrey",
                    }}
                  >
                    <strong>Cook Time:</strong>
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                    }}
                  >
                    {currRecipe.CookTime} minutes
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      backgroundColor: "lightgrey",
                    }}
                  >
                    <strong>Total Time:</strong>
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                    }}
                  >
                    {currRecipe.TotalTime} minutes
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                      backgroundColor: "lightgrey",
                    }}
                  >
                    <strong>Ingredients:</strong>
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "5px",
                    }}
                  >
                    {currRecipe.RecipeIngredientParts &&
                      currRecipe.RecipeIngredientParts.length > 0 &&
                      currRecipe.RecipeIngredientParts.join(", ")}
                  </td>
                </tr>
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
                      currRecipe.RecipeInstructions.length > 0 &&
                      currRecipe.RecipeInstructions.map(
                        (instruction, index) => (
                          <div key={index}>
                            <strong>{index + 1}.</strong> {instruction}
                          </div>
                        )
                      )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Box>
      </Modal>
      {/* <PieChart
        series={[
          {
            data: data
          },
        ]}
        width={400}
        height={200}
      /> */}
    </>
  );
};

export default DisplayRecommendations;

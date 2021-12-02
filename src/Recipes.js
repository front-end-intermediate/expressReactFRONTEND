import React from "react";
import Recipe from "./Recipe";
import FormCreateRecipe from "./FormCreateRecipe";

import RecipesContext from "./RecipesContext";

function Recipes({ loggedin, addRecipe }) {
  return (
    <RecipesContext.Consumer>
      {(recipes) => (
        <summary>
          {loggedin && <FormCreateRecipe addRecipe={addRecipe} />}
          {recipes.map((recipe) => (
            <Recipe key={recipe._id} recipe={recipe} />
          ))}
        </summary>
      )}
    </RecipesContext.Consumer>
  );
}

export default Recipes;

import React from "react";
import Recipes from "./Recipes";
import RecipeDetail from "./RecipeDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [recipes, setRecipes] = React.useState([]);

  React.useEffect(() => {
    fetch(`/api/recipes`)
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  }, []);

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Recipes recipes={recipes} />} />
          <Route
            path="/:recipeId"
            element={<RecipeDetail recipes={recipes} />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;

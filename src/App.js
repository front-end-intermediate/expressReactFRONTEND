import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Recipes from "./Recipes";
import RecipeDetail from "./RecipeDetail";
import Nav from "./Nav";

import useFetch from "./hooks/useFetch";
import useToggle from "./hooks/useToggle";

function App() {
  const [recipes, setRecipes] = React.useState([]);
  const [loggedin, setLoggedin] = useToggle(true);
  const [loading, setLoading] = useToggle(true);
  const [error, setError] = React.useState("");
  const { get, post } = useFetch("/api/recipes");

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    setLoading(true);
    get("/api/recipes")
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((error) => setError(error))
      .finally(setLoading(false));
  }, []);

  const addRecipe = (recipe) => {
    post("/api/recipes", recipe).then((data) => {
      setRecipes([data, ...recipes]);
    });
  };

  if (loading === true) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <BrowserRouter>
        <Nav loggedin={loggedin} setLoggedin={setLoggedin} />
        <Routes>
          <Route
            path="/"
            element={
              <Recipes
                recipes={recipes}
                loggedin={loggedin}
                addRecipe={addRecipe}
              />
            }
          />
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

import React from "react";
import Recipes from "./Recipes";
import RecipeDetail from "./RecipeDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useFetch } from "./hooks/useFetch";
import Nav from "./Nav";
import useToggle from "./hooks/useToggle";
import RecipesContext from "./RecipesContext";

function App() {
  const [recipes, setRecipes] = React.useState([]);
  const [loggedin, setLoggedin] = useToggle(true);
  const [loading, setLoading] = useToggle(true);
  const [error, setError] = React.useState("");
  const { get, post, del, put } = useFetch(`/api/recipes`);

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    setLoading(true);
    get("/api/recipes")
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((error) => setError(error));
  }, []);

  const addRecipe = (recipe) => {
    post("/api/recipes", recipe).then((data) => {
      setRecipes([data, ...recipes]);
    });
  };

  const editRecipe = (updatedRecipe) => {
    put(`/api/recipes/${updatedRecipe._id}`, updatedRecipe).then(
      get("/api/recipes").then((data) => {
        setRecipes(data);
      })
    );
  };

  const deleteRecipe = (recipeId) => {
    del(`/api/recipes/${recipeId}`).then(
      setRecipes((recipes) => {
        return recipes.filter((recipe) => recipe._id !== recipeId);
      })
    );
  };

  if (loading === true) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <RecipesContext.Provider value={recipes}>
      <main>
        <BrowserRouter>
          <Nav setLoggedin={setLoggedin} loggedin={loggedin} />
          <Routes>
            <Route
              path="/"
              element={<Recipes loggedin={loggedin} addRecipe={addRecipe} />}
            />
            <Route
              path="/:recipeId"
              element={
                <RecipeDetail
                  recipes={recipes}
                  loggedin={loggedin}
                  deleteRecipe={deleteRecipe}
                  editRecipe={editRecipe}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </main>
    </RecipesContext.Provider>
  );
}

export default App;

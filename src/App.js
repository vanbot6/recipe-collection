import React, { useState } from 'react';

function App() {
  const [recipeFormShown, showRecipeForm] = useState(false);
  const [recipes, setRecipes] = useState([]);

  let submitRecipe = (event) => {
    event.preventDefault();
    let newRecipeName = document.getElementById('newRecipeName').value;
    let newRecipeInstructions = document.getElementById('newRecipeInstructions').value;
    setRecipes([...recipes, { name: newRecipeName, instructions: newRecipeInstructions }]);
    showRecipeForm(false);
  };

  return (
    <div className="App">
      <h1 className="App-header">My Recipes</h1>
      {recipes.length === 0 ? <p>There are no recipes to list.</p> : (
        <ul>
          {recipes.map((recipe, index) => <li key={index}>{recipe.name}</li>)}
        </ul>
      )}
      {
        recipeFormShown ?
          <form id="recipe-form" name="recipe-form" onSubmit={submitRecipe}>
            <label htmlFor="newRecipeName">Recipe name: </label>
            <input type="text" id="newRecipeName" />
            <label htmlFor="newRecipeInstructions">Instructions:</label>
            <textarea id="newRecipeInstructions" placeholder="write recipe instructions here..." />
            <input type="submit" value="Submit" />
          </form>
          :
          <button onClick={() => showRecipeForm(true)}>Add Recipe</button>
      }
    </div>
  );
}

export default App;
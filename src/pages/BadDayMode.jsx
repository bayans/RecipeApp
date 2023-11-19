import React, { useState } from 'react';
import { Recipes, handleSearch } from './Recipes';

function BadDayMode({ selectedRecipeHander }) {
  const [text, setText] = useState('Do you have a bad day?');
  const [error, toggleError] = useState(false);
  const [loading, toggleLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const keyWords = ['chocolate', 'sweet', 'pie', 'pancake', 'pizza', 'burger', 'cocktail', 'cheesecake', 'caramel', 'fruits-salade'];

  const BadDayModeHandler = async () => {
    setText("Do you want different recipes?");
    const randKeyWord = Math.floor(Math.random() * keyWords.length);
    try {
      toggleLoading(true);
      const data = await handleSearch(keyWords[randKeyWord]);
      setRecipes(data);
      toggleLoading(false);
    } catch (e) {
      console.error(e);
      toggleError(true);
      toggleLoading(false);
    }
  }

  return (
    <div className="app">
        {error && <h2 className="error">Something went wrong retrieving the data</h2>}
        {loading && <div className="loader"></div>}
        {!loading && <>
          <h1>{ text }</h1>
          <button type="button" className="button btn-small" onClick={BadDayModeHandler} >YES!</button>
          <div className="recipes">
            <Recipes recipes={recipes} selectedRecipeHander={selectedRecipeHander} />
          </div>
        </>}
      </div>
  );
}

export default BadDayMode;

import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_ID = 'api_id';
const API_KEY = 'api_key';

const handleSearch = async (searchQuery, healt = null, calories = null, diet = null) => {

    try {

        let api = `https://api.edamam.com/api/recipes/v2?q=${searchQuery}&type=public&app_id=${API_ID}&app_key=${API_KEY}`;

        if (healt) {
            api += `&healt=${healt}`;
        }

        if (calories) {
            api += `&calories=${calories}`;
        }

        if (diet) {
            api += `&diet=${diet}`;
        }

        const response = await axios.get(api);

        const data = await response.data;

        if (data.hits) {
            return data.hits;
        } else {
            return [];
        }

    } catch (error) {
        throw new Error('Error fetching recipes: ', error);
    }
};

const Recipes = ({ recipes, selectedRecipeHander }) => {

    return (
        <>
            {
                recipes.map((recipe, index) => (
                    <div key={index} className="recipe">
                        <Link to="/recipes-ingredients" onClick={() => selectedRecipeHander(recipe)}><h2>{recipe.recipe.label}</h2></Link>
                        <img src={recipe.recipe.image} alt={recipe.recipe.label} />
                        <p>Calories: {Math.round(recipe.recipe.calories)}</p>
                        <a href={recipe.recipe.url} target="_blank" rel="noopener noreferrer">
                            View Recipe
                        </a>
                    </div>
                ))
            }
        </>
    );
};

export { Recipes, handleSearch };
import React, { useEffect, useState } from 'react';
import { Recipes, handleSearch } from './Recipes';

const Home = ({ selectedRecipeHander }) => {
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {

        const keyWords = ['pancake', 'pizza', 'burger', 'beef roll', 'cocktail', 'cheesecake', 'caramel', 'fruits-salade'];

        const fetchData = async () => {
            try {
                let data, recipes = [];
                toggleLoading(true);
                for (let keyWord of keyWords) {
                    data = await handleSearch(keyWord);
                    recipes.push(data[0]);
                }
                setRecipes(recipes);
                toggleLoading(false);
            } catch (e) {
                console.error(e);
                toggleError(true);
                toggleLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="home">
            <h1>Recipes</h1>
            <h3>Explore a world of culinary inspiration with Recipes, where you can uncover a wide array of recipes, expert cooks, engaging videos, and helpful how-to guides tailored to your taste preferences and the culinary enthusiasts you connect with.</h3>
            <h1>Explore Recipes</h1>
            {error && <h2 className="error">Something went wrong retrieving the data</h2>}
            {loading && <div className="loader"></div>}
            {!loading && <>
                <div className="recipes">
                    <Recipes recipes={recipes} selectedRecipeHander={selectedRecipeHander} />
                </div>
            </>}
        </div>
    );
}

export default Home;
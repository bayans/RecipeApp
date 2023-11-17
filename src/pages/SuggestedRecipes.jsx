import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipes, handleSearch } from './Recipes';

const SuggestedRecipes = ({ mood, companionship, motivation, recipes, setRecipesHandler, selectedRecipeHander }) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!mood && !companionship && !motivation) navigate("/mood-question");
    }, [mood, companionship, motivation, navigate]);

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const getRecipeSuggestion = () => {

        const recipeSuggestions = {
            Happy_Alone_Verymotivated: [
                { title: 'Pasta' },
                { title: 'Sunny Salad' },
            ],
            Happy_Alone_Notmotivated: [
                { title: 'Quick and Easy Stir-fry' },
                { title: 'Lazy Day Sandwich' },
            ],
            Happy_Family_Verymotivated: [
                { title: 'Family Feast' },
                { title: 'Homemade Pizza Party' },
            ],
            Happy_Family_Notmotivated: [
                { title: 'Simple Spaghetti' },
                { title: 'Classic Grilled Cheese' },
            ],
            Happy_Friends_Verymotivated: [
                { title: 'Culinary Adventure' },
                { title: 'Gourmet Dining' },
            ],
            Happy_Friends_Notmotivated: [
                { title: 'Takeout Night' },
                { title: 'Netflix and Snacks' },
            ],
            Happy_Partner_Verymotivated: [
                { title: 'Romantic Dinner for Two' },
                { title: 'Homemade Dessert' },
            ],
            Happy_Partner_Notmotivated: [
                { title: 'Order-In and Cuddle' },
                { title: 'Movie Marathon' },
            ],
            Sad_Alone_Verymotivated: [
                { title: 'Comforting Soup' },
                { title: 'Baked Mac and Cheese' },
            ],
            Sad_Alone_Notmotivated: [
                { title: 'Frozen Pizza Night' },
                { title: 'Pasta with Store-Bought Sauce' },
            ],
            Sad_Family_Verymotivated: [
                { title: 'Homemade Comfort Food' },
                { title: 'One-Pot Wonder' },
            ],
            Sad_Family_Notmotivated: [
                { title: 'Simple Spaghetti' },
                { title: 'Classic Grilled Cheese' },
            ],
            Sad_Friends_Verymotivated: [
                { title: 'Cooking Experiment' },
                { title: 'Gourmet Gathering' },
            ],
            Sad_Friends_Notmotivated: [
                { title: 'Order Comfort Food' },
                { title: 'Snack Party' },
            ],
            Sad_Partner_Verymotivated: [
                { title: 'Cook a Special Meal' },
                { title: 'Homemade Dessert' },
            ],
            Sad_Partner_Notmotivated: [
                { title: 'Order-In and Chill' },
                { title: 'Movie Night' },
            ],
            Excited_Alone_Verymotivated: [
                { title: 'Creative Culinary Adventure' },
                { title: 'Global Fusion Feast' },
            ],
            Excited_Alone_Notmotivated: [
                { title: 'Takeout Treat' },
                { title: 'Snack Attack' },
            ],
            Excited_Family_Verymotivated: [
                { title: 'Family Cooking Extravaganza' },
                { title: 'Homemade Pizza Party' },
            ],
            Excited_Family_Notmotivated: [
                { title: 'Family Movie and Snacks' },
                { title: 'Quick and Tasty Family Dinner' },
            ],
            Excited_Friends_Verymotivated: [
                { title: 'Gourmet Gathering' },
                { title: 'Exotic Cuisine Adventure' },
            ],
            
            Excited_Friends_Notmotivated: [
                { title: 'Fiesta' },
                { title: 'Laughter' },
            ],
            Excited_Partner_Verymotivated: [
                { title: 'Date Night Chef Challenge' },
                { title: 'Extravagant Dining Experience' },
            ],
            Excited_Partner_Notmotivated: [
                { title: 'Takeout and Dance Party' },
                { title: 'Food Truck Adventure' },
            ],
            Tired_Alone_Verymotivated: [
                { title: 'Energizing Smoothie' },
                { title: 'Homemade Soup' },
            ],
            Tired_Alone_Notmotivated: [
                { title: 'Microwave Dinner' },
                { title: 'Cereal Delight' },
            ],
            Tired_Family_Verymotivated: [
                { title: 'Family Comfort Food' },
                { title: 'One-Pot Wonder' },
            ],
            Tired_Family_Notmotivated: [
                { title: 'Frozen Dinner Night' },
                { title: 'Simple Sandwiches' },
            ],
            Tired_Friends_Verymotivated: [
                { title: 'Potluck Dinner' },
                { title: 'DIY Burger Bar' },
            ],
            Tired_Friends_Notmotivated: [
                { title: 'Frozen Appetizers' },
                { title: 'Snack Party' },
            ],
            Tired_Partner_Verymotivated: [
                { title: 'Romantic Dinner for Two' },
                { title: 'Homemade Dessert' },
            ],
            Tired_Partner_Notmotivated: [
                { title: 'Takeout' },
                { title: 'Snacks' },
            ]
        };

        const suggestionKey = `${mood}_${companionship}_${motivation?.replace(" ", "")}`;
        const randomIndex = Math.floor(Math.random() * recipeSuggestions[suggestionKey]?.length || 0);
        const randSuggestion = recipeSuggestions[suggestionKey]?.[randomIndex]?.title || 'No suggestion available';

        return randSuggestion;
    };

    const recipeTitle = getRecipeSuggestion();

    useEffect(() => {
        const fetchData = async () => {
            try {
                toggleLoading(true);
                const data = await handleSearch(recipeTitle);
                setRecipesHandler(data);
                toggleLoading(false);
            } catch (e) {
                console.error(e);
                toggleError(true);
                toggleLoading(false);
            }
        };

        if (!recipes.length) {
            fetchData();
        }

    }, [recipes.length, setRecipesHandler, recipeTitle]);


    return (
        <div className="recipe-suggestions-container">
            {error && <h2 className="error">Something went wrong retrieving the data</h2>}
            {loading && <div className="loader"></div>}
            {!loading && <>
                <h1>Recipes Suggestions Based on Your Answers</h1>
                <Recipes recipes={recipes} selectedRecipeHander={selectedRecipeHander} />
            </>}
        </div>
    );
};

export default SuggestedRecipes;

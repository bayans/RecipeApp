import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RecipesIngredients = ({ selectedRecipe }) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!Object.keys(selectedRecipe).length) navigate("/");
    }, [selectedRecipe, navigate]);

    const recipe = selectedRecipe?.recipe;
    const totalNutrients = recipe?.totalNutrients;
    const totalDaily = recipe?.totalDaily;
    const NutritionTitles = Object.keys(totalNutrients ?? {});

    return (
        <div className="recipe-suggestions-container">
            <h2>{recipe?.label}</h2>
            <img src={recipe?.image} alt={recipe?.label} />
            <h4>Ingredients</h4>
            {recipe?.ingredientLines.map((text, index) => (
                <React.Fragment key={index}>
                    {text}
                    {index !== recipe?.ingredientLines.length - 1 && <br />}
                </React.Fragment>
            ))}
            <h4>Nutritions</h4>
            <table>
                <tbody>
                    {NutritionTitles.map((title, index) => (
                        <tr key={index}>

                            <td>{totalNutrients[title].label}</td>
                            <td>{Math.round(totalNutrients[title].quantity)}{totalNutrients[title].unit}</td>
                            <td>{totalDaily[title] ? `${Math.round(totalDaily[title].quantity)}${totalDaily[title].unit}` : '**'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>Calories: {Math.round(recipe?.calories)}</p>
            <a href={recipe?.url} target="_blank" rel="noopener noreferrer">
                View Recipe
            </a>
        </div>
    );
};

export default RecipesIngredients;

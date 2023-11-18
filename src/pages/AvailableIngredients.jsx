import React, { useState, useEffect } from 'react';
import { Recipes, handleSearch } from './Recipes';
import Form from '../components/Form/Form';

const AvailableIngredients = ({ selectedRecipeHander }) => {
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [addDisabled, setAddDisabled] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [input, setInput] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            toggleError(false);
            toggleLoading(true);
            const data = await handleSearch(ingredients.join(" "));
            setRecipes(data);
            if (!data.length) {
                toggleError('Data not found!');
            }
            toggleLoading(false);
        } catch (err) {
            console.error(err);
            toggleError("Something went wrong retrieving the data");
            toggleLoading(false);
        }
    };

    const addIngredient = () => {
        if (input) {
            setIngredients([...ingredients, input]);
            setInput('');
            setSubmitDisabled(false);
        }
    };

    const deleteIngredient = (index) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    };

    const formFields = [
        { fieldType: 'label-input', name: 'ingredient', label: 'Indicate Ingredients', input: input, onChange: setInput },
        { fieldType: 'button', text: 'Add', type: 'button', className: "button", onClick: addIngredient, disabled: addDisabled },
        {
            fieldType: 'list', list: ingredients, listChildren: [
                { childType: 'button', text: 'x', type: 'button', className: "button", onClick: deleteIngredient }
            ]
        }
    ];

    useEffect(() => {
        if (!ingredients.length)
            setSubmitDisabled(true);

        if (ingredients.length >= 3)
            setAddDisabled(true);
        else
            setAddDisabled(false);
    }, [ingredients]);



    return (
        <div className="container">
            <div className="form-component">
                <h2 className="form-heading">Available Ingredients:</h2>
                {error && <h2 className="error">{error}</h2>}
                {loading && <div className="loader"></div>}
                {!loading &&
                    <Form
                        formFields={formFields}
                        submitButton="Submit"
                        onSubmit={handleSubmit}
                        submitDisabled={submitDisabled}
                    />
                }
            </div>
            {!loading &&
                <div className="recipes">
                    <Recipes recipes={recipes} selectedRecipeHander={selectedRecipeHander} />
                </div>
            }
        </div>
    );
};

export default AvailableIngredients;

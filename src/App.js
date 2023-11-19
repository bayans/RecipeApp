import './App.css';
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import isTokenValid from './utils/isTokenValid';
import MoodQuestion from './pages/MoodQuestion';
import CompanionshipQuestion from './pages/CompanionshipQuestion';
import MotivationQuestion from './pages/MotivationQuestion';
import SuggestedRecipes from './pages/SuggestedRecipes';
import RecipesIngredients from './pages/RecipesIngredients';
import RecipesFilter from './pages/RecipesFilter';
import AvailableIngredients from './pages/AvailableIngredients';
import Profile from './pages/Profile';
import Login from './pages/Login';

const App = () => {

  const [mood, setMood] = useState(null);
  const [companionship, setCompanionship] = useState(null);
  const [motivation, setMotivation] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState({});

  const getToken = () => localStorage.getItem("jwtToken");

  const ProtectedRoute = ({ element }) => {
    if (isTokenValid(getToken())) {
      return element;
    } else {
      return <Navigate to="/login" />;
    }
  };

  return (
    <Routes>
      <Route path="/mood-question" element={<MoodQuestion moodHandler={setMood} />} />
      <Route path="/companionship-question" element={<CompanionshipQuestion mood={mood} companionshipHandler={setCompanionship} />} />
      <Route path="/motivation-question" element={<MotivationQuestion mood={mood} companionship={companionship} motivationHandler={setMotivation} />} />
      <Route path="/suggested-recipes" element={<SuggestedRecipes mood={mood} companionship={companionship} motivation={motivation} recipes={recipes} setRecipesHandler={setRecipes} selectedRecipeHander={setSelectedRecipe} />} />
      <Route path="/recipes-ingredients" element={<RecipesIngredients selectedRecipe={selectedRecipe} />} />
      <Route path="/recipes-filter/:ingredientParam?" element={<RecipesFilter selectedRecipeHander={setSelectedRecipe} />} />
      <Route path="/available-ingredients" element={<AvailableIngredients selectedRecipeHander={setSelectedRecipe} />} />
      <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;

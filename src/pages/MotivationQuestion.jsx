import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MotivationQuestion = ({ mood, companionship, motivationHandler, setRecipesHandler }) => {
  const navigate = useNavigate();
  const motivations = ['Very motivated', 'Not motivated'];

  useEffect(() => {
    if(!mood && !companionship) navigate("/mood-question");
    setRecipesHandler([]);
  }, [mood, companionship, setRecipesHandler, navigate]);
  

  return (
    <div className="recipe-suggestions-container">
      <h1>How motivated are you to cook?</h1>
      <div className="question">
        <ul>
          {motivations.map((motivation, index) => (
            <Link key={index} to="/suggested-recipes" onClick={() => motivationHandler(motivation)}><li>{motivation}</li></Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MotivationQuestion;

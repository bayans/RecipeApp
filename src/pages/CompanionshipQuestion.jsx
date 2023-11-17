import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CompanionshipQuestion = ({ mood, companionshipHandler }) => {
  const navigate = useNavigate();
  const companionships = ['Alone', 'Family', 'Friends', 'Partner'];

  useEffect(() => {
    if(!mood) navigate("/mood-question");
  }, [mood, navigate]);

  return (
    <div className="recipe-suggestions-container">
      <h1>Who's keeping you company?</h1>
      <div className="question">
        <ul>
          {companionships.map((companionship, index) => (
            <Link key={index} to="/motivation-question" onClick={() => companionshipHandler(companionship)}><li>{companionship}</li></Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompanionshipQuestion;

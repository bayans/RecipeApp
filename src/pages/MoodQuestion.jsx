import React from 'react';
import { Link } from 'react-router-dom';

const MoodQuestion = ({ moodHandler }) => {
  const moods = ['Happy', 'Sad', 'Excited', 'Tired'];

  return (
    <div className="recipe-suggestions-container">
      <h1>How are you feeling today?</h1>
      <div className="question">
        <ul>
          {moods.map((mood, index) => (
            <Link key={index} to="/companionship-question" onClick={() => moodHandler(mood)}><li>{mood}</li></Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MoodQuestion;

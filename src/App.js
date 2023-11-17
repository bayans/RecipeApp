import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MoodQuestion from './pages/MoodQuestion';
import Login from './pages/Login';

const App = () => {

  const [mood, setMood] = useState(null);

  return (
    <Routes>
      <Route path="/mood-question" element={<MoodQuestion moodHandler={setMood} />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;

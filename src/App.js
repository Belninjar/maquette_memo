import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import StoryPage from './pages/StoryPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* :storyId => ex: story1, story2, etc. */}
        <Route path="/story/:storyId" element={<StoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;

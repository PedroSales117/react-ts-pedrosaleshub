import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AllRepos from './pages/AllReposPage';
import ListRepos from './components/ListRepositories';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/backend" element={<ListRepos filter="backend" />} />
        <Route path="/ai" element={<ListRepos filter="ai" />} />
        <Route path="/all" element={<AllRepos />} />
      </Routes>
    </Router>
  );
};

export default App;

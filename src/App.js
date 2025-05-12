import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import RecipeList from './RecipeList';
import AddRecipe from './AddRecipe';
import SingleRecipe from './SingleRecipe';
import RecipeLinks from './RecipeLinks';
import './App.css';

function AppContent() {
  const location = useLocation();

  // Hide navbar on single recipe view
  const hideNavbar = location.pathname.startsWith('/recipe/');

  return (
    <>
      <div className="content-with-padding">
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/add" element={<AddRecipe />} />
          <Route path="/recipe/:id" element={<SingleRecipe />} />
          <Route path="/links" element={<RecipeLinks />} />
        </Routes>
      </div>

      {!hideNavbar && (
        <nav className="navbar fixed-bottom navbar-light bg-light justify-content-around">
          <button className="btn btn-primary" onClick={() => window.location.href = '/'}>
            Zobacz Przepisy
          </button>
          <button className="btn btn-success" onClick={() => window.location.href = '/add'}>
            Dodaj Przepis
          </button>
          <button className="btn btn-info" onClick={() => window.location.href = '/links'}>
            Linki do Przepisów
          </button>
        </nav>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

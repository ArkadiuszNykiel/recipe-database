import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeList from './RecipeList';
import AddRecipe from './AddRecipe';
import SingleRecipe from './SingleRecipe';
import RecipeLinks from './RecipeLinks';  // Import the new RecipeLinks component

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/add" element={<AddRecipe />} />
          <Route path="/recipe/:id" element={<SingleRecipe />} />
          <Route path="/links" element={<RecipeLinks />} /> {/* Add route for RecipeLinks */}
        </Routes>
        
        {/* Bottom navbar for navigation */}
        <nav className="navbar fixed-bottom navbar-light bg-light justify-content-around">
          <button className="btn btn-primary" onClick={() => window.location.href = '/'}>
            Zobacz Przepisy
          </button>
          <button className="btn btn-success" onClick={() => window.location.href = '/add'}>
            Dodaj Przepis
          </button>
          <button className="btn btn-info" onClick={() => window.location.href = '/links'}>
            Linki do Przepisów
          </button> {/* New button to navigate to RecipeLinks */}
        </nav>
      </div>
    </Router>
  );
}

export default App;

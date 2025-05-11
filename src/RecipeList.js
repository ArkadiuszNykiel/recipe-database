import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      const snapshot = await getDocs(collection(db, 'webrecipes'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecipes(data);
    }
    fetchRecipes();
  }, []);

  return (
    <div className="container mt-3">
      <div className="row">
        {recipes.map(recipe => (
          <div className="col-12 col-md-6 col-lg-4 mb-4" key={recipe.id}>
            <div className="card h-100">
              <img
                src={recipe.thumbnail}
                className="card-img-top"
                alt={recipe.name}
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.name}</h5>
                <p className="card-text">{recipe.prep}</p>
                <Link to={`/recipe/${recipe.id}`} className="btn btn-primary">
                  Zobacz Przepis
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;

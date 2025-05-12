import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRecipes() {
      const querySnapshot = await getDocs(collection(db, 'webrecipes'));
      const recipeList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(recipeList);
    }

    fetchRecipes();
  }, []);

  return (
    <div className="container mt-3">
      <h2 className="mb-4">Przepisy</h2>
      <div className="row">
        {recipes.map(recipe => (
          <div className="col-6 col-md-4 mb-4" key={recipe.id}>
            <div className="card h-100">
              <img
                src={recipe.thumbnail}
                className="card-img-top"
                alt={recipe.name}
                style={{ objectFit: 'cover', height: '200px', cursor: 'pointer' }}
                onClick={() => navigate(`/recipe/${recipe.id}`)}
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;

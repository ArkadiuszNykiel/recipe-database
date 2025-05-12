import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

function SingleRecipe() {
  const { id } = useParams(); // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      const recipeDoc = doc(db, 'webrecipes', id);
      const recipeSnapshot = await getDoc(recipeDoc);
      if (recipeSnapshot.exists()) {
        setRecipe(recipeSnapshot.data());
      } else {
        console.log('Brak przepisu!');
      }
    }
    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Ładowanie...</div>;
  }

  return (
    <div className="container content-with-padding mt-3">
      <div className="card">
        <img
          src={recipe.thumbnail}
          className="card-img-top"
          alt={recipe.name}
          style={{ maxHeight: '300px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title">{recipe.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Składniki:</h6>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h6 className="card-subtitle mb-2 text-muted">Przygotowanie:</h6>
          <p>{recipe.prep}</p>
        </div>
      </div>
    </div>
  );
}

export default SingleRecipe;

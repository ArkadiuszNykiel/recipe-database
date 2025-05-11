import React, { useState } from 'react';
import { db, storage } from './firebase';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function AddRecipe() {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [prep, setPrep] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !ingredients || !prep || !file) {
      alert('Wszystkie pola są wymagane');
      return;
    }

    const filename = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, `images/${filename}`);
    await uploadBytes(storageRef, file);
    const thumbnailUrl = await getDownloadURL(storageRef);

    await addDoc(collection(db, 'webrecipes'), {
      name,
      ingredients: ingredients.split(',').map(i => i.trim()),
      prep,
      thumbnail: thumbnailUrl
    });

    setName('');
    setIngredients('');
    setPrep('');
    setFile(null);
    alert('Przepis został dodany!');
  };

  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nazwa przepisu</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Składniki (oddzielone przecinkiem)</label>
          <input
            type="text"
            className="form-control"
            value={ingredients}
            onChange={e => setIngredients(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Przygotowanie</label>
          <textarea
            className="form-control"
            value={prep}
            onChange={e => setPrep(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Zdjęcie</label>
          <input
            type="file"
            className="form-control"
            onChange={e => setFile(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Dodaj Przepis
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;

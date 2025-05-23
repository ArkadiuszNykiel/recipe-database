import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

function RecipeLinks() {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState('');

  // Fetch existing links from Firestore
  useEffect(() => {
    async function fetchLinks() {
      const snapshot = await getDocs(collection(db, 'externalLinks'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLinks(data);
    }
    fetchLinks();
  }, []);

  // Handle adding a new external recipe link
  const handleAddLink = async (e) => {
    e.preventDefault();
    if (!newLink) {
      alert('Proszę podać link!');
      return;
    }

    try {
      await addDoc(collection(db, 'externalLinks'), { url: newLink });
      setNewLink('');
      alert('Link do strony z przepisem dodany!');
    } catch (error) {
      console.error('Błąd przy dodawaniu linku:', error);
    }
  };

  return (
    <div className="container mt-3">
      <h2>Linki do innych stron z przepisami</h2>
      <form onSubmit={handleAddLink}>
        <div className="mb-3">
          <label className="form-label">Dodaj nowy link</label>
          <input
            type="url"
            className="form-control"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            placeholder="Wprowadź URL strony z przepisem"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Dodaj Link
        </button>
      </form>

      <h3 className="mt-4">Przechowywane Linki</h3>
      <ul className="list-group">
        {links.map((link) => (
          <li className="list-group-item" key={link.id}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeLinks;

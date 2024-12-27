import React, { useState } from 'react';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';

const Create: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publicationYear: '',
    genre: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios.post('/books', formData)
      .then(response => {
        // Redirige a la lista de libros
        Inertia.visit('/books');
      })
      .catch(error => {
        console.error("Error al crear el libro:", error);
      });
  };

  return (
    <div>
      <h2>Crear Nuevo Libro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Autor:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Año de publicación:</label>
          <input
            type="number"
            name="publicationYear"
            value={formData.publicationYear}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Género:</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default Create;

import React from 'react';

const ListLibros: React.FC<{ libros: any[] }> = ({ libros }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Lista de Libros</h2>
      <ul className="mt-4">
        {libros.map((libro) => (
          <li key={libro.id} className="border-b py-2">
            <h3 className="font-semibold">{libro.title}</h3>
            <p>{libro.author} - {libro.publication_year} - {libro.genre}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListLibros;

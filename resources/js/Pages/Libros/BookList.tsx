// src/pages/Libros/BookList.tsx
import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaRegClock } from 'react-icons/fa';

interface Book {
  title: string;
  author: string;
  publicationYear: number;
  genre: string;
}

interface BookListProps {
  isCardView: boolean;
  libros: Book[];
}

const BookList: React.FC<BookListProps> = ({ isCardView, libros }) => {
  // Vista de Cards
  const renderCardView = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {libros.map((libro, index) => (
          <div key={index} className="border p-4 rounded-md">
            <h3 className="text-xl font-semibold">{libro.title}</h3>
            <p>Autor: {libro.author}</p>
            <p>Año de publicación: {libro.publicationYear}</p>
            <p>Género: {libro.genre}</p>
            <div className="flex space-x-2 mt-2">
              <button className="px-2 py-1 bg-green-500 text-white rounded-md">
                <FaCheckCircle />
              </button>
              <button className="px-2 py-1 bg-red-500 text-white rounded-md">
                <FaTimesCircle />
              </button>
              <button className="px-2 py-1 bg-yellow-500 text-white rounded-md">
                <FaRegClock />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Vista de Lista
  const renderListView = () => {
    return (
      <div className="overflow-x-auto shadow rounded-lg border border-gray-300 w-full">
        <table className="w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Título</th>
              <th className="px-4 py-2 text-left">Autor</th>
              <th className="px-4 py-2 text-left">Año</th>
              <th className="px-4 py-2 text-left">Género</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {libros.map((libro, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{libro.title}</td>
                <td className="px-4 py-2">{libro.author}</td>
                <td className="px-4 py-2">{libro.publicationYear}</td>
                <td className="px-4 py-2">{libro.genre}</td>
                <td className="px-4 py-2">
                  <button className="px-2 py-1 bg-green-500 text-white rounded-md">
                    <FaCheckCircle />
                  </button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded-md">
                    <FaTimesCircle />
                  </button>
                  <button className="px-2 py-1 bg-yellow-500 text-white rounded-md">
                    <FaRegClock />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return <div>{isCardView ? renderCardView() : renderListView()}</div>;
};

export default BookList;

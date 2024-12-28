import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaRegClock, FaEdit } from 'react-icons/fa';

interface Book {
  id: number;
  title: string;
  author: string;
  publicationYear: number;
  genre: string;
}

interface BookListProps {
  libros: Book[];
  isCardView: boolean;
}

const BookList: React.FC<BookListProps> = ({ libros, isCardView }) => {
  const renderCardView = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {libros.map((libro) => (
          <div key={libro.id} className="border p-4 rounded-md">
            <h3 className="text-xl font-semibold">{libro.title}</h3>
            <p>Autor: {libro.author}</p>
            <p>Año: {libro.publicationYear}</p>
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
              <button className="px-2 py-1 bg-blue-500 text-white rounded-md">
                <FaEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderListView = () => {
    return (
      <div className="space-y-4">
        {libros.map((libro) => (
          <div key={libro.id} className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">{libro.title}</h3>
              <p>Autor: {libro.author}</p>
              <p>Año: {libro.publicationYear}</p>
              <p>Género: {libro.genre}</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-2 py-1 bg-green-500 text-white rounded-md">
                <FaCheckCircle />
              </button>
              <button className="px-2 py-1 bg-red-500 text-white rounded-md">
                <FaTimesCircle />
              </button>
              <button className="px-2 py-1 bg-yellow-500 text-white rounded-md">
                <FaRegClock />
              </button>
              <button className="px-2 py-1 bg-blue-500 text-white rounded-md">
                <FaEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return <div>{isCardView ? renderCardView() : renderListView()}</div>;
};

export default BookList;

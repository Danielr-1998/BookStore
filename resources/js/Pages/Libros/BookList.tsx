import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaRegClock, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia'; // Asegúrate de tener Inertia importado

interface Book {
  id: number; // Asegúrate de tener la propiedad `id` para cada libro
  title: string;
  author: string;
  publicationYear: number;
  genre: string;
}

interface BookListProps {
  isCardView: boolean;
  libros: Book[];
  updateBook: (index: number, updatedBook: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ isCardView, libros, updateBook }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [updatedBook, setUpdatedBook] = useState<Book | null>(null);

  const handleEditClick = (book: Book) => {
    setCurrentBook(book);
    setUpdatedBook({...book, id: book.id}); // Asegúrate de que la ID esté incluida
    setIsEditing(true); // Activamos el formulario de edición
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Book) => {
    if (updatedBook) {
      setUpdatedBook({
        ...updatedBook,
        [field]: e.target.value,
      });
    }
  };

  const handleSave = () => {
    if (updatedBook && currentBook) {
      const index = libros.indexOf(currentBook);

      // Hacer solicitud PUT a la API de Laravel
      axios.put(`/books/${currentBook.id}`, updatedBook)
        .then((response) => {
          updateBook(index, updatedBook); // Actualiza el libro en el estado
          setIsEditing(false); // Cerramos el formulario de edición
          setCurrentBook(null); // Limpiamos el libro actual
          setUpdatedBook(null); // Limpiamos el libro actualizado
        })
        .catch((error) => {
          console.error("Error al actualizar el libro:", error);
        });
    }
  };

  // Vista de Cards
  const renderCardView = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {libros.map((libro, index) => (
          <div key={libro.id} className="border p-4 rounded-md">
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
              <button
                onClick={() => handleEditClick(libro)}
                className="px-2 py-1 bg-blue-500 text-white rounded-md"
              >
                <FaEdit /> {/* Icono de editar */}
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
              <tr key={libro.id}>
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
                  <button
                    onClick={() => handleEditClick(libro)}
                    className="px-2 py-1 bg-blue-500 text-white rounded-md"
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Componente Modal de Edición
  const renderEditModal = () => {
    if (!isEditing || !updatedBook) return null;

    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Editar Libro</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Título</label>
            <input
              type="text"
              value={updatedBook.title}
              onChange={(e) => handleChange(e, 'title')}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Autor</label>
            <input
              type="text"
              value={updatedBook.author}
              onChange={(e) => handleChange(e, 'author')}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Año de publicación</label>
            <input
              type="number"
              value={updatedBook.publicationYear}
              onChange={(e) => handleChange(e, 'publicationYear')}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Género</label>
            <input
              type="text"
              value={updatedBook.genre}
              onChange={(e) => handleChange(e, 'genre')}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded-md"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {isCardView ? renderCardView() : renderListView()}
      {renderEditModal()}
    </div>
  );
};

export default BookList;

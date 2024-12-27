import React, { useState } from 'react';
import BookList from './BookList'; // Importamos el componente BookList
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar'; // Asegúrate de importar el Sidebar

const Index: React.FC = () => {
  const [isCardView, setIsCardView] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publicationYear: '',
    genre: '',
  });

  const [libros, setLibros] = useState([
    { title: 'El Quijote', author: 'Miguel de Cervantes', publicationYear: 1605, genre: 'Ficción' },
    { title: 'Cien Años de Soledad', author: 'Gabriel García Márquez', publicationYear: 1967, genre: 'Realismo Mágico' },
    { title: '1984', author: 'George Orwell', publicationYear: 1949, genre: 'Distopía' },
  ]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const createLibro = () => {
    setLibros([...libros, { ...formData, publicationYear: Number(formData.publicationYear) }]);
    setIsModalOpen(false);
    setFormData({ title: '', author: '', publicationYear: '', genre: '' });
  };

  const toggleView = () => {
    setIsCardView(!isCardView);
  };

  return (
    <AuthenticatedLayout>
        <div className="py-1">
      <div className="mx-auto max-w-7xl sm:px-2 lg:px-2">
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
          <div className="p-2 text-gray-900">
      <div className="flex min-h-screen">
        {/* Sidebar */}

        {/* Main Content */}
        <div className="flex-1 p-4">
          <button onClick={toggleView} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md">
            {isCardView ? 'Ver como lista' : 'Ver como cards'}
          </button>

          <div className="mb-4">
            <button onClick={openModal} className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">
              Crear Libro
            </button>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Crear Nuevo Libro</h2>
                <div className="mb-4">
                  <label className="block">Título</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block">Autor</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block">Año de Publicación</label>
                  <input
                    type="number"
                    name="publicationYear"
                    value={formData.publicationYear}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block">Género</label>
                  <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                  />
                </div>
                <div className="flex justify-between">
                  <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
                    Cancelar
                  </button>
                  <button onClick={createLibro} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    Crear Libro
                  </button>
                </div>
              </div>
            </div>
          )}

          <BookList isCardView={isCardView} libros={libros} />
        </div>
      </div>
      </div>
        </div>
      </div>
    </div>
    </AuthenticatedLayout>
  );
};

export default Index;

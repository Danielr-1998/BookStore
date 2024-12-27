import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';
import BookList from './BookList'; // Asumí que tienes este componente para mostrar los libros

interface FormData {
  title: string;
  author: string;
  publicationYear: string;
  genre: string;
}

const Index: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Especificamos el tipo de datos en useForm
  const { data, setData, post, processing, errors } = useForm<FormData>({
    title: '',
    author: '',
    publicationYear: '',
    genre: '',
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // TypeScript ahora sabe que "name" solo puede ser una de las claves de FormData
    setData(name as keyof FormData, value); // Aseguramos que el "name" es una de las claves de FormData
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Verificar los datos antes de enviarlos
    console.log("Datos del formulario:", data);
  
    setTimeout(() => {
      console.log("Enviando datos...");
  
      // Verificar si los datos están siendo enviados correctamente
      post(route('books.store'), {
        data: data, // Asegúrate de enviar los datos en la propiedad "data"
        onSuccess: () => {
          console.log("Libro guardado exitosamente!");
          setIsModalOpen(false); // Cerrar modal al guardar
        },
        onError: (error) => {
          console.log("Hubo un error al guardar el libro", error);
        },
      });
    }, 2000); // 2 segundos de retraso
  };

  return (
    <AuthenticatedLayout>
      <div className="py-1">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-2">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-2 text-gray-900">
              <div className="flex min-h-screen">
                {/* Sidebar */}
                {/* Sidebar va aquí */}

                {/* Main Content */}
                <div className="flex-1 p-4">
                  <button
                    onClick={openModal}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
                  >
                    Crear Libro
                  </button>

                  {/* Modal */}
                  {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                      <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Crear Nuevo Libro</h2>
                        <form onSubmit={handleSubmit}>
                          <div className="mb-4">
                            <label className="block">Título</label>
                            <input
                              type="text"
                              name="title"
                              value={data.title}
                              onChange={handleInputChange}
                              className="border p-2 w-full"
                            />
                            {errors.title && <div className="text-red-500">{errors.title}</div>}
                          </div>
                          <div className="mb-4">
                            <label className="block">Autor</label>
                            <input
                              type="text"
                              name="author"
                              value={data.author}
                              onChange={handleInputChange}
                              className="border p-2 w-full"
                            />
                            {errors.author && <div className="text-red-500">{errors.author}</div>}
                          </div>
                          <div className="mb-4">
                            <label className="block">Año de Publicación</label>
                            <input
                              type="number"
                              name="publicationYear"
                              value={data.publicationYear}
                              onChange={handleInputChange}
                              className="border p-2 w-full"
                            />
                            {errors.publicationYear && (
                              <div className="text-red-500">{errors.publicationYear}</div>
                            )}
                          </div>
                          <div className="mb-4">
                            <label className="block">Género</label>
                            <input
                              type="text"
                              name="genre"
                              value={data.genre}
                              onChange={handleInputChange}
                              className="border p-2 w-full"
                            />
                            {errors.genre && <div className="text-red-500">{errors.genre}</div>}
                          </div>
                          <div className="flex justify-between">
                            <button
                              onClick={closeModal}
                              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                            >
                              Cancelar
                            </button>
                            <button
                              type="submit"
                              disabled={processing}
                              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            >
                              {processing ? 'Guardando...' : 'Crear Libro'}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  <BookList isCardView={true} libros={[]} /> {/* Asegúrate de pasar los libros */}
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

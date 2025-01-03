import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia'; 

interface FormData {
  title: string;
  author: string;
  publicationYear: string;
  genre: string;
}

interface IndexProps {
  libros: Array<{
    id: number;
    title: string;
    author: string;
    publicationYear: number;
    genre: string;
  }>;
}

const Index: React.FC<IndexProps> = ({ libros }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);

  const { data, setData, post, put, processing, errors } = useForm<FormData>({
    title: '',
    author: '',
    publicationYear: '',
    genre: '',
  });

  const openModal = (book: any = null) => {
    setSelectedBook(book);
    if (book) {
      setIsEditing(true);
      setData('title', book.title || '');
      setData('author', book.author || '');
      setData('publicationYear', book.publicationYear ? book.publicationYear.toString() : '');
      setData('genre', book.genre || '');
    } else {
      setIsEditing(false);
      setData('title', '');
      setData('author', '');
      setData('publicationYear', '');
      setData('genre', '');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(name as keyof FormData, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing) {
      put(route('books.update', selectedBook.id), {
        data: data,
        onSuccess: () => {
          console.log("Libro actualizado exitosamente!");
          window.location.reload(); 
          setIsModalOpen(false);
        },
        onError: (error) => {
          console.log("Hubo un error al actualizar el libro", error);
        },
      });
    } else {
      post(route('books.store'), {
        data: data,
        onSuccess: () => {
          console.log("Libro guardado exitosamente!");
          window.location.reload(); 

          setIsModalOpen(false);
        },
        onError: (error) => {
          console.log("Hubo un error al guardar el libro", error);
        },
      });
    }
  };

  const handleDelete = (bookId: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este libro?')) {
      Inertia.delete(route('books.destroy', bookId), {
        onSuccess: () => {
          console.log("Libro eliminado exitosamente!");
          window.location.reload(); 

        },
        onError: (error) => {
          console.log("Hubo un error al eliminar el libro", error);
        },
      });
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="py-1">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-2">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-2 text-gray-900">
              <div className="flex min-h-screen">
                <div className="flex-1 p-4">
                  <button
                    onClick={() => openModal()}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg mb-4"
                  >
                    Crear Libro
                  </button>

                  {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                      <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">
                          {isEditing ? 'Editar Libro' : 'Crear Nuevo Libro'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                          <div className="mb-4">
                            <label className="block text-gray-700">Título</label>
                            <input
                              type="text"
                              name="title"
                              value={data.title}
                              onChange={handleInputChange}
                              placeholder="Título"
                              className="w-full p-2 border border-gray-300 rounded"
                            />
                            {errors.title && <p className="text-red-500">{errors.title}</p>}
                          </div>

                          <div className="mb-4">
                            <label className="block text-gray-700">Autor</label>
                            <input
                              type="text"
                              name="author"
                              value={data.author}
                              onChange={handleInputChange}
                              placeholder="Autor"
                              className="w-full p-2 border border-gray-300 rounded"
                            />
                            {errors.author && <p className="text-red-500">{errors.author}</p>}
                          </div>

                          <div className="mb-4">
                            <label className="block text-gray-700">Año de Publicación</label>
                            <input
                              type="number"
                              name="publicationYear"
                              value={data.publicationYear}
                              onChange={handleInputChange}
                              placeholder="Año de Publicación"
                              className="w-full p-2 border border-gray-300 rounded"
                            />
                            {errors.publicationYear && (
                              <p className="text-red-500">{errors.publicationYear}</p>
                            )}
                          </div>

                          <div className="mb-4">
                            <label className="block text-gray-700">Género</label>
                            <input
                              type="text"
                              name="genre"
                              value={data.genre}
                              onChange={handleInputChange}
                              placeholder="Género"
                              className="w-full p-2 border border-gray-300 rounded"
                            />
                            {errors.genre && <p className="text-red-500">{errors.genre}</p>}
                          </div>

                          <div className="flex justify-end">
                            <button
                              type="submit"
                              disabled={processing}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
                            >
                              {processing ? 'Guardando...' : isEditing ? 'Actualizar Libro' : 'Crear Libro'}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  <div className="overflow-x-auto mt-6">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                      <thead>
                        <tr>
                          <th className="px-6 py-2 border-b text-left text-sm font-semibold text-gray-700">Título</th>
                          <th className="px-6 py-2 border-b text-left text-sm font-semibold text-gray-700">Autor</th>
                          <th className="px-6 py-2 border-b text-left text-sm font-semibold text-gray-700">Año</th>
                          <th className="px-6 py-2 border-b text-left text-sm font-semibold text-gray-700">Género</th>
                          <th className="px-6 py-2 border-b text-left text-sm font-semibold text-gray-700">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {libros.map((libro) => (
                          <tr key={libro.id}>
                            <td className="px-6 py-2 border-b text-sm text-gray-800">{libro.title}</td>
                            <td className="px-6 py-2 border-b text-sm text-gray-800">{libro.author}</td>
                            <td className="px-6 py-2 border-b text-sm text-gray-800">{libro.publicationYear}</td>
                            <td className="px-6 py-2 border-b text-sm text-gray-800">{libro.genre}</td>
                            <td className="px-6 py-2 border-b text-sm text-gray-800">
                              <button
                                className="text-blue-500 hover:text-blue-700"
                                onClick={() => openModal(libro)}
                              >
                                Editar
                              </button>
                              <button
                                className="text-red-500 hover:text-red-700 ml-2"
                                onClick={() => handleDelete(libro.id)}
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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

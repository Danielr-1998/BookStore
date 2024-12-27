import React from 'react';
import { useForm } from '@inertiajs/react';  // Esto es para manejar formularios en Inertia.js

const CreateLibroModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  // Usamos useForm de Inertia para manejar el estado y el envío del formulario
  const { data, setData, post, processing, errors } = useForm({
    titulo: '',
    autor: '',
    anio_publicacion: '',
    genero: ''
  });

  // Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('books.store'), {
      onSuccess: () => {
        onClose();  // Cierra la modal después de una creación exitosa
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Crear Nuevo Libro</h2>
        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">Título</label>
            <input
              type="text"
              value={data.titulo}
              onChange={(e) => setData('titulo', e.target.value)}
              className="border p-2 w-full"
            />
            {errors.titulo && <div className="text-red-500 text-sm">{errors.titulo}</div>}
          </div>
          
          <div className="mb-4">
            <label className="block">Autor</label>
            <input
              type="text"
              value={data.autor}
              onChange={(e) => setData('autor', e.target.value)}
              className="border p-2 w-full"
            />
            {errors.autor && <div className="text-red-500 text-sm">{errors.autor}</div>}
          </div>

          <div className="mb-4">
            <label className="block">Año de Publicación</label>
            <input
              type="number"
              value={data.anio_publicacion}
              onChange={(e) => setData('anio_publicacion', e.target.value)}
              className="border p-2 w-full"
            />
            {errors.anio_publicacion && <div className="text-red-500 text-sm">{errors.anio_publicacion}</div>}
          </div>

          <div className="mb-4">
            <label className="block">Género</label>
            <input
              type="text"
              value={data.genero}
              onChange={(e) => setData('genero', e.target.value)}
              className="border p-2 w-full"
            />
            {errors.genero && <div className="text-red-500 text-sm">{errors.genero}</div>}
          </div>

          {/* Botones de acción */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={processing}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              {processing ? 'Creando...' : 'Crear Libro'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLibroModal;

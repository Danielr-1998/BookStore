import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import ListCitas from './ListCitas';   // El componente para mostrar las citas en lista
import Calendar from '@/Components/Calendar';    // El componente para mostrar el calendario
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CreateCitaModal from '@/Components/CrearCitaModal'; // Importamos la modal de crear cita
import Sidebar from '@/Components/Sidebar'; // Importamos el Sidebar
import { Head } from '@inertiajs/react';

const Index: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('calendar');  // Estado para alternar entre lista y calendario
  const [isModalOpen, setIsModalOpen] = useState(false);  // Estado para controlar la visibilidad de la modal
  const { citas, profesionales } = usePage().props;  // Asegúrate de que 'profesionales' se pase correctamente desde el backend
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Controlar la visibilidad del sidebar

  // Verificar si `profesionales` es un arreglo antes de pasarlo al modal
  const safeProfesionales = Array.isArray(profesionales) ? profesionales : [];

  // Función para cambiar el estado del Sidebar (abrir o cerrar)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Cambiar el estado del sidebar
  };

  return (
    <AuthenticatedLayout>
    <Head title="Citas" />

    <div className="py-1">
      <div className="mx-auto max-w-7xl sm:px-2 lg:px-2">
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
          <div className="p-2 text-gray-900">

            {/* Sección de botones y vista de citas */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex">
                <button
                  onClick={() => setViewMode('list')}  // Cambiar a la vista de lista
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                >
                  Ver Lista
                </button>
                <button
                  onClick={() => setViewMode('calendar')}  // Cambiar a la vista de calendario
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ms-2"
                >
                  Ver Calendario
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}  // Mostrar la modal para crear cita
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 ms-2"
                >
                  Crear Cita
                </button>
              </div>
            </div>

            {/* Dependiendo del estado 'viewMode', mostramos el componente correspondiente */}
            <div className="mt-6">
              {viewMode === 'calendar' ? <Calendar citas={citas} /> : <ListCitas citas={citas} />}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Mostrar modal si isModalOpen es true */}
    {isModalOpen && <CreateCitaModal onClose={() => setIsModalOpen(false)} profesionales={safeProfesionales} />}
  </AuthenticatedLayout>
  );
};

export default Index;

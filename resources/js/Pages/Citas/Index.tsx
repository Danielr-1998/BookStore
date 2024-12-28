import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import ListCitas from './ListCitas';   
import Calendar from '@/Components/Calendar';    
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CreateCitaModal from '@/Components/CrearCitaModal'; 
import Sidebar from '@/Components/Sidebar'; 
import { Head } from '@inertiajs/react';

const Index: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('calendar');  
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const { citas, profesionales } = usePage().props;  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 

  const safeProfesionales = Array.isArray(profesionales) ? profesionales : [];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); 
  };

  return (
    <AuthenticatedLayout>
    <Head title="Reservas" />

    <div className="py-1">
      <div className="mx-auto max-w-7xl sm:px-2 lg:px-2">
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
          <div className="p-2 text-gray-900">

            <div className="flex justify-between items-center mb-6">
              <div className="flex">
                
                <button
                  onClick={() => setViewMode('calendar')} 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ms-2"
                >
                  Ver Calendario
                </button>
                <button
                  onClick={() => setIsModalOpen(true)} 
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 ms-2"
                >
                  Crear Cita
                </button>
              </div>
            </div>

            <div className="mt-6">
              {viewMode === 'calendar' ? <Calendar citas={citas} /> : <ListCitas citas={citas} />}
            </div>
          </div>
        </div>
      </div>
    </div>

    {isModalOpen && <CreateCitaModal onClose={() => setIsModalOpen(false)} profesionales={safeProfesionales} />}
  </AuthenticatedLayout>
  );
};

export default Index;

import React from "react";
import { Link } from "@inertiajs/inertia-react"; // Importamos Inertia Link
// Importamos los iconos que necesitamos de React Icons
import { FaTachometerAlt, FaCalendarCheck, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar bg-gray-800 text-white h-full fixed top-0 left-0 w-64 p-6 font-sans z-50"> {/* Sidebar fijo a la izquierda */}
      {/* Logo */}
      <div className="logo text-3xl font-bold mb-8 text-center">
        <span className="text-blue-400">Mi</span> App
      </div>

      {/* Menu Items */}
      <ul className="space-y-6">
        <li>
          <Link
            href="/dashboard"
            className="flex items-center p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FaTachometerAlt className="mr-3 text-xl" /> {/* Icono de Inicio */}
            <span className="text-sm">Inicio</span>
          </Link>
        </li>
        <li>
          <Link
            href="/books"
            className="flex items-center p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FaCalendarCheck className="mr-3 text-xl" /> {/* Icono de Citas */}
            <span className="text-sm">Libros</span>
          </Link>
        </li>
        <li>
          <Link
            href="/citas"
            className="flex items-center p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FaCalendarCheck className="mr-3 text-xl" /> {/* Icono de Citas */}
            <span className="text-sm">Reservas</span>
          </Link>
        </li>

        <li>
          <Link
            href="/profile"
            className="flex items-center p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FaUserCircle className="mr-3 text-xl" /> {/* Icono de Perfil */}
            <span className="text-sm">Perfil</span>
          </Link>
        </li>

        <li>
          <form method="POST" action="/logout">
            <button
              type="submit"
              className="w-full flex items-center p-2 text-left hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FaSignOutAlt className="mr-3 text-xl" /> {/* Icono de Cerrar sesión */}
              <span className="text-sm">Cerrar sesión</span>
            </button>
          </form>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

import React, { useState } from 'react';
import { useTable, usePagination, useFilters, useRowSelect } from 'react-table'; // Importar useRowSelect
import { usePage, useForm } from '@inertiajs/react'; // Usamos useForm para hacer la petición DELETE
import { Cita } from '@/types/Cita';
import { FaCheckCircle, FaTimesCircle, FaRegClock } from 'react-icons/fa'; // Iconos de react-icons

// Filtro por columna (por defecto)
const DefaultColumnFilter = ({ column: { filterValue, setFilter } }: any) => (
  <input
    value={filterValue || ''}
    onChange={(e) => setFilter(e.target.value || undefined)}
    placeholder={`Buscar...`}
    className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
);

// Filtro para fecha (por defecto)
const DateColumnFilter = ({ column: { filterValue, setFilter } }: any) => (
  <input
    type="date"
    value={filterValue || ''}
    onChange={(e) => setFilter(e.target.value || undefined)}
    placeholder="Filtrar por fecha"
    className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
);

const ListCitas: React.FC = () => {
  const { citas } = usePage().props as { citas: Cita[] }; // Aseguramos que citas es un array de Cita
  const { delete: deleteRequest } = useForm();

  // Usamos useForm para realizar la solicitud PUT
  const { put } = useForm();
  const [feedbackMessage, setFeedbackMessage] = React.useState('');
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set()); // Estado para las citas seleccionadas

  // Función para actualizar el estado de la cita utilizando Inertia (a través de useForm)
  const handleEstadoChange = (id: number, estado: string) => {
    setFeedbackMessage('Actualizando estado...');
    put(`/citas/${id}/estado/${estado}`, {
      onSuccess: () => {
        setFeedbackMessage('Estado actualizado correctamente');
      },
      onError: (error) => {
        setFeedbackMessage('Error al actualizar el estado');
      }
    });
  };

  const handleSelectRow = (id: number) => {
    setSelectedRows((prevSelectedRows) => {
      const newSelectedRows = new Set(prevSelectedRows);
      if (newSelectedRows.has(id)) {
        newSelectedRows.delete(id); // Si ya está seleccionado, lo deseleccionamos
      } else {
        newSelectedRows.add(id); // Si no está seleccionado, lo seleccionamos
      }
      return newSelectedRows;
    });
  };

  const handleSelectAllRows = () => {
    if (selectedRows.size === citas.length) {
      setSelectedRows(new Set()); // Si todos están seleccionados, deseleccionamos
    } else {
      setSelectedRows(new Set(citas.map((cita) => cita.id))); // Seleccionamos todas las citas
    }
  };

  const handleDeleteSelected = () => {
    if (selectedRows.size > 0) {
      const idsToDelete = Array.from(selectedRows);
  console.log(idsToDelete);
      // Usar deleteRequest de Inertia.js para hacer la solicitud DELETE
      deleteRequest('/citas', {
        data: { ids: idsToDelete },
        onSuccess: () => {
          setFeedbackMessage('Citas eliminadas correctamente');
          setSelectedRows(new Set()); // Limpiar las selecciones después de eliminar
        },
        onError: () => {
          setFeedbackMessage('Error al eliminar las citas seleccionadas');
        }
      });
    }
  };

  // Definir las columnas de la tabla
  const columns = React.useMemo(
    () => [
      {
        Header: ({ getToggleAllRowsSelectedProps }: any) => (
          <input
            type="checkbox"
            {...getToggleAllRowsSelectedProps()}
            onChange={handleSelectAllRows}
          />
        ),
        id: 'select', // Un identificador único para esta columna
        disableSortBy: true, // No permitimos ordenar por esta columna
        Cell: ({ row }: any) => (
          <input
            type="checkbox"
            checked={selectedRows.has(row.original.id)}
            onChange={() => handleSelectRow(row.original.id)}
          />
        ),
      },
      {
        Header: 'Estado',
        accessor: 'estado', // Asumiendo que el campo estado está en la cita
        Filter: DefaultColumnFilter, // Filtro para la columna
        Cell: ({ value }: any) => (
          <span className={`px-2 py-1 rounded-md text-xs ${getEstadoClass(value)}`}>
            {value}
          </span>
        ),
      },
      {
        Header: 'Fecha y Hora',
        accessor: 'fecha_hora',
        Cell: ({ value }: any) => new Date(value).toLocaleString(), // Formato de fecha
        Filter: DateColumnFilter, // Filtro para la columna de fecha
      },
      {
        Header: 'Descripción',
        accessor: 'descripcion',
        Filter: DefaultColumnFilter, // Filtro para la columna
      },
      {
        Header: 'Profesional',
        accessor: 'profesional.nombre', // Asegúrate de que el nombre del profesional esté bien accesible
        Filter: DefaultColumnFilter, // Filtro para la columna
      },
      {
        Header: 'Telefono',
        accessor: 'telefono', // Asegúrate de que el nombre del profesional esté bien accesible
        Filter: DefaultColumnFilter, // Filtro para la columna
      },
      {
        Header: 'Acciones',
        Cell: ({ row }: any) => {
          const { id, estado } = row.original; // Accedemos a los datos de la cita
          return (
            <div className="flex space-x-2">
              <button
                onClick={() => handleEstadoChange(id, 'atendida')}
                className="px-1 py-1 bg-green-500 text-white rounded-md text-xs hover:bg-green-600"
              >
                <FaCheckCircle className="w-6 h-6" />
              </button>
              <button
                onClick={() => handleEstadoChange(id, 'cancelada')}
                className="px-1 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600"
              >
                <FaTimesCircle className="w-6 h-6" />
              </button>
              <button
                onClick={() => handleEstadoChange(id, 'reprogramada')}
                className="px-1 py-1 bg-yellow-500 text-white rounded-md text-xs hover:bg-yellow-600"
              >
                <FaRegClock className="w-6 h-6" />
              </button>
            </div>
          );
        },
      },
    ],
    [selectedRows]
  );

  // Función para devolver clases según el estado
  const getEstadoClass = (estado: string) => {
    const estadoClasses = {
      atendida: 'bg-green-100 text-green-800',
      cancelada: 'bg-red-100 text-red-800',
      reprogramada: 'bg-yellow-100 text-yellow-800',
    };

    return estadoClasses[estado] || 'bg-gray-100 text-gray-800';
  };

  // Usamos react-table para configurar la tabla y la paginación
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
    canPreviousPage,
    canNextPage,
    pageCount,
    pageIndex,
    nextPage,
    previousPage,
    gotoPage,
    state: { pageSize, pageIndex: currentPage },
    getToggleAllRowsSelectedProps,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data: citas,
      initialState: { pageSize: 10 }, // Puedes ajustar la cantidad de filas por página
    },
    useFilters, // Para filtros
    usePagination, // Para paginación
    useRowSelect // Asegúrate de incluir useRowSelect
  );

  return (
    <div>
      {/* Feedback message */}
      {feedbackMessage && <div className="p-2 text-green-600">{feedbackMessage}</div>}
      <div className="overflow-hidden max-w-full p-4">
        <div className="overflow-x-auto shadow rounded-lg border border-gray-300 w-full">
          <table className="w-full table-auto table-fixed" {...getTableProps()}>
            <thead className="bg-gray-200">
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column.render('Header')}
                      {/* Renderizamos el filtro de cada columna */}
                      <div>{column.canFilter ? column.render('Filter') : null}</div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} data-id={row.original.id}>
                    {row.cells.map(cell => (
                      <td
                        {...cell.getCellProps()}
                        className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Paginación */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="px-4 py-2 bg-gray-300 text-gray-600 rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span>
              Página {currentPage + 1} de {pageCount}
            </span>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="px-4 py-2 bg-gray-300 text-gray-600 rounded disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>

      {/* Botón de eliminación masiva */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleDeleteSelected}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Eliminar citas seleccionadas
        </button>
      </div>
    </div>
  );
};

export default ListCitas;

import React, { useEffect, useState } from 'react';
import ReservaForm from './ReservaForm';

const ReservasTable = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservas = async () => {
    setLoading(true);
    try {
      const response = await fetch('/reservas');
      const data = await response.json();
      setReservas(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reservas:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  const handleEliminar = async (id) => {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta reserva?');
    if (confirmacion) {
      try {
        const response = await fetch(`/reservas/eliminar/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          alert('Reserva eliminada con éxito.');
          fetchReservas();
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error || 'Algo salió mal.'} `);
        }
      } catch (error) {
        console.error('Error al eliminar la reserva:', error);
        alert('Hubo un error al intentar eliminar la reserva.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <ReservaForm fetchReservas={fetchReservas} />
      </div>
      <div>
        <h1 className="text-xl font-bold mb-4">Lista de Reservas</h1>
        <table className="tabla-detalles">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha de Reserva</th>
              <th>Fecha de Entrada</th>
              <th>Fecha de Salida</th>
              <th>Habitación</th>
              <th>Persona</th>
              <th>Monto Reserva</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.id}>
                <td>{reserva.id}</td>
                <td>{reserva.fecha_reserva}</td>
                <td>{reserva.fecha_entrada}</td>
                <td>{reserva.fecha_salida}</td>
                <td>{reserva.habitacion_info}</td>
                <td>{reserva.nombre_completo}</td>
                <td>{reserva.monto_reserva} Gs.</td>
                <td>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleEliminar(reserva.id)}
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
  );
};

export default ReservasTable;

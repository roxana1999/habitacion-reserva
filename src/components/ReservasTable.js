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
              <th>ID Habitación</th>
              <th>ID Persona</th>
              <th>Monto Reserva</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.id}>
                <td>{reserva.id}</td>
                <td>{reserva.fecha_reserva}</td>
                <td>{reserva.fecha_entrada}</td>
                <td>{reserva.fecha_salida}</td>
                <td>{reserva.habitacion_id}</td>
                <td>{reserva.persona_id}</td>
                <td>{reserva.monto_reserva}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservasTable;

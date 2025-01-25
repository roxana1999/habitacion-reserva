import React, { useState } from 'react';

const ReservaForm = ({ fetchReservas }) => {
  const [fecha_entrada, setFechaEntrada] = useState('');
  const [fecha_salida, setFechaSalida] = useState('');
  const [habitacion_id, setHabitacionId] = useState('');
  const [persona_id, setPersonaId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reserva = {
      fecha_entrada,
      fecha_salida,
      habitacion_id,
      persona_id,
    };

    try {
      const response = await fetch('/reservas/agregar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reserva),
      });

      if (response.ok) {
        fetchReservas(); // Fetch the updated list of reservas
        alert('Reserva creada con éxito');
      } else {
        // If response is not OK, try to parse the error message from the response body
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Algo salió mal'} `);
      }
    } catch (error) {
      console.error('Error al agregar la reserva:', error);
      alert('Error al crear la reserva');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Crear Reserva</h2>
      <div className="mb-3">
        <label className="block font-medium">Fecha de Entrada</label>
        <input
          type="date"
          value={fecha_entrada}
          onChange={(e) => setFechaEntrada(e.target.value)}
          required
          className="border rounded w-full p-2"
        />
      </div>
      <div className="mb-3">
        <label className="block font-medium">Fecha de Salida</label>
        <input
          type="date"
          value={fecha_salida}
          onChange={(e) => setFechaSalida(e.target.value)}
          required
          className="border rounded w-full p-2"
        />
      </div>
      <div className="mb-3">
        <label className="block font-medium">ID de Habitación</label>
        <input
          type="number"
          value={habitacion_id}
          onChange={(e) => setHabitacionId(e.target.value)}
          required
          className="border rounded w-full p-2"
        />
      </div>
      <div className="mb-3">
        <label className="block font-medium">ID de Persona</label>
        <input
          type="number"
          value={persona_id}
          onChange={(e) => setPersonaId(e.target.value)}
          required
          className="border rounded w-full p-2"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white rounded px-4 py-2"
      >
        Crear Reserva
      </button>
    </form>
  );
};

export default ReservaForm;

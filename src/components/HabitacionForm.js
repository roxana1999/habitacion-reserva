import React, { useState } from 'react';

const HabitacionForm = ({ fetchHabitaciones }) => {
  const [habitacion, setHabitacion] = useState({
    habitacion_piso: '',
    habitacion_nro: '',
    cant_camas: '',
    tiene_television: false,
    tiene_frigobar: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHabitacion({
      ...habitacion,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/habitaciones/agregar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(habitacion),
      });
      if (response.ok) {
        alert('Habitación creada exitosamente');
        fetchHabitaciones();
      }
      else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Algo salió mal'} `);
      }
    }
    catch (error) {
      console.error('Error al crear la habitación:', error);
      alert('Error al crear la habitación.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Crear nueva habitación</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Piso</label>
          <input
            type="number"
            name="habitacion_piso"
            value={habitacion.habitacion_piso}
            onChange={handleChange}
            min="1"
            max="10"
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Número de habitación</label>
          <input
            type="number"
            name="habitacion_nro"
            value={habitacion.habitacion_nro}
            onChange={handleChange}
            min="1"
            max="20"
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Cantidad de camas</label>
          <input
            type="number"
            name="cant_camas"
            value={habitacion.cant_camas}
            onChange={handleChange}
            min="1"
            max="4"
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="tiene_television"
            checked={habitacion.tiene_television}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm text-gray-700">Tiene televisión</label>
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="tiene_frigobar"
            checked={habitacion.tiene_frigobar}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm text-gray-700">Tiene frigobar</label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Crear habitación
        </button>
      </form>
    </div>
  );
};

export default HabitacionForm;

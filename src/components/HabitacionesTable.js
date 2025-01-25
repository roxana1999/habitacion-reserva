import React, { useEffect, useState } from 'react';
import HabitacionForm from './HabitacionForm';
import '../Tabla.css';



const HabitacionesTable = () => {
  const [habitaciones, setHabitaciones] = useState([]); // Estado para almacenar las Habitaciones
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  // Función para obtener las Habitaciones del backend
  const fetchHabitaciones = () => {
    setLoading(true); // Activar carga
    fetch('/habitaciones')
      .then((response) => response.json())
      .then((data) => {
        console.log("habitaciones", data);
        setHabitaciones(data); // Actualiza el estado con los datos obtenidos
        setLoading(false); // Cambia el estado de carga a false
      })
      .catch((error) => {
        console.error('Error fetching habitaciones:', error);
        setLoading(false); // Si hay error, también cambia el estado de carga
      });
  };

  // Llamada inicial para obtener las habitaciones
  useEffect(() => {
    fetchHabitaciones(); // Only runs once when the component is mounted
  }, []);

  // Si los datos aún se están cargando, muestra un mensaje de carga
  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <div>
        <HabitacionForm fetchHabitaciones={fetchHabitaciones}/>
      </div>
      <div>
        <h1 className="text-xl font-bold mb-4">Lista de Habitaciones</h1>
        <table className="tabla-detalles">
          <thead>
            <tr>
              <th>ID</th>
              <th>Piso</th>
              <th>Nro</th>
              <th>Cant. camas</th>
              <th>Tiene televisión</th>
              <th>Tiene frigobar</th>
            </tr>
          </thead>
          <tbody>
            {habitaciones.map((h) => (
              <tr key={h.id}>
                <td>{h.id}</td>
                <td>{h.habitacion_piso}</td>
                <td>{h.habitacion_nro}</td>
                <td>{h.cant_camas}</td>
                <td>{h.tiene_television === null || h.tiene_television === 0 ? 'NO' : 'SI'}</td>
                <td>{h.tiene_frigobar === null || h.tiene_frigobar === 0 ? 'NO' : 'SI'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HabitacionesTable;

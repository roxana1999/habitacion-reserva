import React, { useEffect, useState } from 'react';

const PersonasTable = () => {
  const [personas, setPersonas] = useState([]); // Estado para almacenar las personas
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  // Función para obtener las personas del backend
  useEffect(() => {
    fetch('/personas')
      .then((response) => response.json())
      .then((data) => {
        setPersonas(data); // Actualiza el estado con los datos obtenidos
        setLoading(false); // Cambia el estado de carga a false
      })
      .catch((error) => {
        console.error('Error fetching personas:', error);
        setLoading(false); // Si hay error, también cambia el estado de carga
      });
  }, []);

  // Si los datos aún se están cargando, muestra un mensaje de carga
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Lista de Personas</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>Nro Documento</th>
            <th>Correo</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((persona) => (
            <tr key={persona.id}>
              <td>{persona.id}</td>
              <td>{persona.nombre_completo}</td>
              <td>{persona.nro_documento}</td>
              <td>{persona.correo}</td>
              <td>{persona.telefono}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PersonasTable;

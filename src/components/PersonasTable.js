import React, { useEffect, useState } from 'react';
import PersonaForm from './PersonaForm';
import '../Tabla.css';

const PersonasTable = () => {
  const [personas, setPersonas] = useState([]); // Estado para almacenar las personas
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  // Función para obtener las personas del backend
  const fetchPersonas = () => {
    setLoading(true); // Activar carga
    fetch('/personas')
    .then((response) => response.json())
    .then((data) => {
      setPersonas(data); // Actualiza el estado con los datos obtenidos
      setLoading(false); // Cambia el estado de carga a false
    })
    .catch((error) => {
      console.error('Error fetching personas:', error);
      setLoading(false); // Si hay error, también cambia el estado de carga a false
    });
  }

  useEffect(() => {
    fetchPersonas(); // Only runs once when the component is mounted
  }, []);

  const handleEliminar = async (id) => {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta persona?');
    if (confirmacion) {
      try {
        const response = await fetch(`/personas/eliminar/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          alert('Persona eliminada con éxito.');
          fetchPersonas(); // Refresh the list of personas
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error || 'Algo salió mal.'} `);
        }
      } catch (error) {
        console.error('Error al eliminar la persona:', error);
        alert('Hubo un error al intentar eliminar la persona.');
      }
    }
  };

  // Si los datos aún se están cargando, muestra un mensaje de carga
  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <div>
        <PersonaForm fetchPersonas={fetchPersonas}/>
      </div>
      <div>
        <h1 className="text-xl font-bold mb-4">Lista de Personas</h1>
        <table className="tabla-detalles">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Completo</th>
              <th>Nro. Documento</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Acciones</th>
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
                <td>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleEliminar(persona.id)}
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

export default PersonasTable;

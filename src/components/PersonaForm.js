import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const PersonaForm = ({ fetchPersonas }) => {
  const { id } = useParams(); // Get the persona ID from the URL
  const isEditMode = Boolean(id); // Check if we're editing (if `id` exists)

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre_completo: '',
    nro_documento: '',
    correo: '',
    telefono: '',
  });

  useEffect(() => {
    if (isEditMode) {
      // Si se está editando, rellenar los campos del form
      const fetchPersona = async () => {
        try {
          const response = await fetch(`/personas/get_by_id/${id}`);
          const data = await response.json();
          console.log("dats es", data);
          setFormData(data[0]);
        } catch (error) {
          console.error('Error fetching persona:', error);
        }
      };
      fetchPersona();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEditMode ? 'PUT' : 'POST';
    const url = isEditMode ? `/personas/editar/${id}` : '/personas/agregar';
    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        if (isEditMode){
          alert("Persona actualizada con éxito.");
          navigate('/personas');
        }
        else {
          alert('Persona creada exitosamente.');
          setFormData({
            nombre_completo: '',
            nro_documento: '',
            correo: '',
            telefono: '',
          });
          fetchPersonas();
        }
      }
      else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Algo salió mal.'} `);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al procesar la solicitud.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{isEditMode ? 'Editar Persona' : 'Crear Persona'}</h2>
      <div className="mb-3">
        <label htmlFor="nombre_completo" className="block font-medium">Nombre Completo</label>
        <input
          type="text"
          id="nombre_completo"
          name="nombre_completo"
          value={formData.nombre_completo}
          onChange={handleChange}
          required
          className="border rounded w-full p-2"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="nro_documento" className="block font-medium">Nro. Documento</label>
        <input
          type="text"
          id="nro_documento"
          name="nro_documento"
          value={formData.nro_documento}
          onChange={handleChange}
          required
          className="border rounded w-full p-2"
          disabled={isEditMode} // Deshabilitar campo en Modo edición
        />
      </div>
      <div className="mb-3">
        <label htmlFor="correo" className="block font-medium">Correo</label>
        <input
          type="email"
          id="correo"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          className="border rounded w-full p-2"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="telefono" className="block font-medium">Teléfono</label>
        <input
          type="text"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          className="border rounded w-full p-2"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">{isEditMode ? 'Guardar cambios' : 'Crear'}</button>
    </form>
  );
};

export default PersonaForm;

import React, { useState } from 'react';

const PersonaForm = ({ fetchPersonas }) => {
  const [formData, setFormData] = useState({
    nombre_completo: '',
    nro_documento: '',
    correo: '',
    telefono: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/personas/agregar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Persona creada exitosamente.');
        setFormData({
          nombre_completo: '',
          nro_documento: '',
          correo: '',
          telefono: '',
        });
        fetchPersonas();
      }
      else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Algo salió mal.'} `);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrio un error al procesar el request.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Crear Persona</h2>
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
      <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">Crear Persona</button>
    </form>
  );
};

export default PersonaForm;

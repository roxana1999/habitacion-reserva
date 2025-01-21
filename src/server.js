const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json()); // Permite manejar JSON en las solicitudes

// Endpoint para obtener todas las personas
app.get('/personas', (req, res) => {
  const query = 'SELECT * FROM personas';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Endpoint para agregar una persona
app.post('/personas', (req, res) => {
  const { nombre_completo, nro_documento, correo, telefono } = req.body;
  const query = 'INSERT INTO personas (nombre_completo, nro_documento, correo, telefono) VALUES (?, ?, ?, ?)';
  db.query(query, [nombre_completo, nro_documento, correo, telefono], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Persona creada', id: result.insertId });
  });
});

// Iniciar el servidor
app.listen(5000, () => {
  console.log('Servidor ejecutándose en http://localhost:5000');
});

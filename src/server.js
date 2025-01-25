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

// Endpoint para obtener todas las habitaciones
app.get('/habitaciones', (req, res) => {
  const query = 'SELECT * FROM habitaciones';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Endpoint para agregar una persona
app.post('/personas/agregar', (req, res) => {
  console.log("Agregar persona");
  console.log(req.body);
  const { nombre_completo, nro_documento, correo, telefono } = req.body;
  const query = 'INSERT INTO personas (nombre_completo, nro_documento, correo, telefono) VALUES (?, ?, ?, ?)';
  db.query(query, [nombre_completo, nro_documento, correo, telefono], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Persona creada', id: result.insertId });
  });
});

// Endpoint para agregar una habitación
app.post('/habitaciones/agregar', (req, res) => {
  console.log("Agregar habitacion");
  console.log(req.body);
  const { habitacion_piso, habitacion_nro, cant_camas, tiene_television, tiene_frigobar } = req.body;
  const query = 'INSERT INTO habitaciones (habitacion_piso, habitacion_nro, cant_camas, tiene_television, tiene_frigobar) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [habitacion_piso, habitacion_nro, cant_camas, tiene_television, tiene_frigobar], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Habitación creada', id: result.insertId });
  });
});


// Iniciar el servidor
app.listen(5000, () => {
  console.log('Servidor ejecutándose en http://localhost:5000');
});

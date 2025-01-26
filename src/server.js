const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json()); // Permite manejar JSON en las solicitudes

// Endpoint para obtener todas las personas
app.get('/personas', (req, res) => {
  const query = 'SELECT * FROM personas ORDER BY nro_documento';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Endpoint para obtener todas las habitaciones
app.get('/habitaciones', (req, res) => {
  const query = 'SELECT * FROM habitaciones ORDER BY habitacion_piso, habitacion_nro';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Endpoint para obtener todas las reservas
app.get('/reservas', (req, res) => {
  const query = 'SELECT * FROM reservas';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);  // Return all reservations
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

app.post('/reservas/agregar', (req, res) => {
  console.log("Agregar reserva");
  console.log(req.body);
  const { fecha_entrada, fecha_salida, habitacion_id, persona_id } = req.body;

  // Verificar que la habitación esté disponible en el rango de fechas
  const verificar_disponibilidad = `
    SELECT * FROM reservas
    WHERE habitacion_id = ? AND (
      (fecha_entrada BETWEEN ? AND ?) OR
      (fecha_salida BETWEEN ? AND ?)
    )
  `;

  db.query(verificar_disponibilidad, [habitacion_id, fecha_entrada, fecha_salida, fecha_entrada, fecha_salida], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length > 0) {
      console.log("La habitacion no está disponible en este rango de fechas");
      return res.status(400).json({ message: 'La habitación seleccionada no está disponible en este rango de fechas.' });
    }

    const today = new Date();
    const entradaDate = new Date(fecha_entrada);
    const salidaDate = new Date(fecha_salida);

    // Validate fechaentrada > today
    if (entradaDate <= today) {
      return res.status(400).json({ error: 'La fecha de entrada debe ser mayor a la fecha actual.' });
    }

    // Validate fechasalida > fechaentrada
    if (salidaDate <= entradaDate) {
      return res.status(400).json({ error: 'La fecha de salida debe ser mayor a la fecha de entrada.' });
    }

    // Calcular el monto de la reserva (días * Gs. 120.000)
    const dias = (salidaDate - entradaDate) / (1000 * 60 * 60 * 24);
    console.log("salida - entrada", salidaDate - entradaDate);
    console.log("dias ", dias);
    const monto_reserva = dias * 120000;

    // Continue with inserting the reserva into the database
    const query = 'INSERT INTO reservas (fecha_reserva, fecha_entrada, fecha_salida, habitacion_id, persona_id, monto_reserva) VALUES (NOW(), ?, ?, ?, ?, ?)';
    db.query(query, [fecha_entrada, fecha_salida, habitacion_id, persona_id, monto_reserva], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Reserva creada', id: result.insertId });
    });
  }); 
});

// Iniciar el servidor
app.listen(5000, () => {
  console.log('Servidor ejecutándose en http://localhost:5000');
});

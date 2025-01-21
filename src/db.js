const mysql = require('mysql2');

// Configuración de la conexión
const connection = mysql.createConnection({
  host: 'localhost', // Cambia si tu base de datos no está en localhost
  user: 'root', // Usuario de MySQL
  password: 'admin1234', // Contraseña de MySQL
  database: 'bd-reserva-habitaciones', // Nombre de tu base de datos
});

// Verificar conexión
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err.message);
    return;
  }
  console.log('Conectado a MySQL');
});

module.exports = connection;

CREATE TABLE personas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_completo VARCHAR(255) NOT NULL,
  nro_documento VARCHAR(50) UNIQUE NOT NULL,  -- UNIQUE constraint to ensure no duplicate document numbers
  correo VARCHAR(255) NOT NULL,
  telefono VARCHAR(20)
);

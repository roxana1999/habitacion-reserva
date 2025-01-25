CREATE TABLE personas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_completo VARCHAR(255) NOT NULL,
  nro_documento VARCHAR(50) UNIQUE NOT NULL,  -- UNIQUE constraint to ensure no duplicate document numbers
  correo VARCHAR(255) NOT NULL,
  telefono VARCHAR(20)
);

CREATE TABLE habitaciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  habitacion_piso INT CHECK (habitacion_piso > 0 AND habitacion_piso <= 10),
  habitacion_nro INT CHECK (habitacion_nro > 0 AND habitacion_nro <= 20),
  cant_camas INT CHECK (cant_camas >= 1 AND cant_camas <= 4),
  tiene_television BOOLEAN,
  tiene_frigobar BOOLEAN
);

CREATE TABLE reservas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fecha_reserva DATETIME NOT NULL,
  fecha_entrada DATETIME NOT NULL,
  fecha_salida DATETIME NOT NULL,
  habitacion_id INT,
  persona_id INT,
  monto_reserva INT,
  FOREIGN KEY (habitacion_id) REFERENCES habitaciones(id),
  FOREIGN KEY (persona_id) REFERENCES personas(id)
);
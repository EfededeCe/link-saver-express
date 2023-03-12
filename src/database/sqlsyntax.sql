CREATE DATABASE IF NOT EXISTS db_links;

USE db_links;

-- Tabla usuarios

CREATE TABLE usuarios (
    id INT(11) NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    pass VARCHAR(60) NOT NULL,
    nom_comp VARCHAR(100) NOT NULL
);

ALTER TABLE usuarios ADD PRIMARY KEY (id);
ALTER TABLE usuarios MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

SHOW TABLE;

DESCRIBE usuarios;

SELECT * FROM usuarios;



-- Tablas links


CREATE TABLE links (
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    descripcion TEXT,
    usuario_id INT(11),
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

ALTER TABLE links
RENAME COLUMN title to titulo;


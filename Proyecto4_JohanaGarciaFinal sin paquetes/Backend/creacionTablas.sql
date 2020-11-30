--Creando base de datos
CREATE DATABASE `Data Warehouse` /*!40100 COLLATE 'utf8_general_ci' */

--Creando tabla de roles
CREATE TABLE `rol` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`tipoRol` VARCHAR(50) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
)
COLLATE='utf8_general_ci'
;

----Creando tabla de regiones
CREATE TABLE `regiones` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`nombreRegion` VARCHAR(50) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
)
COLLATE='utf8_general_ci'
;

--Creando tabla de usuarios
CREATE TABLE `usuarios` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`nombreUsuario` VARCHAR(50) NOT NULL DEFAULT '0',
	`apellidoUsuario` VARCHAR(50) NOT NULL DEFAULT '0',
	`emailUsuario` VARCHAR(50) NOT NULL DEFAULT '0',
	`contrasena` VARCHAR(50) NOT NULL DEFAULT '0',
	`id_tipoRol` INT NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`),
	UNIQUE INDEX `emailUsuario` (`emailUsuario`),
	CONSTRAINT `FK__rol` FOREIGN KEY (`id_tipoRol`) REFERENCES `rol` (`id`)
)
COLLATE='utf8_general_ci'
;

--Creando tabla de paises
CREATE TABLE `paises` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`nombrePais` VARCHAR(50) NOT NULL DEFAULT '0',
	`id_Region` INT NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`),
	CONSTRAINT `FK__regiones` FOREIGN KEY (`id_Region`) REFERENCES `regiones` (`id`)
)
COLLATE='utf8_general_ci'
;

--Creando tabla de ciudades
CREATE TABLE `ciudades` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`nombreCiudad` VARCHAR(50) NOT NULL DEFAULT '0',
	`id_Pais` INT NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`),
	CONSTRAINT `FK__paises` FOREIGN KEY (`id_Pais`) REFERENCES `paises` (`id`)
)
COLLATE='utf8_general_ci'
;

--Creando tabla de empresas
CREATE TABLE `empresas` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`nombreEmpresa` VARCHAR(50) NOT NULL DEFAULT '0',
	`telefono` VARCHAR(50) NOT NULL DEFAULT '0',
	`emailEmpresa` VARCHAR(50) NOT NULL DEFAULT '0',
	`direccion` VARCHAR(50) NOT NULL DEFAULT '0',
	`id_Ciudad` INT NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`),
	UNIQUE INDEX `emailEmpresa` (`emailEmpresa`),
	CONSTRAINT `FK__ciudades` FOREIGN KEY (`id_Ciudad`) REFERENCES `ciudades` (`id`)
)
COLLATE='utf8_general_ci'
;

--Creando tabla de contactos

CREATE TABLE `contactos` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`nombreContacto` VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`apellidoContacto` VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`cargoContacto` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`emailContacto` VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`id_Empresa` INT(11) NOT NULL DEFAULT '0',
	`id_Ciudad` INT(11) NOT NULL DEFAULT '0',
	`id_direccionContacto` VARCHAR(50) NULL DEFAULT NULL,
	`interes` VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`canalDeContacto` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`cuentaUsuario` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`preferencias` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `emailContacto` (`emailContacto`) USING BTREE,
	INDEX `FK__empresasContactos` (`id_Empresa`) USING BTREE,
	INDEX `FK__ciudadesContactos` (`id_Ciudad`) USING BTREE,
	INDEX `FK_contactos_empresas` (`id_direccionContacto`) USING BTREE,
	CONSTRAINT `FK__ciudadesContactos` FOREIGN KEY (`id_Ciudad`) REFERENCES `data warehouse`.`ciudades` (`id`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	CONSTRAINT `FK__empresasContactos` FOREIGN KEY (`id_Empresa`) REFERENCES `data warehouse`.`empresas` (`id`) ON UPDATE RESTRICT ON DELETE RESTRICT
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=2
;



--insertando datos a la tabla rol
INSERT INTO `rol` (`tipoRol`) 
VALUES ("Administrador"),
("Usuario"),
("Contacto");

--insertando datos a la tabla regiones
INSERT INTO `regiones` (`nombreRegion`) 
VALUES ("Sudamerica"),
("Norteamerica");

--insertando datos a la tabla usuarios
INSERT INTO `usuarios` (`nombreUsuario`, `apellidoUsuario`, `emailUsuario`, `contrasena`, id_tipoRol) 
VALUES ("Johana", "García", "johana@garcia.com", "abcde", 1),
("Juan", "Arellano", "juan@arellano.com", "abcde", 2),
("Isabel", "Araque", "isa@araque.com", "abcde", 2),
("Beatriz", "López", "beatriz@lopez.com", "abcde", 2),
("Julian", "Rendón", "julian@rendon.com", "abcde", 2);


--insertando datos a la tabla paises
INSERT INTO `paises` (`nombrePais`, `id_Region`) 
VALUES ("Argentina", 1),
("Colombia", 1),
("Chile", 1),
("Uruguay", 1),
("Canelones", 1),
("Maldonado", 1),
("Montevideo", 1),
("Mexico", 2),
("Estados Unidos", 2),
("Florida", 2),
("Texas", 2);


--insertando datos a la tabla ciudades 
INSERT INTO `ciudades` (`nombreCiudad`, `id_Pais`) 
VALUES ("Buenos Aires", 1),
("Córdoba", 1),
("Bogotá", 2),
("Cúcuta", 2),
("Medellín", 2),
("Atacam", 3),
("Santiago", 3),
("Valparaíso", 3),
("Ciudad de México", 8),
("Tijuana", 8);


--insertando datos a la tabla empresas
INSERT INTO `empresas` (`nombreEmpresa`, `telefono`, `emailEmpresa`, `direccion`, `id_Ciudad`) 
VALUES ("TopGear", "1234", "TopGear@proyecto.com", "Calle 1", 1),
("Revolution Tec", "4678", "Revolution@proyecto.com", "Calle 2", 1),
("Estudio TIC", "2236", "Estudio@proyecto.com", "Calle 3", 2),
("Rueda Tecnologica", "6678", "Rueda@proyecto.com", "Calle 4", 2),
("Sonoma", "9807", "Sonoma@proyecto.com", "Calle 5", 3),
("TecWoman", "1321", "TecWoman@proyecto.com", "Calle 6", 3),
("Fotón", "3452", "Fotón@proyecto.com", "Calle 7", 4),
("Silverlight", "6789", "Silverlight@proyecto.com", "Calle 8", 4),
("Mosaico Tecnologias", "5432", "Mosaico@proyecto.com", "Calle 9", 5),
("Núcleos Tec", "5679", "Núcleos@proyecto.com", "Calle 10", 5),
("Cirro Tecnologico", "8754", "Cirro@proyectos.com", "Calle 11", 6),
("Sedona", "3456", "Sedona@proyectos.com", "Calle 12", 6),
("Riviera Tecnologias", "6754", "Riviera@proyectos.com", "Calle 13", 7),
("Intstantáneo", "8759", "Intstantáneo@proyectos.com", "Calle 14", 7),
("Océano Azul", "4578", "Océano@proyecto.com", "Calle 15", 8),
("Civil Tecnologia", "9054", "Civil@proyecto.com", "Calle 16", 8),
("Casa del Árbol", "2367", "Casa@proyecto.com", "Calle 17", 9),
("Inventos Yum", "6789", "Inventos@proyectos.com", "Calle 18", 9),
("Big Bang Diseño", "4578", "Big@proyectos.com", "Calle 19", 10),
("Sable ideas", "8967", "Sable@proyectos.com", "Calle 20", 10);



--insertando datos a la tabla de contactos
INSERT INTO `contactos` (`nombreContacto`, `apellidoContacto`, `cargoContacto`, `emailContacto`, `id_Empresa`, `id_Ciudad`, `id_direccionContacto`, `interes`, `canalDeContacto`, `cuentaUsuario`, `preferencias`) 
VALUES ("Camilo", "Gonzales", "Administrador", "camilo@gonzales", 1, 1, "Calle 1", "75%", "Instagram", "Cami@gon", "Canal Favorito"), 
("Andrea", "López", "Gerente", "andrea@glopez", 2, 2, "Calle 2", "50%", "Facebook", "Cami@gon", "Sin Preferencias"),
("Cristina", "Martínez", "Vendedor", "cristina@martinez", 3, 3, "Calle 3", "100%", "Linkedin", "sakuHime", "No Molestar"),
("Joel", "Corredor", "Contador", "joel@corredor", 4, 4, "Calle 4", "0%", "Whatsapp", "Atosha", "Sin Preferencias"),
("Manuel", "Diaz", "diseñador", "manuel@diaz", 5, 5, "Calle 5", "50%", "Fcebook", "LaNena", "No Molestar"),
("Sebastian", "Fuentes", "Instructor", "sebastian@fuentes", 6, 6, "Calle 6", "75%", "Flor", "Cami@gon", "Sin Preferencias"),
("Felipe", "Alzate", "Docente", "felipe@alzate", 7, 7, "Calle 7", "25%", "Whatsapp", "joha1698", "Canal Favorito"),
("Jose", "Griseñas", "Ingeniero", "jose@griseñas", 8, 8, "Calle 8", "75%", "Linkedin", "Corredor123", "No Molestar"),
("Luis", "Araque", "Comunicador", "luis@araque", 9, 9, "Calle 9", "100%", "Facebook", "Creadorabc", "Sin Preferencias"),
("Rodrigo", "Montes", "Bailarin", "rodrigo@montes", 1, 10, "Calle 10", "25%", "Instagram", "Arellano", "Canal Favorito");

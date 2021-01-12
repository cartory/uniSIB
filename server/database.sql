
create table autor (
  id int AUTO_INCREMENT PRIMARY key,
  nombre varchar(50) not null,
  nacionalidad varchar(20),
  biografia text
);

create table genero (
  id int AUTO_INCREMENT PRIMARY key,
  nombre varchar(20) not null,
  descripcion text,

  generoID int,
  foreign key (generoID) references genero(id)
);

create table ubicacion (
  id int AUTO_INCREMENT PRIMARY key,
  tipo varchar(30) not null,
  nombre varchar(30),
  descripcion text,

  ubicacionID int,
  foreign key (ubicacionID) references ubicacion(id)
);

create table libro (
	  id int AUTO_INCREMENT PRIMARY key,
  	titulo varchar(30) not NULL,
  	sinopsis text,
    fechaPublicacion date,
    cantidad int not null,
    estado varchar(10),

    autorID int,
    generoID int,
    ubicacionID int,

    foreign key (autorID) references autor(id),
    foreign key (generoID) references genero(id),
    foreign key (ubicacionID) references ubicacion(id)
);

create table estudiante (
  id int AUTO_INCREMENT PRIMARY key,
  cedula int not null,
  nombre varchar(50) not null,
  correo varchar(30),
  registro int,
);

create table solicitud (
  id int AUTO_INCREMENT PRIMARY key,
  estado varchar(20) not null,
  fechaSolicitud date,
  cantidadDias int,
  estudianteID int,

  foreign key (estudianteID) references persona(id)
);

create table presta (
  libroID int,
  solicitudID int,

  PRIMARY key (libroID, solicitudID),

  foreign key (libroID) references libro(id),
  foreign key (solicitudID) references solicitud(id)
);
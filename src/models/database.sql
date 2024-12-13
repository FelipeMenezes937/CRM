CREATE DATABASE CRM;
USE CRM;

create table cliente(
id int not null auto_increment,
nome varchar(80) not null,
empresa varchar(80) not null,
email varchar(80) not null,
tel int not null,
uf char(2),
primary key (id)
);

create table adm(
idAdm int not null auto_increment,
nome varchar(80) not null,
email varchar(80) not null,
senha char(32)not null,
primary key (idAdm)
)
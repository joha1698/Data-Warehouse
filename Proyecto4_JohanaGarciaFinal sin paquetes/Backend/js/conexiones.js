//variables de entorno
require("dotenv").config();

//aplicacion express
const express = require("express");
const app = express();
app.use(express.json());

//Sequelieze y conexión a base de datos
const Sequelieze = require("sequelize");
const sequelize = new Sequelieze("data warehouse", process.env.u, process.env.c, 
{ 
    dialect: "mariadb",
    host: "127.0.0.1"
});

sequelize.authenticate()
    .then(()=>{console.log("conectado a la base de datos")})
    .catch((error)=>{console.log(error)});

module.exports = {
    app,
    sequelize
}
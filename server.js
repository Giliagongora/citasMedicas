const express = require("express");
const app = express();
const axios = require("axios");
const uuid = require("uuid");
const chalk = require("chalk");
const _ = require('lodash');
const moment = require('moment');
let today=moment();

const PORT = process.env.PORT || 3000;

// app.listen(PORT, ()=> {
//     console.log("SERVER LISTENING IN PORT: " + PORT)
// })

// Ruta para test: 200
app.get("/saludo", (req, res) => {
  res.send("¡Hola, mundo!");
});


let usuarios = [];

// Ruta para obtener datos de Jsonplaceholder API
app.get("/usuarios", async (req, res) => {
  try {
    const response = await axios.get(" https://randomuser.me/api/?results=11");
    const usuarios = response.data;
    // console.log(usuarios)
    res.json(usuarios);
    // usuarios = usuarios.concat(usuarios.results);
    // console.log(usuarios);
    let newUuid = uuid.v4();
    newUuid = newUuid.slice(0, 6);


    

    // Recorrer cada usuario y agregar el nombre al arreglo
    usuarios.results.forEach((usuario) => {
      let datosUsuarios = {
        nombre: usuario.name.first,
        apellido: usuario.name.last,
        genero: usuario.gender,
        UUID: newUuid,
      };

      let usuariosIngresados = [];
      usuariosIngresados.push(datosUsuarios);
      let nombre = usuario.name.first;
      let apellido = usuario.name.last;
      let UUID = datosUsuarios.UUID;
      let genero = datosUsuarios.genero;

console.log(chalk.white.bgBlue.bold("Nombre: " + nombre + " - Apellido: " + apellido + " - UUID: " + UUID));
    //   console.log(usuariosIngresados);

    // const arregloFinal = _.partition(datosUsuarios, { genero: 'male' });
    // //   console.log("Arreglo final: ", arregloFinal);
    //   console.log("Mujeres: ", arregloFinal[0]);
    //   console.log("Hombres: ", arregloFinal[1]);





    });   

  } catch (error) {
    console.log("Error: ", error.message);
    res.status(404).json({ error: error.message });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

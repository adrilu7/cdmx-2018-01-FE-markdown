
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');


const mdLinks = (file) => {
  // data es la ruta relativa del archivo README.md
  // console.log(file);
  let rutAbsoluta = path.resolve(file);
  // este metodo cambia de ruta relativa a ruta absoluta
  // console.log(absoluta);
  fs.readFile(rutAbsoluta, 'utf8', (err, data)=> {
    // este metodo entra a la ruta y se pasa una funcion
    // console.log(rutAbsoluta);
    if (err) {
      // si hay error manda esto
      console.log('Error en archivo');
    } else {
      // si no hay error se guarda la data en una variable
      // let lineas = data.split('\n');
      // y la data se le pasa un metodo que lo divide linea por linea y regresa un arreglo
      // console.log(lineas);
      let exRegLink = /(http:\/\/|https:\/\/|www\.)[^\s]+/gim;
      // expresion regular para comparar el link
      let exRegTexto = /\[[A-ZÑ_áéíóú\`\.\,\(\)\- \/$]*\]/gim;
      // Expresion regular del texto
      let arrayText = data.match(exRegTexto);
      // match obtiene todas las comparaciones
      let arrayLinks = data.match(exRegLink);
      // console.log(arrayLinks);
      let info = [];
      for (let i = 0; i < arrayLinks.length; i++) {
        arrayLinks[i] = arrayLinks[i].replace(/\)/g, '');
        arrayText[i] = arrayText[i].replace(/\[|\]/gm, '');
        info.push({
          href: arrayLinks[i],
          text: arrayText[i],
          file: rutAbsoluta,
        });
        // console.log(info);
      }
      validarLinks(info);
      return info;
    };
  });
};


const validarLinks = (info) => {
  // console.log(arrayLinks);
  // recorre arreglo
  for (i = 0; i < info.length; i++) {
    let urls = (info[i]);
    fetch(urls).then((res) => {
      // console.log(res);
      let resUrls = res.url;
      console.log(resUrls);
      let resStat = res.status;
      console.log(resStat);
      let resTex = res.statusText;
      console.log(resTex);
    })

      .catch(error => {
        console.log('Error', error);
      });
  };
};

mdLinks('./README.md');

module.exports = mdLinks;


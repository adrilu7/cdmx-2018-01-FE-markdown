const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const file = './README.md';


const pathLink = (file) => {
  return new Promise((resolve, reject) => {
    if (path.isAbsolute(file)) {
      reject('No tienes ruta absoluta');
    }
    let rutaAbsoluta = path.resolve(file);
    //console.log(rutaAbsoluta);
    return resolve(rutaAbsoluta);
  });
};


const readFile = (rutaAbsoluta) => {// readfile cambia a formato utf8
  return new Promise((resolve, reject) => {
    fs.readFile(rutaAbsoluta, 'utf8', (err, data) => {
      if (err) reject('No se puede leer este archivo');
      resolve(data);
    });
  });
};


const link = (data) => {
  return new Promise((resolve, reject) => {
    if (!data) {
      return reject('Error al buscar links');
    } else {
      const exRegLink = /(http:\/\/|https:\/\/|www\.)[^\s]+/gim; // expresion regular para comparar el link
      const exRegTexto = /\[[A-ZÑ_áéíóú\`\.\,\(\)\- \/$]*\]/gim;// Expresion regular del texto
      const arrayText = data.match(exRegTexto);// match obtiene todas las comparaciones
      const arrayLinks = data.match(exRegLink);// console.log(arrayLinks);
      let infoLinks = [];
      let fileLink = path.resolve(file);
      for (let i = 0; i < arrayLinks.length; i++) {
        arrayLinks[i] = arrayLinks[i].replace(/\)/g, '');
        arrayText[i] = arrayText[i].replace(/\[|\]/gm, '');
        infoLinks.push({
          href: arrayLinks[i],
          text: arrayText[i],
          file: fileLink
          // status: ''
        });
      };
       //console.log(infoLinks);
      return resolve(infoLinks);
    }
  });
};

const validarLinks = (infoLinks) => {
  return new Promise((resolve, reject) => {
    if (!infoLinks) reject('Error al buscar links');
    for (i = 0; i < infoLinks.length; i++) {
      let urls = (infoLinks[i]);
      fetch(urls).then((res) => {
        const resStat = res.status;
        const resTex = res.statusText;
        infoLinks.status = resStat + ' ' + resTex;
        console.log(infoLinks);
      });
    }
    resolve(infoLinks);
    // console.log(finalLinks);
  });
};


const mdLinks = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('Error, No tienes README.md');
    }
    resolve(file);
    // console.log(file);
  });
};


mdLinks(file)
  .then(respon => pathLink(respon))
  .then(respon => readFile(respon))
  .then(respon => link(respon))
  .then(respon => validarLinks(respon))
  .catch(err => console.log('Hubo un error: ' + err.message));

module.exports = mdLinks;

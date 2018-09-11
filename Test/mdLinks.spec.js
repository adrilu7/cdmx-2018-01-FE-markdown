
const mdLinks = require('./index');

describe('mdLinks', () => {
  test('Deberia ser una funcion', ()=>{
    expect(typeof mdLinks).toEqual('function');
  });
});

describe('validarLinks', () => {
  test('Deberia ser una funcion', ()=>{
    expect(typeof validarLinks).toEqual('function');
  });
});

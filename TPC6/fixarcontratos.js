const fs = require('fs');
const contratos = require('./contratos.json'); // ficheiro original com idcontrato

const contratosCorrigidos = contratos.map(c => {
  c._id = c.idcontrato;
  delete c.idcontrato;
  return c;
});

fs.writeFileSync('contratos_fixed.json', JSON.stringify(contratosCorrigidos, null, 2));
console.log('Ficheiro contratos_fixed.json criado com sucesso!');

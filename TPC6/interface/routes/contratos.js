var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/', async function(req, res) {
  try {
    const response = await axios.get('http://localhost:3000/contratos');
    res.render('index', { contratos: response.data });
  } catch (e) {
    res.status(500).send("Erro ao carregar contratos.");
  }
});

router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:3000/contratos/${req.params.id}`);
    res.render('contrato', { contrato: response.data });
  } catch (error) {
    console.error("Erro na rota /contratos/:id =>", error.message);
    console.error(error.response?.data || error);
    res.status(500).send("Erro ao obter dados do contrato.");
  }
});


module.exports = router;

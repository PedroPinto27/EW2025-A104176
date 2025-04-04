var express = require('express');
var router = express.Router();
var Aluno = require('../controllers/alunos')

/* GET home page. */
router.get('/', (req, res) => {
  Aluno.list()
      .then(dados => {
          res.json(dados);  // Enviar os dados como JSON
      })
      .catch(erro => {
          console.error('Erro ao buscar dados:', erro);
          res.status(500).json({ erro });
      });
});


router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  Aluno.findById(id)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

router.post('/', function(req, res, next) {
  Aluno.insert(req.body)
    .then(data => res.status(201).jsonp(data))
    .catch(erro => res.jsonp(erro))
});

router.put('/:id', function(req, res, next) {
  var id = req.params.id;
  Aluno.update(id, req.body)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  Aluno.delete(id)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

router.put('/:id/tpc/:idTpc', function(req, res, next) {
  Aluno.inverteTpc(req.params.id, req.params.idTpc)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

module.exports = router;
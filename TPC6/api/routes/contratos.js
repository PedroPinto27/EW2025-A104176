var express = require('express');
var router = express.Router();
var Contrato = require('../controllers/contrato');

// GET /contratos?entidade=...&tipo=...
router.get('/', function(req, res, next) {
    if (req.query.entidade) {
        Contrato.getContratosByEntidade(req.query.entidade)
            .then(data => res.status(200).jsonp(data))
            .catch(error => res.status(500).jsonp(error));
    } else if (req.query.tipo) {
        Contrato.getContratosByTipo(req.query.tipo)
            .then(data => res.status(200).jsonp(data))
            .catch(error => res.status(500).jsonp(error));
    } else {
        Contrato.getContratos()
            .then(data => res.status(200).jsonp(data))
            .catch(error => res.status(500).jsonp(error));
    }
});

// GET /contratos/:id
router.get('/:id', function(req, res, next) {
    Contrato.getContratoById(req.params.id)
        .then(data => {
            if (data) res.status(200).jsonp(data);
            else res.status(404).jsonp({ error: "Contrato não encontrado." });
        })
        .catch(error => res.status(500).jsonp(error));
});

// GET /contratos/entidades
router.get('/entidades/lista', function(req, res, next) {
    Contrato.getEntidades()
        .then(data => res.status(200).jsonp(data))
        .catch(error => res.status(500).jsonp(error));
});

// GET /contratos/tipos
router.get('/tipos/lista', function(req, res, next) {
    Contrato.getTiposProcedimento()
        .then(data => res.status(200).jsonp(data))
        .catch(error => res.status(500).jsonp(error));
});

// POST /contratos
router.post('/', function(req, res, next) {
    Contrato.addContrato(req.body)
        .then(data => res.status(201).jsonp(data))
        .catch(error => res.status(500).jsonp(error));
});

// DELETE /contratos/:id
router.delete('/:id', function(req, res, next) {
    Contrato.deleteContrato(req.params.id)
        .then(data => res.status(200).jsonp({ message: "Contrato eliminado com sucesso." }))
        .catch(error => res.status(500).jsonp(error));
});

// PUT /contratos/:id
router.put('/:id', function(req, res, next) {
    Contrato.updateContrato(req.params.id, req.body)
        .then(data => res.status(200).jsonp(data))
        .catch(error => res.status(500).jsonp(error));
});

module.exports = router;

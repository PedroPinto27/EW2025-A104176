var express = require('express');
var router = express.Router();
var Livro = require('../controllers/livro')
var LivroModel = require('../models/livro') 

/* GET home page. */
router.get('/', function(req, res, next) {
// GET /livros?charater=EEEE:
    if (req.query.character) {
        Livro.getLivrosByCharacter(req.query.character)
            .then(data => res.status(200).jsonp(data))
            .catch(error => res.status(500).jsonp(error));
    } else if (req.query.genre) {
// GET /livros?genre=AAA
        Livro.getLivrosByGenre(req.query.genre)
            .then(data => res.status(200).jsonp(data))
            .catch(error => res.status(500).jsonp(error));
    } else {
// GET /livros
        Livro.getLivros()
            .then(data => res.status(200).jsonp(data))
            .catch(error => res.status(500).jsonp(error));
    }
});

router.get('/autores/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const livros = await LivroModel.find({ "author._id": id });
        if (livros.length === 0) {
            return res.status(404).json({ erro: "Autor não encontrado" });
        }
        res.json(livros);
    } catch (err) {
        res.status(500).json({ erro: "Erro no servidor" });
    }
});

// GET /livros/:id
router.get('/:id', function(req, res, next) {
  Livro.getLivroById(req.params.id)
        .then(data => {
            if (data) res.status(200).jsonp(data);
            else res.status(404).jsonp({ error: "Livro não encontrado." });
        })
        .catch(error => res.status(500).jsonp(error));
});

// GET /livros/genres
router.get('/genres/lista', function(req, res, next) {
    Livro.getGenres()
        .then(data => res.status(200).jsonp(data))
        .catch(error => res.status(500).jsonp(error));
});

// GET /livros/characters
router.get('/characters/lista', function(req, res, next) {
    Livro.getCharacters()
        .then(data => res.status(200).jsonp(data))
        .catch(error => res.status(500).jsonp(error));
});

// POST /livros:
router.post('/', function(req, res, next) {
    Livro.addLivro(req.body)
        .then(data => res.status(201).jsonp(data))
        .catch(error => res.status(500).jsonp(error));
});

// DELETE /livros/:id
router.delete('/:id', function(req, res, next) {
    Livro.deleteLivro(req.params.id)
        .then(data => res.status(200).jsonp({ message: "Livro eliminado com sucesso." }))
        .catch(error => res.status(500).jsonp(error));
});

// PUT /livros/:id
router.put('/:id', function(req, res, next) {
    Livro.updateLivro(req.params.id, req.body)
        .then(data => res.status(200).jsonp(data))
        .catch(error => res.status(500).jsonp(error));
});



module.exports = router;

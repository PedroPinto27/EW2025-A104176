var express = require('express');
var router = express.Router();
const axios = require('axios');

// Rota principal (GET /livros)
router.get('/', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:17000/livros');
        const livros = response.data;

        res.render('listaLivros', { livros });
    } catch (error) {
        console.error('Erro ao buscar dados:', error.message);
        res.status(500).send('Erro ao obter dados');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const response = await axios.get(`http://localhost:17000/livros/${req.params.id}`);
        const livro = response.data;

        res.render('livro', { livro });
    } catch (error) {
        console.error('Erro ao buscar livro:', error.message);
        res.status(500).send('Erro ao obter dados do livro');
    }
});

router.get('/entidades/:idAutor', async (req, res) => {
    try {
      const id = req.params.idAutor;
      const response = await axios.get(`http://localhost:17000/livros`);
      const todosLivros = response.data;
  
      const livrosDoAutor = todosLivros.filter(livro =>
        livro.author.some(a => a._id === id)
      );
  
      const nomeAutor = livrosDoAutor.length > 0
        ? livrosDoAutor[0].author.find(a => a._id === id).name
        : id;
  
      res.render('autor', {
        autor: { _id: id, name: nomeAutor },
        livros: livrosDoAutor,
        total: livrosDoAutor.length
      });
    } catch (err) {
      res.status(500).send("Erro ao carregar autor.");
    }
  });
module.exports = router;

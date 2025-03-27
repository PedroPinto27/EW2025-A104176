var express = require('express');
var router = express.Router();
const axios = require('axios');

/* Página inicial */
router.get('/', async (req, res, next) => {
  try {
    const resp = await axios.get("http://localhost:3000/alunos");
    const data = resp.data;
    res.status(200).render('studentsListPage', { slist: data });
  } catch (error) {
    console.log(error);
    res.render('error', { error });
  }
});

/* Página de registo */
router.get('/registo', (req, res, next) => {
  res.render('studentsFormPage');
});

/* Registar aluno */
router.post('/registo', async (req, res) => {
  try {
    await axios.post("http://localhost:3000/alunos", req.body);
    res.redirect('/alunos');
  } catch (error) {
    console.error('Erro ao criar aluno:', error);
    res.status(500).send('Erro ao criar o aluno');
  }
});

/* Página de detalhes do aluno */
router.get('/:id', async (req, res, next) => {
  try {
    const resp = await axios.get(`http://localhost:3000/alunos/${req.params.id}`);
    const data = resp.data;
    res.status(200).render('studentsPage', { aluno: data });
  } catch (error) {
    console.log(error);
    res.render('error', { error });
  }
});

/* Página de edição de aluno */
router.get('/edit/:id', async (req, res, next) => {
  try {
    const resp = await axios.get(`http://localhost:3000/alunos/${req.params.id}`);
    const data = resp.data;
    res.status(200).render('studentsEditPage', { a: data });
  } catch (error) {
    console.log(error);
    res.render('error', { error });
  }
});

/* Editar aluno */
router.post('/edit/:id', async (req, res) => {
  try {
    await axios.put(`http://localhost:3000/alunos/${req.params.id}`, req.body);
    res.redirect('/alunos');
  } catch (error) {
    console.error('Erro ao editar aluno:', error);
    res.status(500).send('Erro ao editar o aluno');
  }
});

/* Apagar aluno */
router.get('/delete/:id', async (req, res, next) => {
  try {
    await axios.delete(`http://localhost:3000/alunos/${req.params.id}`);
    res.redirect('/alunos');
  } catch (error) {
    console.log(error);
    res.render('error', { error });
  }
});

module.exports = router;

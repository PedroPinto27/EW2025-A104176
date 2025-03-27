// app.js
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');

var app = express();

// Configuração do motor de templates Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));  // Certifique-se de que a pasta 'views' existe e está no lugar correto

var mongoDB = 'mongodb://127.0.0.1:27017/EW2025';
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de Conexão ao MongoDB.'));
db.once('open', () => console.log('Conexão ao MongoDB realizada com sucesso.'));

var alunosRouter = require('./routes/alunos');
app.use('/alunos', alunosRouter);
app.use(express.json());  // Para garantir que req.body é analisado como JSON

// Tratamento de erros (não relacionado ao view engine, mas útil para não deixar erros não tratados)
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');  // Garante que o erro seja renderizado corretamente
});

module.exports = app;

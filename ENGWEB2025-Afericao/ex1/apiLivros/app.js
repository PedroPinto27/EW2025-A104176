var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var livrosRouter = require('./routes/livros');

var mongoose = require ('mongoose')
var mongoDB = 'mongodb://localhost:27017/livros';
mongoose.connect(mongoDB)
var db = mongoose.connection;
db.on('error',console.error.bind(console, 'Erro de Conexão'));
db.once('open', () => console.log('Conexão realizada!'));

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/livros', livrosRouter);

module.exports = app;

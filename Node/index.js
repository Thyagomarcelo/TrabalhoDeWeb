//conecta o banco ao server express
const mongoose = require("./db").default;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');

var jogo_controle = require('./controles/jogo_controle');
var usuario_controle = require('./controles/usuario_controle');
var review_controle = require('./controles/review_controle');
//var imagem_controle = require('./controles/imagem_controle');

var app = express();
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));
app.use(methodOverride('_method'));

app.listen(3000, () => console.log ('Server iniciado na porta 3000'));
app.use('/jogos', jogo_controle);
app.use('/user', usuario_controle);
app.use('/review',review_controle);
//app.use('/imagem',imagem_controle);
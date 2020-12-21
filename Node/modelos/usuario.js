//cria o modelo da tabela usuário
const mongoose = require('mongoose');

var Usuario = mongoose.model('Usuario',{
    email: {type: String, required: true},
    nome: {type: String, required: true},
    senha: {type: String, required: true}
});

module.exports = {Usuario};
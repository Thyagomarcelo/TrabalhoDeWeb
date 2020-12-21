//cria o modelo da tabela jogo
const mongoose = require('mongoose');

var Jogo = mongoose.model('Jogo', {
    nome: {type: String, required: true},
    console: {type: String, required: true},
    resumo: {type: String, required: true},
    desenvolvedor: {type: String, required: true},
    genero: {type: String, required: true},
    nota: {type: Number},
    imagem: {type: String}
});

module.exports = {Jogo};
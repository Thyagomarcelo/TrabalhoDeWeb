//cria o modelo da tabela review
const mongoose = require('mongoose');

var Review = mongoose.model('Review',{
    usuario: {type: String, required: true},
    jogo: {type: String, required: true},
    texto: {type: String},
    nota: {type: Number, required: true},
});

module.exports = {Review};
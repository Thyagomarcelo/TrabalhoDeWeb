//controla as operacoes dos modelos jogo
const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Jogo } = require('../modelos/jogo');

//insere um jogo
router.post('/', (req, res) => {
    var nJogo = new Jogo({
        nome: req.body.nome,
        console: req.body.console,
        resumo: req.body.resumo,
        desenvolvedor: req.body.desenvolvedor,
        genero: req.body.genero,
        nota: req.body.nota,
        imagem : req.body.imagem
    });

    nJogo.save((err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Erro ao Inserir jogo: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

//retorna todos os jogos
router.get('/', (req, res) => {
    Jogo.find((err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            console.log('Erro ao encontrar jogos: ' + JSON.stringify(err, undefined, 2));
        }
    });
});


//retorna todos os jogos por console
router.get('/:console', (req, res) => {
    Jogo.find({console :req.params.console}, (err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            console.log('Erro ao encontrar jogos deste console: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

//retorna jogos por nome, dentro de um console
-router.get('/n/:nome', (req, res) => {
    Jogo.find({nome :req.params.nome}, (err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            console.log('Erro ao encontrar jogos deste console: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

//retorna todos os jogos por genero, dentro de um console
router.get('/:console/g/:genero', (req, res) => {
    Jogo.find({console :req.params.console, genero :req.params.genero}, (err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            console.log('Erro ao encontrar jogos deste console: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

//retorna todos os jogos por desenvolvedor, dentro de um console
router.get('/:console/d/:desenvolvedor', (req, res) => {
    Jogo.find({console :req.params.console, desenvolvedor :req.params.desenvolvedor}, (err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            console.log('Erro ao encontrar jogos deste console: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

//retorna jogo por id
router.get('/id/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('Não foi possivel identificar ID: ' + req.params.id);
    }
    Jogo.findById(req.params.id, (err,doc) => {
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Erro ao encontrar Jogo por id: ' + JSON.stringify(err,undefined,2));
        }
    });
});

//atualiza um jogo
router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('Não foi possivel identificar ID: ' + req.params.id);
    }

    var nJogo = {
        nome: req.body.nome,
        console: req.body.console,
        resumo: req.body.resumo,
        desenvolvedor: req.body.desenvolvedor,
        genero: req.body.genero,
        nota: req.body.nota
    };
    Jogo.findByIdAndUpdate(req.params.id, {$set:nJogo}, {new:true}, (err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Erro ao atualizar jogo: ' + JSON.stringify(err,undefined,2));
        }
    });

});

//deleta um jogo
router.delete('/:id', (req,res) =>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('Não foi possivel identificar ID: ' + req.params.id);
    }
    Jogo.findOneAndRemove(req.params.id,  (err, doc) => {
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Erro ao Excluir Jogo: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;
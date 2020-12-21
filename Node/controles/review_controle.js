//controla as operações dos modelos review
const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {Review} = require('../modelos/review');

//insere nova review
router.post('/', (req, res) => {
    var nReview = new Review({
        usuario: req.body.usuario,
        jogo: req.body.jogo,
        texto: req.body.texto,
        nota: req.body.nota
    });

    nReview.save((err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Erro ao Cadastrar Review: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

//retorna todas as reviews
router.get('/', (req, res) => {
    Review.find((err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            console.log('Erro ao encontrar Reviews: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

//retorna review por id
router.get('/id/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('Não foi possivel identificar ID: ' + req.params.id);
    }
    Review.findById(req.params.id, (err,doc) => {
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Erro ao encontrar Review por id: ' + JSON.stringify(err,undefined,2));
        }
    });
});

//retorna todas as reviews de um jogo
router.get('/:jogo', (req, res) => {
    Review.find({jogo :req.params.jogo}, (err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            console.log('Erro ao encontrar review: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

//retorna todas as reviews de um usuário
router.get('/user/:usuario', (req, res) => {
    Review.find({usuario :req.params.usuario}, (err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            console.log('Erro ao encontrar review: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

//retorna todas as reviews de um jogo por um usuario
router.get('/:jogo/:usuario', (req, res) => {
    Review.find({jogo :req.params.jogo, autor: req.params.autor}, (err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            console.log('Erro ao encontrar review: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

//atualiza uma review
router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('Não foi possivel identificar ID: ' + req.params.id);
    }

    var nReview = {
        usuario: req.body.usuario,
        jogo: req.body.jogo,
        texto: req.body.texto,
        nota: req.body.nota
    };

    Review.findByIdAndUpdate(req.params.id, {$set:nReview}, {new:true}, (err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Erro ao atualizar review: ' + JSON.stringify(err,undefined,2));
        }
    });
});

//deleta uma review
router.delete('/:id', (req,res) =>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('Não foi possivel identificar ID: ' + req.params.id);
    }
    Review.findOneAndRemove(req.params.id,  (err, doc) => {
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Erro ao excluir review: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;
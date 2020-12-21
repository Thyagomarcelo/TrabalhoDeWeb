//controla as operações dos modelos usuario
const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {Usuario} = require('../modelos/usuario');

//insere um novo usuário
router.post('/', (req, res) => {
    var nUser = new Usuario({
        email: req.body.email,
        nome: req.body.nome,
        senha: req.body.senha
    });

    nUser.save((err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Erro ao Cadastrar Usuário: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

//retorna todos os usuários

router.get('/', (req, res) => {
    Usuario.find((err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            console.log('Erro ao encontrar usuários: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

//retorna usuário por id
router.get('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('Não foi possivel identificar ID: ' + req.params.id);
    }
    Usuario.findById(req.params.id, (err,doc) => {
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Erro ao encontrar Usuário por id: ' + JSON.stringify(err,undefined,2));
        }
    });
});

//retorna usuário por email
router.get('/email/:email', (req, res) => {
    Usuario.find({email :req.params.email}, (err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            console.log('Erro ao encontrar usuário: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

//atualiza um usuário
router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('Não foi possivel identificar ID: ' + req.params.id);
    }

    var nUser = {
        email: req.body.email,
        nome: req.body.nome,
        senha: req.body.senha
    };

    Usuario.findByIdAndUpdate(req.params.id, {$set:nUser}, {new:true}, (err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Erro ao atualizar usuario: ' + JSON.stringify(err,undefined,2));
        }
    });
});

//deleta um usuario
router.delete('/:id', (req,res) =>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('Não foi possivel identificar ID: ' + req.params.id);
    }
    Usuario.findOneAndRemove(req.params.id,  (err, doc) => {
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Erro ao Excluir Usuário: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;
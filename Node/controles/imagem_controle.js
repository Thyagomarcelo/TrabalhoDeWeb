//controla as operações de fotos de jogo
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const this_mongoose = require('../db');

var router = express.Router();
var db = this_mongoose.connection;

//inicializa GridFs
let gfs;
db.once('open', () => {
    gfs = Grid(db, mongoose.mongo);
    gfs.collection('imagens');
});

//cria objeto de armazenamento
const storage = new GridFsStorage({ url: 'mongodb://localhost:27017/Planet' });
const upload = multer({ storage });

//insere nova imagem
router.post('/upload', upload.single('foto'), (req, res) => {
    
        return res.json(res.body);
    
});

//retorna todas as fotos em json
router.get('/', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'Não existem fotos'
            });
        }

        return res.json(files);
    });
});

//retorna foto por id em Json
router.get('/:id', (req, res) => {
    gfs.files.findOne({ _id: req.params.id }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'Não existem fotos'
            });
        }

        return res.json(file);
    });
});

//retorna foto por id em imagem png ou jpeg
router.get('/imagem/:id', (req, res) => {
    gfs.files.findOne({ _id: req.params.id }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'Não existem fotos'
            });
        }

        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            const readstream = gfs.createReadStream(file.id);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Não é uma imagem'
            });
        }
    });
});

//deleta fotos
router.delete(':id', (req, res) => {
    gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
        if (err) {
            console.log('Erro ao inserir foto: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;
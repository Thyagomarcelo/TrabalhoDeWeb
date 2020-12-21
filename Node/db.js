//Conecta ao banco Review na porta 27017 e exporta para uso

const mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost:27017/Planet',  {useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false }, (err) =>{
    if(!err){
        console.log('Conectado ao MongoDB.');
    }
    else{
        console.log('Erro ao conectar ao MongoDb: ' + JSON.stringify(err,undefined,2));
    }
});

module.exports = mongoose;
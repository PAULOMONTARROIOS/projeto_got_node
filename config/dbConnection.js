var mongo = require('mongodb');

var connMongoDB =  function() {
    var db = new mongo.Db(
        'got', //nome do banco
        new mongo.Server('localhost', 27017, {}), // objeto de conexao
        {} // objeto de configuração adcional
    );
    return db;
}

module.exports = function(){
    return connMongoDB;
}
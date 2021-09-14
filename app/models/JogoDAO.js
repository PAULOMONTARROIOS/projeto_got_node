function JogoDAO(connection) {
    this._connection = connection();
}

JogoDAO.prototype.gerarParametros = function (usuario) {
    this._connection.open((error, mongoClient) => {
        mongoClient.collection("jogo", (error, collection) => {
            collection.insert({
                usuario: usuario,
                moeda: 15,
                suditos: 10,
                temor: Math.floor(Math.random() * 1000),
                sabedoria: Math.floor(Math.random() * 1000),
                comercio: Math.floor(Math.random() * 1000),
                magia: Math.floor(Math.random() * 1000)
            });

            mongoClient.close();
        })
    })
}

JogoDAO.prototype.iniciaJogo = function (res,usuario, casa, comando_invalido) {
    this._connection.open((error, mongoClient) => {
        mongoClient.collection("jogo", (error, collection) => {
            collection.find({ usuario: usuario }).toArray((error, result) => {
                console.log(result);

                res.render('jogo.ejs', { img_casa : casa, jogo: result[0], comando_invalido: comando_invalido});
                mongoClient.close();
            })
        })
    })

}


module.exports = function () {
    return JogoDAO;
}
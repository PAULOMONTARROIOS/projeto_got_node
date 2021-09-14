module.exports.index = function (application, req, res) {
    res.render("index.ejs", { validacao: {} });
}

module.exports.autenticar = function (application, req, res) {
    var dadosForm = req.body

    req.assert('usuario', "O Usuário deve ser diferente de vazio.").notEmpty();
    req.assert('senha', "A senha deve ser diferente de vazio.").notEmpty();

    var erros = req.validationErrors();
    if (erros) {
        res.render('index', { validacao: erros });
        return;
    }

    var connection = application.config.dbConnection;
    var UsuariosDAO = new application.app.models.UsuariosDAO(connection);
    UsuariosDAO.autenticar(dadosForm, req, res);

  // res.render('jogo')
}
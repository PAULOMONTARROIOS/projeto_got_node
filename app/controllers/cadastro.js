module.exports.cadastro = function(application, req, res){
    res.render('cadastro.ejs', {validacao : {}, dadosForm: {}});
}

module.exports.cadastrar = function(application, req, res) {

    var dadosForm = req.body

    req.assert('nome','O nome não pode ser vazio.').notEmpty();
    req.assert('usuario', 'O usuário não pode ser vazio').notEmpty();
    req.assert('senha', 'A senha não pode ser vazia').notEmpty();
    req.assert('casa', 'A casa não pode ser vazia').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('cadastro.ejs', { validacao: errors, dadosForm: dadosForm});
        console.log(errors)
        return;
    }

    var connection = application.config.dbConnection;
    var UsuariosDao = new application.app.models.UsuariosDAO(connection);
    var JogoDAO = new application.app.models.JogoDAO(connection);

    UsuariosDao.inserirUsuario(dadosForm);
    JogoDAO.gerarParametros(dadosForm.usuario);

    res.send('Usuário cadastrado !');
}
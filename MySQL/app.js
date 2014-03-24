
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mysql = require('mysql');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

function DB(){
	var cliente = mysql.createConnection({
		user: 'Administrador',
		password: 'bAMuqrnXBVrKM7uE',
		host: 'localhost',
		port: 3306, 
		database: 'administrador'
	});
	return cliente;
}

function login(req, res, next){
	if(req.session.user){
		next();
	} else {
		res.redirect('/login');
	}
}

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/login', function(req, res){
	res.render('login', { title: 'Ingreso' });
});

app.get('/privada', login, function(req, res){
	res.render('privada', { title: 'Pagina privada' });
});

app.post('/autentificar', function( req, res ){
	var objDB = DB();
	var user = req.body.txtUsuario;
	var pass = req.body.txtClave;
	objDB.query('SELECT * FROM usuario WHERE alias LIKE "'+ user +'" AND clave LIKE "'+ pass +'"', function(err, resp, row){
		if(err){
			console.log("error");
			console.log(err.length);
		} else {
			if(resp.length > 0){
				console.log("si funca");
				req.session.user = user;
				res.redirect('/privada');
			} else {
				resp.send('INGRESO FALLIDO: Datos incorrectos');
			}
		}
	});
	/*if(req.body.txtUsuario == 'jeragones' && req.body.txtClave == '123'){
		req.session.user = req.body.txtUsuario;
		res.redirect('/privada');
	} else {
		res.send('INGRESO FALLIDO: Datos incorrectos');
	}*/
});

app.get('/salir', function(req, res){
	delete req.session.user;
	res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Utilizando el puerto: ' + app.get('port'));
});

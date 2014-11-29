
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var mysql = require('mysql');
var path = require('path');

var app = express();


var connection = mysql.createConnection({
	user: 'Admin',
	password: 'hufVQcVJypRHpKhb',
	host: 'localhost',
	port: 3306, 
	database: 'suelosdb'
});

connection.connect(function(err) {
   	if (err) console.log("error conexion con la base de datos")
   	else console.log("conexion exitosa con la base de datos")
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index); // archivo que se ejecuta de inicio
app.get('/users', user.list);

app.post('/prueba', function(req, res) {
	connection.query(req.body.query, function (err, resp) {
		console.log(req.body.nombre);
		res.send(resp);
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

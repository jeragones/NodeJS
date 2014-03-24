var http = require('http'),
	fs = require('fs'),
	PORT = 3000;

var server = http.createServer(function(req, res) {
	fs.readFile("index.html", function(err, data) {
		if(err) {
			throw err;
		}
		res.writeHead(200, {
			"Content-type" : "text/html",
			"Content-length" : data.length
		});
		res.write(data);
		res.end();	
	});
}).listen(PORT);

console.log("servidor iniciado en el puerto " + PORT);
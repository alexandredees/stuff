
var xxx = 0;

var http = require('http'),
	fs = require('fs'),
	socketio = require('socket.io')
	;

var server = http.createServer(function(req, res){
	fs.readFile('./chat.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

var io = socketio.listen(server);

io.sockets.on('connection', function(socket){
	xxx++;
	console.log("Un client est connecté ("+xxx+")!");

	// welcome msg
	socket.emit('welcome', { 
		welcomeMsg : 'Bienvenue à toi jeune padawan !',
		onlineUsers: 66
	});

	socket.broadcast.emit('info_msg', {  // on envoie un msg à tous les connectés sauf le nouvel arrivant
		infoMsg : 'un petit nouveau vient de débarquer...',
		onlineUsers: 66
	});

	socket.on('new_msg', function(newMsg){ 

		// on stocke les msg en cookie ou autre..

		socket.emit('update_msgs', { // on renvoie le nouveau msg à son auteur
			userMsg : newMsg.userMsg,
			userName: newMsg.userName,
			onlineUsers: 66
		});
		socket.broadcast.emit('update_msgs', { // on envoie le nouveau msg à tous les connecté sauf son auteur
			userMsg : newMsg.userMsg,
			userName: newMsg.userName,
			onlineUsers: 66
		});
	});
})

server.listen(80, "http://www.adesvapor.com/servor/tests/javascript/nodejs/playground/chat_web/");
var express = require('express');

exports.start = function (config) {
    var app = express();
    var http = require('http').Server(app);
    var io = require('socket.io')(http);
    var users = [];
    var rooms = [];
    // need redis server
    // var redis = require('socket.io-redis');
    // io.adapter(redis({ host: 'localhost', port: 6379 }));    

    // var env = process.env.NODE_ENV || 'development';
    // if ('development' == env) {       
    // }
    // else {
    // }

    app.use( function(req, res, next){
        console.log('%s %s', req.method, req.url);
        next();
    });

    // app.get('/', function(req, res){
    //     res.sendfile(__dirname + '/public/index.html');
    // });

    app.use(express.static( __dirname + '/public'));

    io.on('connection', function(socket) {
        console.log('a user connected');

        var nickname = undefined;
        var room = undefined;
        
        socket.on('join', function(msg) {            
            console.log(msg);
            socket.join(msg.room);            
            room = msg.room;
            nickname = msg.nickname;

            //users.push(msg.nickname);
            users[socket.id] = {
                name: msg.nickname
            }

            io.to(room).emit('message', nickname + " join");
        });

        socket.on('message', function(msg) {
            console.log(msg);
            console.log(socket.rooms);
            //console.log(socket.client);
            io.to(room).emit('message', nickname + '：' + msg.message);
            console.log(users);
        });

        socket.on('disconnect', function() {
            console.log('user disconnected');
        });
    });
    
    //require('./router')(app);

    var server = http.listen(config.port, function() {
        console.log('Listening on port %d', server.address().port);
    });
};

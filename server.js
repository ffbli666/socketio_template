var express = require('express');
exports.start = function (config) {
    var app = express();
    var http = require('http').Server(app);
    var io = require('socket.io')(http);    

    // var env = process.env.NODE_ENV || 'development';
    // if ('development' == env) {       
    // }
    // else {       
    // }

    app.use( function(req, res, next){
        console.log('%s %s', req.method, req.url);
        next();
    });

    app.get('/', function(req, res){
        res.sendfile(__dirname + '/public/index.html');
    });

    //app.use(express.static( __dirname + '/public'));

    io.on('connection', function(socket) {
        console.log('a user connected');

        socket.on('join', function(msg){
            var t = socket.join(msg.room);
            console.log(t);
        });
        socket.on('chat message', function(msg){
            console.log(msg);
            //socket.join(msg.room);
            io.to(msg.room).emit('chat message', msg.m);
        });
        socket.on('disconnect', function() {
            console.log('user disconnected');
        });
    });
    
    //require('./router')(app);

    var server = http.listen(config.port, function() {
        console.log('Listening on port %d', server.address().port);
    });
}

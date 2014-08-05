var express = require('express');

exports.start = function (config) {
    var app = express();
    var http = require('http').Server(app);
    var io = require('socket.io')(http);
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
    
    require('./router')(app, io);

    var server = http.listen(config.port, function() {
        console.log('Listening on port %d', server.address().port);
    });
};

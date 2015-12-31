module.exports = function(app, io) {
	var users = [];
    var rooms = [];

    //router
    var hello = require('./application/controllers/hello');
    app.get('/get', hello.get);
    app.post('/post', hello.post);

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

    app.get('*', notFound);
};

function notFound(req, res)
{
    res.send('404', 'Page Not Found');
}

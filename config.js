module.exports = function(app) {
    return {
        server: {
            environment: 'staging', // staging or production
            //environment: 'production',
            port: 8888,
            post_json_limit: '1mb',
            root_path: '/home/vagrant/share/socketio_template', //set the project root path
            timezone: 'Asia/Taipei'
        },
        database: [{
            driver   : 'mysql',
            host     : '127.0.0.1',
            user     : 'root',
            port     : '3306',
            password : 'mypassword',
            database : 'mydatabase',
            connectionLimit : 10,
        }]
    };
}
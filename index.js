// modules required
const http = require('http');
const dotEnv = require('dotenv').config()
const app = require('./app');

// configure port
const port = process.env.PORT || 5000;

// create server
const server = http.createServer(app);
server.listen(port, (err) => {
    if (err) {
        console.log('Error Occured While Starting the server');
        console.log(err);
    } else {
        console.log('Server Started at PORT: '+port);
    }
});
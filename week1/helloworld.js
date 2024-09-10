const http = require('http');

server =  http.createServer((req, res) => {
        res.end('Hello World\n');
    });

server.listen(3000,
    console.log('Server running')
);

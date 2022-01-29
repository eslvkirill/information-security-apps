const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const httpServer = http.createServer(app);

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')));

httpServer.listen(3000);

console.log('Express server started');

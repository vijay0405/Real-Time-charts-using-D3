const app = require('express')();
const http = require('http').Server(app);
const data = require('./data');
const io = require('socket.io')(http);


const port = 3022;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/api/data', (req, res) => {
    res.send(data.data);
});

setInterval(function () {
    data.updateData();
    io.sockets.emit('data', data.data[0]);
}, 5000);

io.on('connection', function (socket) {
    console.log('a user connected');
});

http.listen(port, () => {
    console.log(`Listening on *:${port}`);
});


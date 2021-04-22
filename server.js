const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/js/pong.html');
});

app.get('/game', (req, res) => {
    res.sendFile(__dirname+'/js/game.js');
});

app.get('/gameDisplay', (req, res) => {
    res.sendFile(__dirname+'/js/game.display.js');
});

app.get('/gameControl', (req, res) => {
    res.sendFile(__dirname+'/js/game.control.js');
});

app.get('/gameKeycode', (req, res) => {
    res.sendFile(__dirname+'/js/game.keycode.js');
});

io.on('connection', (socket) =>{
    console.log("connecte");
});

server.listen(process.env.PORT || 3000, () => {
    console.log('listening on *:3000');
});

var NbPlayer = 0;
io.on('connection', (socket) => {
    console.log('a user connected');
    NbPlayer++;
    if (NbPlayer == 1) {
        socket.emit('player', 'Player1');
    }

    if (NbPlayer == 2) {
        socket.emit('player', 'Player2');
    }
    if (NbPlayer == 3) {
        socket.emit('player', 'Player3');
    }
    if (NbPlayer == 4) {
        socket.emit('player', 'Player4');
    }

    socket.on('disconnect', () =>{
        NbPlayer--;
        console.log("user disconnected");
    });

    socket.on('PlayerOne move', (player)=>{
        io.emit('updatePosP1', player)
    })

    socket.on('PlayerTwo move', (player)=>{
        io.emit('updatePosP2', player)
    })

    socket.on('PlayerThree move', (player)=>{
        io.emit('updatePosP3', player)
    })

    socket.on('PlayerFour move', (player)=>{
        io.emit('updatePosP4', player)
    })

    socket.on('ball move', (ball)=>{
        io.emit('updateBallPos', ball)
    })
});




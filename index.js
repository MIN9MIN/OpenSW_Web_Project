const express = require('express');
const app = express();
app.use(express.static('./'));

app.listen(8090, function () {
    console.log('listening on 8090')
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.get('/introduce', function (req, res) {
    res.sendFile(__dirname + '/introduce.html')
})

app.get('/notice', function (req, res) {
    res.sendFile(__dirname + '/notice.html')
})

app.get('/board', function (req, res) {
    res.sendFile(__dirname + '/board.html')
})

app.get('/service', function (req, res) {
    res.sendFile(__dirname + '/service.html')
})

app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/login.html')
})

app.get('/signUp', function (req, res) {
    res.sendFile(__dirname + '/signUp.html')
})
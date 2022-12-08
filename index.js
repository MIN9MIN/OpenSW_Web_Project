const express = require('express');
const app = express();
app.use(express.static('./'));
const bodyParser= require('body-parser')
app.use(express.urlencoded({ extended: true }));
const MongoClient = require('mongodb').MongoClient

var db;
MongoClient.connect('mongodb+srv://hunterspin:a862842@cluster0.qr6s3gn.mongodb.net/?retryWrites=true&w=majority', function(err, client){
    if (err) return console.log(err)
    db = client.db('member');
    console.log('DB Connect');
    
    app.listen(8090, function () {
    console.log('listening on 8090')
    })
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

app.post('/add', function(req, res){
    res.send('complete....')
    db.collection('login').insertOne({id:req.body.id , email:req.body.email, password: req.body.password}, function(err, result){
      console.log("save complete...");
      console.log(req.body.id);
      console.log(req.body.email);
      console.log(req.body.password);
    })
})

app.get('/signUp', function (req, res) {
    res.sendFile(__dirname + '/signUp.html')
})
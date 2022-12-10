const crypto = require('crypto');
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

const createHashedPassword = (password) => {
    return crypto.createHash("sha512").update(password).digest("base64");
};

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

app.get('/view', function (req, res) {
    res.sendFile(__dirname + '/view.html')
})

app.get('/write', function (req, res) {
    res.sendFile(__dirname + '/write.html')
})

app.get('/edit', function (req, res) {
    res.sendFile(__dirname + '/edit.html')
})

app.post('/add', function(req, res){
    db.collection('login').findOne({id:req.body.id} ,function(err, result){
        if(result == null){
            db.collection('login').insertOne({id:req.body.id , email:req.body.email, password: createHashedPassword(req.body.password)}, function(err, result){
                console.log("save complete...");
                console.log(req.body.id);
                console.log(req.body.email);
                console.log(createHashedPassword(req.body.password));
            })
            res.sendFile(__dirname + '/index.html');
        }
        else{
            res.send("<script>alert('이미 존재하는 아이디입니다.');history.go(-1);</script>");
        }
    })
})

app.post('/find', function(req, res){
    db.collection('login').findOne({id:req.body.id} ,function(err, result) {
        if (err) throw err;
        if(result == null){
            res.send("<script>alert('아이디 혹은 비밀번호가 틀렸거나 존재하지 않습니다.');history.go(-1);</script>");
        }
        else if(result.password == createHashedPassword(req.body.password)){
            res.sendFile(__dirname + '/index.html');
        }
        else{
            res.send("<script>alert('아이디 혹은 비밀번호가 틀렸거나 존재하지 않습니다.');history.go(-1);</script>");
        }
      })
})

app.get('/signUp', function (req, res) {
    res.sendFile(__dirname + '/signUp.html');
})
require('dotenv').config()
let express = require('express');
let app = express();

console.log("Hello World");

function middleware(req, res, next) {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
    next();
}

function currentTime(req, res, next) {
  req.time = new Date().toString();
    next();
}

function echoWord(req, res) {
  const word = req.params.word;
  res.json({
    echo: word 
    });
}

function helloExpress(req, res) {
  res.sendFile(__dirname + '/views/index.html');
}

function helloJson(req, res) {
    const response = {
        "message": "Hello json"
    };
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        response.message = response.message.toUpperCase();
    }
    res.json(response);
}

function timeJson(req, res) {
    res.json({
        time: req.time
    });
}

app.use(middleware);
app.get('/now', currentTime, timeJson);
app.get('/:word/echo', echoWord);
app.get('/', helloExpress);
app.use('/public', express.static(__dirname + '/public'));
app.get('/json', helloJson);





























 module.exports = app;

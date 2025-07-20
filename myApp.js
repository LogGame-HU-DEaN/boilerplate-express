require('dotenv').config()
var bodyParser = require('body-parser');
let express = require('express');
let app = express();

console.log("Hello World");

function middleware(req, res, next) {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
    next();
}

function postName(req, res) {
  var firstName = req.body.first;
  var lastName = req.body.last;
  res.json({
    name: `${firstName} ${lastName}`
  });
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

function name(reg, res) {
  var firstName = reg.query.first;
  var lastName = reg.query.last;
  res.json({
    name: `${firstName} ${lastName}`
  });
}

app.use(middleware);
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/now', currentTime, timeJson);
app.get('/:word/echo', echoWord);
app.get('/name', name);
app.post('/name', postName);
app.get('/', helloExpress);
app.use('/public', express.static(__dirname + '/public'));
app.get('/json', helloJson);





























 module.exports = app;

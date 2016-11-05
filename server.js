var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

// Database Credentials

var config = {
    user : 'abito12',
    database: 'abito12',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


//Articles Section

app.get('/articles.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'articles.html'));
});

app.get('/articles.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'articles.css'));
});

app.get('/sub.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'sub.js'));
});


var pool = new Pool(config);
app.get('/allArticles', function (req, res) {
    
    pool.query("SELECT title, content, date FROM article", function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else if(result.rows.length === 0){
            res.status(404).send('Article not found');
        }else{
            res.send(JSON.stringify(result.rows));
        }
    })
      
});

//Comments Section
var comments = [];
app.get('/submit', function(req, res){
    var comment = req.query.comment;
    comments.push(comment);
    // Json encoding
    res.send(JSON.stringify(comments));
});


app.get('/articlepage.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'articlepage.html'));
});

app.get('/article-two.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/Lato-Light.ttf', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Lato-Light.ttf'));
});

app.get('/ui/code-in-the-flow.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'code-in-the-flow.png'));
});



//Count Button
var counter = 0;
app.get('/counter', function (req, res) {
    counter += 1;
  res.send(counter.toString());
});


app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/sub.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'sub.js'));
});




var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

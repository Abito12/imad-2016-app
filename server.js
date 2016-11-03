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
function createMainArticlesPage(articlesBox){
    mainArticlesPageTemplate = `<!DOCTYPE html>
        <html>
        <head>
            <title>Articles</title>
            <link rel="stylesheet" type="text/css" href="main.css">
        </head>
        <body>
            <div class="container">
                ${articlesBox}
            </div>
        </body>
    </html>`;
}

function createArticlesBox(data){
    var title = data.title;
    var content = data.content;
    var BoxTemplate = `<div class="box">
                            <div class="cover left">
                                <h2 class="title">${title}</h2>
                                <p class="intro">${content}</p>
                                <div class="btn"><a href="#">Read more...</a></div>
                                <p class="date">10/19/2013</p>
                            </div>
                        </div>`;
}




var pool = new Pool(config);
app.get('/articles.html', function (req, res){
    pool.query('SELECT * FROM article', function(err, result){
        if(err){
            res.status(500).send(err.toString());
        } else{
           res.send(JSON.stringify(result.rows));
        }
    });
});










//Comments Section
var comments = [];
app.get('/submit', function(req, res){
    var comment = req.query.comment;
    comments.push(comment);
    // Json encoding
    res.send(JSON.stringify(comments));
});


app.get('/article-one.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
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

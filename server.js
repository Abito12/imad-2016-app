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

//Articles Main Page
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


app.get('/articles/articlePage.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'articlepage.css'));
});

app.get('/articles/articlePage.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'articlepage.js'));
});

function createArticleTemplate(data){
    var title = data.title;
    var content = data.content;
    var articleTemplate = `
<html>
<head>
  <title></title>
  <link rel="stylesheet" type="text/css" href="articlePage.css">
  <script src ="articlePage.js"></script>
</head>
<body>
<div id="container">
<div class="blog">
    <div class="title-box">
      <h3>
      ${title}
      </h3>
      <hr/>
      <div class="intro">
        ${content}
      </div>
    </div>  
    <div class="info">
      <span>article content</span>
  </div>
  <div class="footer">
    <div class="icon-holder">
      <span>
    <i class="fa fa-comment-o"></i>
      <span>12</span>
      <space>12</space>
      <i class="fa fa-calendar"></i>
      <span>03.12.2015</span>
      </span>
    </div>
  </div>
  
 <div class="color-overlay"></div>
</div>

<div id="comment-box">
<div class="detailBox">
    <div class="titleBox">
      <label>Comment Box</label>
        <button type="button" class="close" aria-hidden="true">&times;</button>
    </div>
    <div class="commentBox">
        
        <p class="taskDescription">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
    </div>
    <div class="actionBox">
        <ul class="commentList">
            <li>
                <div class="commentText">
                    <p class=""></p> <span class="date sub-text">on March 5th, 2014</span>
                </div>
            </li>
        </ul>
        <form class="form-inline" role="form">
            <div class="form-group">
                <input class="form-control" type="text" placeholder="Your comments" />
            </div>
            <div class="form-group">
                <button class="btn btn-default">Add</button>
            </div>
        </form>
    </div>
</div>
</div>
</div>

</body>
</html>`;

return articleTemplate;
}

app.get('/articles/:articleID', function(req, res){
    
    pool.query("SELECT title, content FROM article WHERE id = " + req.params.articleID, function(err, result){
        if(err){
            res.status(500).send(err.toString());
        } else if(result.rows.length === 0){
            res.status(404).send('Article Not Found');
        } else{
            var articleData = result.rows[0];
            res.send(createArticleTemplate(articleData));
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

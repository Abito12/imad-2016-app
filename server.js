var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
const crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

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
app.use(bodyParser.json());
app.use(session({
    secret: 'randomsecretvalue',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30}
}));

//Creating DB Pool
var pool = new Pool(config);

app.get('/', function (req, res) {
     if(req.session && req.session.auth && req.session.auth.userId){
        res.sendFile(path.join(__dirname, 'ui', 'articles.html'));
   } else{
     res.sendFile(path.join(__dirname, 'ui', 'index.html'));
   }
});

app.get('/authors', function (req, res) {
     if(req.session && req.session.auth && req.session.auth.userId){
        res.sendFile(path.join(__dirname, 'ui', 'authors.html'));
   } else{
     res.sendFile(path.join(__dirname, 'ui', 'index.html'));
   }
});


//Articles Section
app.get('/articles', function (req, res) {
       if(req.session && req.session.auth && req.session.auth.userId){
        res.sendFile(path.join(__dirname, 'ui', 'articles.html'));
   } else{
     res.sendFile(path.join(__dirname, 'ui', 'index.html'));
   }
});

app.get('/sub.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'sub.js'));
});

app.get('/wish', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'wish.html'));
});
app.get('/wish.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'wish.css'));
});
app.get('/newarticle.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'newarticle.js'));
});
app.get('/authors.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'authors.css'));
});


app.get('/contact.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'contact.css'));
});

app.get('/contact.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'contact.js'));
});

app.get('/profile.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'profile.js'));
});

app.get('/authors.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'authors.js'));
});


app.get('/editArticle/editarticle.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'editarticle.js'));
});

app.get('/editarticle.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'editarticle.js'));
});
app.get('/articles.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'articles.css'));
});

app.get('/newarticle', function (req, res) {
       if(req.session && req.session.auth && req.session.auth.userId){
        res.sendFile(path.join(__dirname, 'ui', 'create.html'));
   } else{
     res.sendFile(path.join(__dirname, 'ui', 'index.html'));
   }
});

app.get('/contact', function (req, res) {
       if(req.session && req.session.auth && req.session.auth.userId){
        res.sendFile(path.join(__dirname, 'ui', 'contact.html'));
   } else{
     res.sendFile(path.join(__dirname, 'ui', 'index.html'));
   }
});
app.get('/profile', function (req, res) {
       if(req.session && req.session.auth && req.session.auth.userId){
        res.sendFile(path.join(__dirname, 'ui', 'profile.html'));
   } else{
     res.sendFile(path.join(__dirname, 'ui', 'index.html'));
   }
});
app.get('/about', function (req, res) {
       if(req.session && req.session.auth && req.session.auth.userId){
        res.sendFile(path.join(__dirname, 'ui', 'abouxt.html'));
   } else{
     res.sendFile(path.join(__dirname, 'ui', 'index.html'));
   }
});

app.get('/ui/about.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'about.css'));
});

//Login Functionality
function hash(input, salt){
    var hashed = crypto.pbkdf2Sync(input  , salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function(req, res){
    var hashedString = hash(req.params.input,'this-is-some-random-string');
    res.send(hashedString); 
});



app.post('/create-user', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var str1 = username.trim();
    var str2 = password.trim();
    var regex = /[^a-z-^0-9,!@#^&*()-_+=/.,?%#\n]/gi;
    var str3 = username.replace(regex, "");
    if(username.length === 0 || password.length === 0 || str1.length ===0 || str2.length ===0 || str1.length != username.length || str2.length != password.length || str1.length != str3.length || username.length >14 || password.length < 4){
        res.status(403).send('Forbidden Request');
    }else{
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password, salt);
    pool.query('INSERT INTO "user_info" (username, password) VALUES ($1, $2)', [username, dbString], function(err, result){
            if(err){
                res.status(500).send(err.toString());
            } else {
                res.send('User Created!' + username);
            }
    
        });
    }
});

app.post('/login', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    pool.query('SELECT id, password FROM "user_info" WHERE username = $1', [username], function(err, result){
            if(err){
                res.status(500).send(err.toString());
            } else if(result.rows.length === 0){
                res.status(403).send('Username/Password is invalid');
            }else{
                var dbString = result.rows[0].password;
                var salt = dbString.split('$')[2];
                var hashedPassword = hash(password, salt);
                if(hashedPassword === dbString){
                    //Set the session
                    req.session.auth = {userId: result.rows[0].id
                    };
                    
                    res.send('Credentials Correct');
                } else {
                    res.status(403).send('Invalid Login');
                }
            }
    });
});


app.get('/logout', function(req, res){
    delete req.session.auth;
    res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/check-login', function(req, res){
    if(req.session && req.session.auth && req.session.auth.userId){
        var user_id = req.session.auth.userId;
        pool.query('SELECT username, profession, email, bio FROM user_info WHERE id =' + user_id, function(err, result){
            if(err){
                res.status(500).send(err.toString());
            }else{
                res.send(JSON.stringify(result.rows))
            }
        })
   } else{
     res.send('You are not logged in');
   }
});

//Author Info
app.get('/allAuthors', function (req, res) {
    
    pool.query("SELECT DISTINCT user_info.id, user_info.username, user_info.profession, user_info.bio FROM user_info, article WHERE user_info.id = article.author_id ORDER BY user_info.bio DESC", function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
    });
});


//Articles Main Page

app.get('/allArticles', function (req, res) {
    
    pool.query("SELECT * FROM article", function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
    });
});

//User Specific Articles

app.get('/MyArticles', function (req, res) {
    var user_id = req.session.auth.userId;
    pool.query("SELECT * FROM article WHERE author_id = " + user_id, function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
    });
      
});

//Most Liked Articles
app.get('/LikedArticles', function (req, res) {
    pool.query("SELECT article.id, article.title, article.content, article.author_id, B.likes FROM article, (SELECT article_id, count(user_id) as likes FROM article_likes GROUP BY article_id) B WHERE article.id = B.article_id ORDER BY B.likes DESC", function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
    });
      
});

//Articles sorted by date, descending

app.get('/NewArticles', function (req, res) {
    pool.query("SELECT article.id, article.title, article.content FROM article ORDER BY article.id DESC", function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
    });
      
});

//Articles sorted by date, ascending

app.get('/OldArticles', function (req, res) {
    pool.query("SELECT article.id, article.title, article.content FROM article ORDER BY article.id", function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
    });
      
});


app.get('/articles/articlePage.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'articlepage.css'));
});


app.get('/articles/articlePage.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'articlePage.js'));
});

app.get('/articles/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});


app.get('/articles/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});



function createArticleTemplate(data){
    var id = data.id;
    var title = data.title;
    var content = data.content;
    var date = data.date;
    var author = data.username;
    var articleTemplate = `
<html>
<head>
  <meta charset="UTF-8">
  <title>Article | Blog App</title>
     <link rel="icon" href="https://juststickers.in/wp-content/uploads/2016/09/lamda.png">
     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
  <link href='https://fonts.googleapis.com/css?family=Varela+Round' rel='stylesheet' type='text/css'>
<link href='https://fonts.googleapis.com/css?family=Monoton' rel='stylesheet' type='text/css'>  
<link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css'>
<link rel="stylesheet" href="articlePage.css">
<link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet">
<script src="articlePage.js"></script>

  
</head>

<body>
 <div class="container">
 <div class="content">
	<h1>${title}</h1>
	<h6>Written By ${author}
    <span>${date}</span></h6>
	<p>${content}</p>
	<div id='likes-count'><span id='counterLikes'></span> Likes </div> 
	<div class='like'>
  <button class='like-toggle basic2' id='like-button'><i class="em em-heart"></i></button>
  <span class='hidden' id='hidden-text'>I like this</span>
</div>
</div>
	<div class="comments-section">
  		<div class="comments">
    	<h4>COMMENTS</h4>
    	<div id="comments-container">
  		</div>
  <div class="comment-editor">
    <h4>LEAVE A COMMENT</h4>
    <div id="comment-form">
       <textarea cols="72" rows="8" name="textarea" id="textarea" style="min-height: 12vh; min-width: 27vw;" onkeyup="lettersOnly(this)"></textarea>
       <a id="addBtn" href="#" class="btn btn-sm animated-button thar-three">Add Comment</a>
       <a id="HomeBtn" href="http://abito12.imad.hasura-app.io/articles" class="btn btn-sm animated-button thar-three">Home</a></div>
    </div>
  </div>
</div> 
</div>
</div>
<span id ="key">${id}</span>
</body>
</html>
`;

return articleTemplate;
}

app.get('/articles/:articleID', function(req, res){
    
    pool.query("select article.id,article.title,article.date,article.content,user_info.username from article, user_info where user_info.id = article.author_id and article.id = " + req.params.articleID, function(err, result){
        if(err){
            res.status(500).send(err.toString());
        } else if(result.rows.length === 0){
            res.status(404).send('Article Not Found');
        } else{
            var articleData = result.rows[0];
            if(req.session && req.session.auth && req.session.auth.userId){
                res.send(createArticleTemplate(articleData));
            }else{
                  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
            }
            }
    });
});

//Get specific articles
app.get('/getSpecificArticles/:userID', function(req, res){
    var user_id = req.params.userID;
    pool.query("SELECT * FROM article WHERE article.author_id=$1",[user_id], function(err, result){
        if(err){
            res.status(500).send(err.toString());
        } else if(result.rows.length === 0){
            res.status(404).send('No likes');
        } else{
            res.send(JSON.stringify(result.rows))
        }
    });
});

app.get('/comments/:articleID', function(req, res){
    
    pool.query("SELECT article_comments.date, article_comments.body, user_info.username FROM article_comments,user_info WHERE article_comments.user_id = user_info.id AND article_comments.article_id = " + req.params.articleID, function(err, result){
        if(err){
            res.status(500).send(err.toString());
        } else if(result.rows.length === 0){
            res.status(404).send('No Comments');
        } else{
            res.send(JSON.stringify(result.rows))
        }
    });
});

//Likes Of an Article

app.get('/check-like/:articleID', function(req, res){
    var user_id = req.session.auth.userId;
    var article_id = req.params.articleID;
    pool.query("SELECT * FROM article_likes WHERE article_likes.user_id = $1 AND article_likes.article_id = $2",[user_id, article_id], function(err, result){
        if(err){
            res.status(500).send(err.toString());
        } else if(result.rows.length === 0){
            res.status(404).send('No likes');
        } else{
            res.send(JSON.stringify(result.rows))
        }
    });
});

app.get('/getlikes/:articleID', function(req, res){
    var user_id = req.session.auth.userId;
    var article_id = req.params.articleID;
    pool.query("SELECT COUNT(*) FROM article_likes WHERE article_likes.article_id = " + article_id, function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows))
        }
    });
});

app.get('/add-like/:articleID', function(req, res){
    var user_id = req.session.auth.userId;
    var article_id = req.params.articleID;
    pool.query('INSERT INTO "article_likes" VALUES ($1, $2)',[user_id, article_id], function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send('Like added successfully');
        }
    });
});

app.get('/delete-like/:articleID', function(req, res){
    var user_id = req.session.auth.userId;
    var article_id = req.params.articleID;
    pool.query('DELETE FROM "article_likes" WHERE user_id = $1 AND article_id = $2',[user_id, article_id], function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send('Like deleted successfully');
        }
    });
});


//Comment Section
app.post('/add-comment/:articleID', function(req, res){
    var comment = req.body.comment;
    var str1 = comment.trim();
    var regex2 = /[^a-z-^0-9,#!@#$%&*()*_+=/]/gi;
    var str2 = comment.replace(regex2, " ");
    if(str2.length != comment.length || str1.length ===0){
        res.status(500).send('Comment could not be added');
    }else{
    var article_id = req.params.articleID;
    var user_id = req.session.auth.userId;
    var date =  new Date;
    date = date.toDateString();
    pool.query('INSERT INTO "article_comments" (article_id,user_id, body,date) VALUES ($1, $2, $3, $4)', [article_id, user_id, comment, date], function(err, result){
            if(err){
                res.status(500).send(err.toString());
            } else {
                res.send('Comment Added!' + comment);
            }
    });
    }
});


app.post('/add-article', function(req, res){
    var title =req.body.title;
    var content = req.body.content;
    var author_id = req.session.auth.userId;
    var str1 = title.trim();
    var str2 = content.trim();
    var regex3 = /[^a-z-^0-9,#!@#$%&*()*._+=/]/gi;
    var str3 = title.replace(regex3, " ");
    var str4 = content.replace(regex3," ");
    console.log(str4);
    console.log(content);
    if(title.length === 0 || content.length === 0 || str1.length === 0 || str2.length ===0 || str3.length != title.length || str4.length != content.length){
        res.status(403).send('Article Create Request Denied');
    }else{
    var date = new Date;
    date = date.toDateString();
    pool.query('INSERT INTO "article" (title,content,author_id, date) VALUES ($1, $2, $3, $4)', [title, content, author_id, date], function(err, result){
            if(err){
                res.status(500).send(err.toString());
            } else {
                res.send('Article added successfully');
            }
    });
    }
});

//Edit a specific article

app.post('/savearticle', function(req, res){
    var title =req.body.title;
    var content = req.body.content;
    var str1 = title.trim();
    var str2 = content.trim();
    var regex3 = /[^a-z-^0-9,!@#^&*()-_+=/.,?%#\n]/gi;
    var str3 = title.replace(regex3, " ");
    var str4 = content.replace(regex3," ");
    if(title.length === 0 || content.length === 0 || str1.length === 0 || str2.length ===0 || str3.length != title.length || str4.length != content.length){
        res.status(403).send('Article Create Request Denied');
    }else{
    var article_id = req.body.id;
    pool.query('UPDATE "article" SET title= $1, content = $2 WHERE id = $3', [title, content, article_id],  function(err, result){
            if(err){
                res.status(500).send(err.toString());
            } else {
                res.send('Article edited successfully');
            }
    });
    }
});

//Recieve a message from the user
app.post('/send-message', function(req, res){
    var name =req.body.name;
    var email = req.body.email;
    var message = req.body.message;
    var sender_id = req.session.auth.userId;
    pool.query('INSERT INTO "messages" (id,name,email,message) VALUES ($1, $2, $3, $4)', [sender_id, name, email, message], function(err, result){
            if(err){
                res.status(500).send(err.toString());
            } else {
                res.send('Message Sent');
            }
    });
});

//Update User Information
app.post('/update-profile', function(req, res){
    var info =req.body.info;
    var email = req.body.email;
    var bio = req.body.bio;
    var user_id = req.session.auth.userId;
    pool.query('UPDATE "user_info" SET profession = $1, email = $2, bio = $3 WHERE id = $4', [info, email, bio, user_id], function(err, result){
            if(err){
                res.status(500).send(err.toString());
            } else {
                res.send('Profile Updated');
            }
    });
});

function createArticleTemplate2(data){
    var title = data.title;
    var regex = /<br\s*[\/]?>/gi;
    var content = data.content.replace(regex, "\n");
    var id = data.id;
    var articleTemplate2 = `<!DOCTYPE html>
<html >
<head>
  <meta charset="UTF-8">
  <title>Article | Blog App</title>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
    <link rel="icon" href="https://juststickers.in/wp-content/uploads/2016/09/lamda.png">
  <style type="text/css">
  *, *:before, *:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

html {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 100%;
  background: #333;
  color: #33383D;
  -webkit-font-smoothing: antialiased;
}

#page-wrapper {
  width: 50vw;
  background: #FFF;
  padding: 1.25rem;
  margin-top: 10vh;
  margin-left: 25vw;
  min-height: 300px;
  border-top: 5px solid #69c773;
  box-shadow: 0 2px 10px rgba(0,0,0,0.8);
}

h1 {
  margin: 0;
}

h2 {
  margin-top: 0;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #999;
}

p {
  font-size: 0.9rem;
  margin: 0.5rem 0 1.5rem 0;
}

a,
a:visited {
  color: #08C;
  text-decoration: none;
}

a:hover,
a:focus {
  color: #69c773;
  cursor: pointer;
}

a.delete-file,
a.delete-file:visited {
  color: #CC0000;
  margin-left: 0.5rem;
}

#file-form {
  width: 650px;
  float: left;
}

.field {
  margin-bottom: 1rem;
}

input,
textarea {
  width: 47vw;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #D9D9D9;
  border-radius: 3px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);
}

textarea {
  min-height: 300px;
}

button {
  display: inline-block;
  border-radius: 3px;
  border: none;
  font-size: 0.9rem;
  padding: 0.6rem 1em;
  background: rgba(25,25,25,0.9);
  border-bottom: 1px solid #5d7d1f;
  color: white;
  margin: 0 0.25rem;
  text-align: center;
}

#messages{
    visibility:hidden;
}
button:hover {
  opacity: 0.75;
  cursor: pointer;

}


/* Clearfix Utils */

.clearfix {
  *zoom: 1;
}

.clearfix:before,
.clearfix:after {
  display: table;
  line-height: 0;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
  
      <script src="editarticle.js"></script>
</head>

<body>
  <script type="text/javascript">
      function lettersOnly(input){
      var regex = /[^a-z-^0-9,#\\n]/gi;
    input.value = input.value.replace(regex, " ");
}
  </script>
  <div id="page-wrapper" class="clearfix">
    <h1>Write an Article</h1>
    <p>Your article will be featured in the main page</p>
      <div class="field">
        <input type="text" id="title" value="${title}" onkeyup="lettersOnly(this)"/>
      </div>
      <div class="field">
        <textarea id="content" onkeyup="lettersOnly(this)">${content}</textarea>
      </div>
      <div class="field">
        <button id="save-btn">Save Changes</button>
        <button onclick="window.location.href='http://abito12.imad.hasura-app.io/articles'" style="margin-left: 20vw">Home</button>
        <div id="messages">${id}</div>
      </div>

  </div>

  
</body>
</html>
`;

return articleTemplate2;
}


app.get('/editArticle/:articleID', function(req, res){
    var article_id = req.params.articleID;
    pool.query("select article.id,article.title,article.content, author_id from article where article.id = " + article_id, function(err, result){
        if(err){
            res.status(500).send(err.toString());
        } else if(result.rows.length === 0){
            res.status(404).send('Article Cannot be Edited');
        } else{
            var articleData = result.rows[0];
            if(req.session.auth.userId != articleData.author_id){
                res.status(403).send('Article can only edited by its user');
            }
            else{
                if(req.session && req.session.auth && req.session.auth.userId){
                res.send(createArticleTemplate2(articleData));
                }else{
                      res.sendFile(path.join(__dirname, 'ui', 'index.html'));
                }
            }
            }
    });
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/Lato-Light.ttf', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Lato-Light.ttf'));
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

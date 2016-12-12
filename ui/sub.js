$(function () {

	var isopen_usermenu = false;


	$(".header .user-menu-toggle").on("click", function () {
		if(!isopen_usermenu) {

			// Show menu
			$(".header .user-menu").show();

			//Change arrow
			$(".user-menu-toggle .simple-arrow").removeClass("fa-chevron-down").addClass("fa-chevron-up");
			
			isopen_usermenu = true;
		} else {

			// Close menu
			$(".header .user-menu").hide();


			//Change arrow
			$(".user-menu-toggle .simple-arrow").removeClass("fa-chevron-up").addClass("fa-chevron-down");

			isopen_usermenu = false;
		}
	});

});


function getUsername(){
    $.ajax({
        url: "/check-login",
        success: function(result){
            var userDetails = JSON.parse(result);
            var name = userDetails[0].username;
            var firstLetter = name[0];
            $('#user-image').html(firstLetter);
            $('#displayname').html(name); 
        }
    });
}






function getAllArticles(){
    $.ajax({
    url: "/allArticles",
    success: function(result){
        $('#articleBox').html("");
        var allArticles = JSON.parse(result);
        for(var i = 0;i < allArticles.length; i++){
            var article = allArticles[i];
            var Box = `<div class="col-md-6 item">
                            <div class="item-in">
                                <h4>${article.title}</h4>
                                <div class="seperator"></div>
                                <p>${article.content}</p>
                                <a href = "http://abito12.imad.hasura-app.io/articles/${article.id}">Read More
                                <i class="fa fa-long-arrow-right"></i>
                                </a>
                            </div>
                        </div>`;
            $('#articleBox').append(Box);
            
        }
    }
});
}



function getMyArticles(){
    $.ajax({
    url: "/MyArticles",
    success: function(result){
        $('#articleBox').html("");
        var myArticles = JSON.parse(result);
        $('#sub-header').html("You have published " +myArticles.length + " articles");
        for(var i = 0;i < myArticles.length; i++){
            var article = myArticles[i];
            var Box = `<div class="col-md-6 item">
                            <div class="item-in">
                                <h4>${article.title}</h4>
                                <div class="seperator"></div>
                                <p>${article.content}</p>
                                <a href = "http://abito12.imad.hasura-app.io/articles/${article.id}">Read More
                                <i class="fa fa-long-arrow-right"></i>
                                </a>
                                 <a id="edit-link" href = "http://abito12.imad.hasura-app.io/editArticle/${article.id}">Edit Article
                                <i class="fa fa-long-arrow-right"></i>
                                </a>
                            </div>
                        </div>`;
            $('#articleBox').append(Box);
            
        }
    }
});
}
// Sort Section

var noclicks = 0;

// 1. Sort by likes

function getArticlesByLike(){
    $.ajax({
    url: "/LikedArticles",
    success: function(result){
        $('#articleBox').html("");
        var myArticles = JSON.parse(result);
        $('#sub-header').html("The most liked " + myArticles.length + " articles");
        for(var i = 0;i < myArticles.length; i++){
            var article = myArticles[i];
            var Box = `<div class="col-md-6 item">
                            <div class="item-in">
                                <h4>${article.title}</h4>
                                <div class="seperator"></div>
                                <p>${article.content}</p>
                                <a href = "http://abito12.imad.hasura-app.io/articles/${article.id}">Read More
                                <i class="fa fa-long-arrow-right"></i>
                                </a>
                                 <a id="edit-link" href = "http://abito12.imad.hasura-app.io/articles/${article.id}" style="text-decoration:none;">${article.likes} Likes
                                <i class="fa fa-long-arrow-right"></i>
                                </a>
                            </div>
                        </div>`;
            $('#articleBox').append(Box);
        }
        $('#options').css("visibility","hidden");
        noclicks +=1;
        document.getElementById('optionsbar').innerHTML = "Likes";
        document.getElementById('ordernew').innerHTML = "Newest first";
        document.getElementById('orderold').innerHTML = "Oldest first";
        document.getElementById('orderlikes').innerHTML = "Show All";
        document.getElementById('orderlikes').onclick = getAllArticles2;
        document.getElementById('ordernew').onclick = getArticlesNew;
        document.getElementById('orderold').onclick = getArticlesOld;
    }
});
}

function getAllArticles2(){
    document.getElementById('sub-header').innerHTML = "Have a look at our articles";
    document.getElementById('optionsbar').innerHTML = "Sort articles by";
    document.getElementById('orderlikes').innerHTML = "Likes";
    document.getElementById('orderlikes').onclick = getArticlesByLike;
    $('#options').css("visibility","hidden");
    document.getElementById('ordernew').onclick = getArticlesNew;
    document.getElementById('orderold').onclick = getArticlesOld;
    getAllArticles();
    noclicks += 1;
}

// Sort By id desc

function getArticlesNew(){
    $.ajax({
    url: "/NewArticles",
    success: function(result){
        $('#sub-header').html("The most recent articles");
        $('#articleBox').html("");
        var myArticles = JSON.parse(result);
        for(var i = 0;i < myArticles.length; i++){
            var article = myArticles[i];
            var Box = `<div class="col-md-6 item">
                            <div class="item-in">
                                <h4>${article.title}</h4>
                                <div class="seperator"></div>
                                <p>${article.content}</p>
                                <a href = "http://abito12.imad.hasura-app.io/articles/${article.id}">Read More
                                <i class="fa fa-long-arrow-right"></i>
                                </a>
                            </div>
                        </div>`;
            $('#articleBox').append(Box);
        }
        $('#options').css("visibility","hidden");
        noclicks +=1;
        document.getElementById('optionsbar').innerHTML = "Newest First";
        document.getElementById('ordernew').innerHTML = "Show All";
        document.getElementById('orderlikes').innerHTML = "Likes";
        document.getElementById('orderold').innerHTML = "Oldest first";
        document.getElementById('ordernew').onclick = getAllArticles3;
        document.getElementById('orderlikes').onclick = getArticlesByLike;
        document.getElementById('orderold').onclick = getArticlesOld;
    }
});
}

function getAllArticles3(){
    document.getElementById('sub-header').innerHTML = "Have a look at our articles";
    document.getElementById('optionsbar').innerHTML = "Sort articles by";
    document.getElementById('ordernew').innerHTML = "Newest first";
    document.getElementById('ordernew').onclick = getArticlesNew;
    $('#options').css("visibility","hidden");
    document.getElementById('orderlikes').onclick = getArticlesByLike;
    document.getElementById('orderold').onclick = getArticlesOld;
    getAllArticles();
    noclicks += 1;
}

// 2. Sort By id

function getArticlesOld(){
    $.ajax({
    url: "/OldArticles",
    success: function(result){
        $('#sub-header').html("The most aged articles");
        $('#articleBox').html("");
        var myArticles = JSON.parse(result);
        for(var i = 0;i < myArticles.length; i++){
            var article = myArticles[i];
            var Box = `<div class="col-md-6 item">
                            <div class="item-in">
                                <h4>${article.title}</h4>
                                <div class="seperator"></div>
                                <p>${article.content}</p>
                                <a href = "http://abito12.imad.hasura-app.io/articles/${article.id}">Read More
                                <i class="fa fa-long-arrow-right"></i>
                                </a>
                            </div>
                        </div>`;
            $('#articleBox').append(Box);
        }
        $('#options').css("visibility","hidden");
        noclicks +=1;
        document.getElementById('optionsbar').innerHTML = "Oldest First";
        document.getElementById('orderlikes').innerHTML = "Likes";
        document.getElementById('ordernew').innerHTML =  "Newest first";
        document.getElementById('orderold').innerHTML = "Show All";
        document.getElementById('orderold').onclick = getAllArticles4;
        document.getElementById('orderlikes').onclick = getArticlesByLike;
        document.getElementById('ordernew').onclick = getArticlesNew;
    }
});
}

function getAllArticles4(){
    document.getElementById('sub-header').innerHTML = "Have a look at our articles";
    document.getElementById('optionsbar').innerHTML = "Sort articles by";
    document.getElementById('orderold').innerHTML = "Oldest first";
    document.getElementById('orderold').onclick = getArticlesOld;
    $('#options').css("visibility","hidden");
    document.getElementById('orderlikes').onclick = getArticlesByLike;
    document.getElementById('ordernew').onclick = getArticlesNew;
    getAllArticles();
    noclicks += 1;
}


$(document).ready(function(){
    getAllArticles();
    getUsername();
    var myarticles = document.getElementById('myarticles-btn');
    myarticles.onclick = function(){
        var name = document.getElementById('displayname').innerHTML.toString();
        document.getElementById('main-header').innerHTML = name +" \'s Articles ";
        document.getElementById('new-link').innerHTML = "Write a new article";
        getMyArticles();
    };
    var optionsbar = document.getElementById('optionsbar');
    optionsbar.onclick =  function(){
        noclicks += 1;
            if(noclicks % 2 ===0){
    $('#options').css("visibility","hidden");
    }
    if(noclicks % 2 ===1) {
        $('#options').css("visibility","visible");
        document.getElementById("toggle2").checked = false;
        
    }
    };
});



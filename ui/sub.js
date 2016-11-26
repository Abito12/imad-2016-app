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


function getUserName(){
    $.ajax({
        url: "/check-login",
        success: function(result){
            var userDetails = JSON.parse(result);
            var username = userDetails.username;
            console.log(username);
            $('#displayname').html(username); 
        }
    });
}


function getAllArticles(){
    $.ajax({
    url: "/allArticles",
    success: function(result){
        var allArticles = JSON.parse(result);
        console.log(allArticles);
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

$(document).ready(function(){
    getAllArticles();
    getUsername();
});



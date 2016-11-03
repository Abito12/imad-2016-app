
function getAllArticles(){
    $.ajax({
    url: "/allArticles",
    success: function(result){
        var allArticles = JSON.parse(result);
        console.log(allArticles);
        for(var i = 0;i < allArticles.length; i++){
            var article = allArticles[i];
            var Box = `<div class="box">
                            <div class="cover left">
                                <h2 class="title">${article.title}</h2>
                                <p class="intro">${article.content}</p>
                            <div class="btn"><a href="#">Read more...</a></div>
                            <p class="date">${article.date}</p>
                            </div>
                    </div>`;
            $('.container').append(Box);
            
            
            
            
        }
    }
});
}

$(document).ready(function(){
    getAllArticles();
});
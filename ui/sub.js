
function getAllArticles(){
    $.ajax({
    url: "/allArticles",
    success: function(result){
        var allArticles = JSON.parse(result);
        console.log(allArticles);
        for(var i = 0;i < allArticles.length; i++){
            var article = allArticles[i];
            var trans;
            
            if(i % 2 === 0){
                trans = "left";
            }
            if(i % 2 === 1){
                trans ="right";
            }
            var Box = `<div class="box">
                            <div class="cover ${trans}">
                                <h2 class="title">${article.title}</h2>
                                <p class="intro">${article.content}</p>
                            <div class="btn"><a href="#">Read more...</a></div>
                            <p class="date"></p>
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
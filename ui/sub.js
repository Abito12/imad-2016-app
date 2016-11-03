
function getAllArticles(){
    $.ajax({
    url: "/allArticles",
    success: function(result){
        var allArticles = JSON.parse(result);
        console.log(allArticles);
        for(var i = 0;i < allArticles.length; i++){
            var article = allArticles[i];
            var trans;
            
            if(i % 4 === 0){
                trans = "left";
            }
            if(i % 4 === 1){
                trans ="right";
            }
            if(i % 4 == 2){
                trans = "top"
            }
            if(i % 4 === 3){
                trans = "bottom"
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
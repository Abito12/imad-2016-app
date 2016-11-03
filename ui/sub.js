
function getAllArticles(){
    $.ajax({
    url: "/allArticles",
    success: function(result){
        var allArticles = JSON.parse(result);
        console.log(allArticles);
        for(var i = 0;i < allArticles.length; i++){
            var article = allArticles[i];
            var trans;
            var color;
            
            if(i % 4 === 0){
                trans = "left";
                color= "#673AB7";
                
                
            }
            if(i % 4 === 1){
                trans ="right";
                color= "#2196EA";
                
            }
            if(i % 4 == 2){
                trans = "top";
                color = "#EB5848";
            }
            if(i % 4 === 3){
                trans = "bottom";
                color = "#FF69B4";
            }
            
            
            var Box = `<div class="box" style="background-color: ${color}">
                            <div class="cover ${trans}">
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
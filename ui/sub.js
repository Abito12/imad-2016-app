
function getAllArticles(){
    $.ajax({
    url: "/allArticles",
    success: function(result){
        var allArticles = JSON.parse(result);
        console.log(allArticles);
        for(var i = 0;i < allArticles.length; i++){
            var article = allArticles[i];
            var trans = ["left", "right","top","bottom","bottom-right","top-left"];
            var color = ["#3399FF", "#CC0033", "#03A8A6" , "#6633CC", "#009933", "#E25422"];
            var rand = i % 6;
            
            var Box = `<div class="box" style="background-color: ${color[rand]}">
                            <div class="cover ${trans[rand]}">
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
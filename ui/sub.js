
function getAllArticles(){
    $.ajax({
    url: "/allArticles",
    success: function(result){
        var allArticles = JSON.parse(result);
        console.log(allArticles);
    }
});
}

$(document).ready(function(){
    getAllArticles();
});
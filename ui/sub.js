
function getAllArticles(){
    $.ajax({
    url: "/allArticles",
    success: function(result){
        alert(result);
    }
});
}

$(document).ready(function(){
    getAllArticles();
});
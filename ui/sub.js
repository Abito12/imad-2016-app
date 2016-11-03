
function getAllArticles(){
    $.ajax({
    url: "/allArticles",
    success: function(){
        alert('hi');
    }
});
}

$(document).ready(function(){
    getAllArticles();
});
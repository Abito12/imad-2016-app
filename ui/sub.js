
function getAllArticles(){
    $.ajax({
    url: "/allArticles",
    success: function(){
        alert('hi');
    }
});
}
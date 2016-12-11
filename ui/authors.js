function getAuthors(){
    $.ajax({
    url: "/allAuthors",
    success: function(result){
        $('#mainbox').append("<h1 id='main-heading'>Article Authors</h1>");
        var allAuthors = JSON.parse(result);
        var countrows = Math.ceil(allAuthors.length/3);
        for(var i=0; i < countrows; i++){
            var  rows = `<div  class="row">`;
            var fourcolumns = "";
            for(var j = 0; j < 3; j++){
                var k = i*3+j;
                if(k<allAuthors.length){
                author = allAuthors[k];
                fourcolumns += `<div class="four columns">
                    <div class="teaser">
                    <h3>${capitalize(author.username)}</h3>
                    <h6><span>${author.profession}</span></h6>
                    <p>${author.bio}</p>
                    <h6><a class="user-links" href = "#" onclick = "return getUserArticles(${author.id}, '${author.username}')">Show Articles</a></h6>
                    </div>
                    </div>`;
                }
            }
            rows = rows + fourcolumns + `</div>`;
            $('#mainbox').append(rows);
        }
    }
});
}

function getSpecificArticles(id){
    $.ajax({
    url: "/getSpecificArticles/"+id,
    success: function(result){
        var allArticles = JSON.parse(result);
        var countrows = Math.ceil(allArticles.length/3);
        for(var i=0; i < countrows; i++){
            var  rows = `<div  class="row">`;
            var fourcolumns = "";
            for(var j = 0; j < 3; j++){
                var k = i*3+j;
                if(k<allArticles.length){
                article = allArticles[k];
                fourcolumns += `<div class="four columns">
                    <div class="teaser">
                    <h3>${capitalize(article.title)}</h3>
                    <h6><span>${article.date}</span></h6>
                    <p>${article.content.slice(0,15)}</p>
                    <h6><a class="user-links" href = "#">Read Article</a></h6>
                    </div>
                    </div>`;
                }
            }
            rows = rows + fourcolumns + `</div>`;
            $('#mainbox').append(rows);
        }
    }
});
}




function getUserArticles(id, name){
    $('#main-heading').html(capitalize(name) + "'s Articles");
    getSpecificArticles(id);
    return false;
}











function capitalize(name){
    name = name[0].toUpperCase() + name.slice(1);
    return name;
}

$(document).ready(function(){
    getAuthors();
});
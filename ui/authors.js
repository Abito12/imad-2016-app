function getAuthors(){
    $.ajax({
    url: "/allAuthors",
    success: function(result){
        $('#mainbox').html("<h1>Article Authors</h1>");
        var allAuthors = JSON.parse(result);
        var countrows = Math.ciel(allAuthors.length/3);
        for(var i=0; i < countrows; i++){
            var  rows = `<div  class="row">`;
            var fourcolumns = "";
            for(var j = 0; j < 3; j++){
                author = allAuthors[i * 3 + j];
                fourcolumns += `<div class="four columns">
                    <div class="teaser">
                    <h3>${author.username}</h3>
                    <h6><span>${author.profession}</span></h6>
                    <p>${author.bio}</p>
                    <h6><a href = "#">Show Articles</a></h6>
                    </div>
                    </div>`;
            }
            rows = rows + fourcolumns + `</div>`;
            $('#mainbox').append(rows);
        }
    }
});
}

$(document).ready(function(){
    getAuthors();
});
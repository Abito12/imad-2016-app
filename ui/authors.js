function getAuthors(){
    $.ajax({
    url: "/allAuthors",
    success: function(result){
        $('#mainbox').html("<h1>Article Authors</h1>");
        var allAuthors = JSON.parse(result);
        var countrows = Math.ceil(allAuthors.length/3);
        console.log(countrows);
        for(var i=0; i < countrows; i++){
            console.log('first loop');
            var  rows = `<div  class="row">`;
            var fourcolumns = "";
            for(var j = 0; j < 3; j++){
                console.log('second');
                var k = i*3+j;
                console.log(k);
                if(k<allAuthors.length){
                author = allAuthors[k];
                fourcolumns += `<div class="four columns">
                    <div class="teaser">
                    <h3>${author.username}</h3>
                    <h6><span>${author.profession}</span></h6>
                    <p>${author.bio}</p>
                    <h6><a href = "#">Show Articles</a></h6>
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

$(document).ready(function(){
    getAuthors();
});
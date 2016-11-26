function getComments(){
    var key = document.getElementById('key').innerHTML.toString();
    console.log(key)
    $.ajax({
    url: "/comments/" + key,
    success: function(result){
        var allComments = JSON.parse(result);
        console.log(allComments);
        for(var i = 0;i < allComments.length; i++){
            var comment = allComments[i];
            var Box = `<li>
                    <div class="commentText">
                         <p class="">${comment.body}</p> <span class="date sub-text">${comment.writer}</span>
                    </div>
                    </li>`;
            $('#commentBox').append(Box);
            
        }
    }
});
}

$(document).ready(function(){
    getComments();
});
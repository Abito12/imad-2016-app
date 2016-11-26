
function getAllComments(){
    $.ajax({
    url: "/articles/comments",
    success: function(result){
        var allComments = JSON.parse(result);
        console.log(allComments);
        for(var i = 0;i < allComments.length; i++){
            var Comment = allComments[i];
            var Box = `<li>
                        <div class="commentText">
                            <p class="">${Comment.comment}</p> <span class="date sub-text">${Comment.author}</span>
                        </div>
                    </li>`;
            $('.commentslist').append(Box);
            
        }
    }
});
}

$(document).ready(function(){
    getAllComments();
    var key = document.getElementById('key').innerHTML.toString();
console.log('script works');
console.log(key);
});
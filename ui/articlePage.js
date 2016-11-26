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
                         <p class="">${comment.body}</p> <span class="date sub-text">${comment.username}</span>
                    </div>
                    </li>`;
            $('#commentBox').append(Box);
            
        }
    }
});
}

$(document).ready(function(){
    getComments();
    
var addBtn = document.getElementById('addBtn');
addBtn.onclick = function(){
      var request = new XMLHttpRequest();
  
  
  request.onreadystatechange = function(){
      if(request.readyState === XMLHttpRequest.DONE){
          if(request.status === 500){
              alert('Comment could not be added');
          }
          else {
              console.log('Comment added');
              getComments();
          }
      }
  };
  
  var comment = document.getElementById('commentInpt').value;
  console.log(comment);
  request.open('POST', 'http://abito12.imad.hasura-app.io/add-comment', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({comment:comment}));
  



};

});



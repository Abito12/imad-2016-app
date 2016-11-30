function lettersOnly(input){
     var regex = /[^a-z-^0-9,#!@#$%&*()*._+=/]/gi;
    input.value = input.value.replace(regex, " ");
}

var likedFlag = 0;
var clickcount = 0;
var likes;
$(function(){
  $('.like-toggle').click(function(){
      clickcount += 1;
      if(clickcount % 2 ===1 && likedFlag ===1){
          likes = Number(document.getElementById('counterLikes').innerHTML) - 1;
          document.getElementById('counterLikes').innerHTML = likes.toString(); 
      }
      if(clickcount % 2 ===0 && likedFlag ===1){
          likes = Number(document.getElementById('counterLikes').innerHTML) + 1;
          document.getElementById('counterLikes').innerHTML = likes.toString();    
      }
      if(clickcount % 2 ===1 && likedFlag ===0){
          likes = Number(document.getElementById('counterLikes').innerHTML) + 1;
          document.getElementById('counterLikes').innerHTML = likes.toString();    
      }
      if(clickcount % 2 ===0 && likedFlag ===0){
          likes = Number(document.getElementById('counterLikes').innerHTML) - 1;
          document.getElementById('counterLikes').innerHTML = likes.toString();    
      }
    $(this).toggleClass('like-active');
    $(this).next().toggleClass('hidden');
  });
});

function getComments(){
    var key = document.getElementById('key').innerHTML.toString();
    $.ajax({
    url: "/comments/" + key,
    success: function(result){
        $('#comments-container').html("");
        var allComments = JSON.parse(result);
        for(var i = 0;i < allComments.length; i++){
            var comment = allComments[i];
            var Box = `<div class="comment">
        <div class="comment-user">
      <div class="avatar">${comment.username[0]}</div><span class="user-details"><span class="username">${comment.username} </span><span>on </span><span>${comment.date}</span></span>
        </div>
        <div class="comment-text">
            ${comment.body}
        </div>
      </div>`;
            $('#comments-container').append(Box);
            
        }
    }
});
}

function getlikes(){
    var key = document.getElementById('key').innerHTML.toString();
    $.ajax({
    url: "/getlikes/" + key,
    success: function(result){
        $('#counterLikes').html("");
        var likes = JSON.parse(result);
        var count = likes[0].count;
            $('#counterLikes').html(count);
        
    }
});
}



function checklike(){
        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
          if(request.status === 200){
              document.getElementById('hidden-text').className = "";
              likedFlag = 1;
          }
      }
  };
  var id = document.getElementById('key').innerHTML.toString();
  request.open('GET', 'http://abito12.imad.hasura-app.io/check-like/' + id , true);
  request.send(null);
}

//Add a like
function addlike(){
        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
          if(request.status === 500){
              console.log('Could not update like count');
          }
      }
  };
  var id = document.getElementById('key').innerHTML.toString();
  request.open('GET', 'http://abito12.imad.hasura-app.io/add-like/' + id , true);
  request.send(null);
}

//Delete the like
function deletelike(){
        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
          if(request.status === 500){
             console.log('Could not update like count');
          }
      }
  };
  var id = document.getElementById('key').innerHTML.toString();
  request.open('GET', 'http://abito12.imad.hasura-app.io/delete-like/' + id , true);
  request.send(null);
}




$(document).ready(function(){
    checklike();
    getlikes();
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
              document.getElementById('textarea').value = "";
          }
      }
  };
  
  var comment = document.getElementById('textarea').value;
  var Vcomment = comment.trim();
  if(Vcomment.length === 0){
      alert('Comment body cannot be empty');
      document.getElementById('textarea').value ="";
  }
  else{
  var id = document.getElementById('key').innerHTML.toString();
  console.log(comment);
  request.open('POST', 'http://abito12.imad.hasura-app.io/add-comment/' + id , true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({comment:comment}));
  }


};

});

window.onbeforeunload = function(count) {
    var likestatus = document.getElementById('hidden-text');
    if(likestatus.className ==="hidden" && likedFlag ===1){
        deletelike();
    }
    else if(likestatus.className ==="" && likedFlag === 0){
        addlike();
    }
    return null;
};
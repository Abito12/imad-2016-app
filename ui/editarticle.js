
$(document).ready(function(){

var submit = document.getElementById('save-btn');
submit.onclick = function(){
    var request = new XMLHttpRequest();
     request.onreadystatechange = function(){
      if(request.readyState === XMLHttpRequest.DONE){
          if(request.status === 500){
              alert('Article could not be edited');
          }
          else {
              alert('Article was edited successfully');
              window.location.href='http://abito12.imad.hasura-app.io/articles';
          }
      }
  };
  
  var title = document.getElementById('title').value;
  var content = document.getElementById('content').value;
  var id = document.getElementById('messages').innerHTML.toString();
  
  if(title.length ===0){
      alert('Please provide a title');
  }
  else if(title.length > 30){
      alert('Maximum 30 letters for title');
  }
  else if(content.length === 0){
      alert('Content Section is Empty');
  }
  else{
  content = content.replace(/(?:\r\n|\r|\n)/g, '<br />');
  console.log(content);
  console.log(title);
  request.open('POST', 'http://abito12.imad.hasura-app.io/savearticle', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({title:title, content:content, id:id}));
  }



};
});




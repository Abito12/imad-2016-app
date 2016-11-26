$(document).ready(function(){

var submit = document.getElementById('submit-btn');
submit.onclick = function(){
    var request = new XMLHttpRequest();
     request.onreadystatechange = function(){
      if(request.readyState === XMLHttpRequest.DONE){
          if(request.status === 500){
              alert('Article could not be added');
          }
          else {
              alert('Article was created');
              window.location.href='http://abito12.imad.hasura-app.io/articles';
          }
      }
  };
  
  var title = document.getElementById('title').value;
  var content = document.getElementById('content').value;
  console.log(content);
  console.log(title);
  request.open('POST', 'http://abito12.imad.hasura-app.io/add-article' + id , true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({title:title, content:content}));
  



};
});




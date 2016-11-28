
$(document).ready(function(){

var submit = document.getElementById('contact-send');
submit.onclick = function(){
    var request = new XMLHttpRequest();
     request.onreadystatechange = function(){
      if(request.readyState === XMLHttpRequest.DONE){
          if(request.status === 500){
              alert('Message could not be sent');
          }
          else {
              alert('Message Sent');
              window.location.href='http://abito12.imad.hasura-app.io/articles';
          }
      }
  };
  
  var name = document.getElementById('contact-name').value;
  var email = document.getElementById('contact-email').value;
  var message = document.getElementById('contact-message').value;
  
  if(name.length ===0 || email.length === 0 || message.length ===0){
      alert('Please fill out all the fields');
  }
 
  else{
  console.log(name + email);
  console.log(message);
  request.open('POST', 'http://abito12.imad.hasura-app.io/send-message', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({name:name, email:email, message: message}));
  }



};
});




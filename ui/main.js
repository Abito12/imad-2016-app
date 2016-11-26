$('.tabs .tab').click(function(){
    if ($(this).hasClass('signin')) {
        $('.tabs .tab').removeClass('active');
        $(this).addClass('active');
        $('.cont').hide();
        $('.signin-cont').show();
    } 
    if ($(this).hasClass('signup')) {
        $('.tabs .tab').removeClass('active');
        $(this).addClass('active');
        $('.cont').hide();
        $('.signup-cont').show();
    }
});
$('.container .bg').mousemove(function(e){
    var amountMovedX = (e.pageX * -1 / 30);
    var amountMovedY = (e.pageY * -1 / 9);
    $(this).css('background-position', amountMovedX + 'px ' + amountMovedY + 'px');
});



var submit = document.getElementById('submit-btn');
submit.onclick = function(){
  var request = new XMLHttpRequest();
  
  
  request.onreadystatechange = function(){
      if(request.readyState === XMLHttpRequest.DONE){
          if(request.status === 200){
              window.location.href='http://abito12.imad.hasura-app.io/articles';
              console.log("Successful Login");
          }
          else if(request.status === 403){
              alert('Incorrect username and password');
          }
          else if(request.status ===503){
              alert('Internal Error');
          }
      }
  };
  
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  console.log(username);
  console.log(password);
  request.open('POST', 'http://abito12.imad.hasura-app.io/login', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({username: username, password: password}));
  
};


var signup = document.getElementById('signup-btn');
signup.onclick = function(){
      var request = new XMLHttpRequest();
  
  
  request.onreadystatechange = function(){
      if(request.readyState === XMLHttpRequest.DONE){
          if(request.status === 200){
              alert('Sign Up Successful, Please login with your credentials');
              window.location.href='http://abito12.imad.hasura-app.io/articles';
          }
          else if(request.status ===500){
              alert('Sign In Error');
          }
      }
  };
  
  var username2 = document.getElementById('username2').value;
  var password2 = document.getElementById('password2').value;
  console.log(username2);
  console.log(password2);
  request.open('POST', 'http://abito12.imad.hasura-app.io/create-user', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({username: username2, password: password2}));
  
  
};



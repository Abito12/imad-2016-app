function getUsername(){
    $.ajax({
        url: "/check-login",
        success: function(result){
            var userDetails = JSON.parse(result);
            console.log(userDetails);
            var name = userDetails[0].username;
            var email = userDetails[0].email;
            var job = userDetails[0].profession;
            var bio = userDetails[0].bio;
            name = name[0].toUpperCase() + name.slice(1);
            $('#main-heading').html(name+ "'s Profile");
            $('#userinfo').val(job);
            $('#useremail').val(email);
            $('#userbio').html(bio);
        }
    });
}

$(document).ready(function(){
    getUsername();
    var submit = document.getElementById('contact-send');
    submit.onclick = function(){
    var request = new XMLHttpRequest();
     request.onreadystatechange = function(){
      if(request.readyState === XMLHttpRequest.DONE){
          if(request.status === 500){
              alert('Could not update user profile');
          }
          else {
              alert('Profile Updated');
              window.location.href='http://abito12.imad.hasura-app.io/articles';
          }
      }
  };
  
  var info = document.getElementById('userinfo').value;
  var email = document.getElementById('useremail').value;
  var bio = document.getElementById('userbio').value;
  if(info.length ===0 || email.length === 0 || bio.length ===0){
      alert('Please fill out all the fields');
  }
  else{
  request.open('POST', 'http://abito12.imad.hasura-app.io/update-profile', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({info:info, email:email, bio: bio}));
  }

};
});
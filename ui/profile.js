function getUsername(){
    $.ajax({
        url: "/check-login",
        success: function(result){
            var userDetails = JSON.parse(result);
            console.log(userDetails);
            var name = userDetails[0].username;
            $('#username').val(name); 
        }
    });
}


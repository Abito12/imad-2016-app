function getUsername(){
    $.ajax({
        url: "/check-login",
        success: function(result){
            var userDetails = JSON.parse(result);
            console.log(userDetails);
            var name = userDetails[0].username;
            name = name[0].toUpperCase() + name.slice(1);
            $('#main-heading').html(name+ "'s Profile");
        }
    });
}

$(document).ready(function(){
    getUsername();
});
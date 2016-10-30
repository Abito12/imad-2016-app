$('.toggle').on('click', function() {
  $('.container').stop().addClass('active');
});

$('.close').on('click', function() {
  $('.container').stop().removeClass('active');
});



/*
var button = document.getElementById('count-button');
button.onclick = function(){
    console.log('asd');
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
	    if(request.readyState === XMLHttpRequest.DONE){
	        if(request.status === 200){
	                var count = request.responseText;
	                var count_button = document.getElementById('show-count');
	                count_button.innerHTML = count.toString();
	            }
	        }
	    };

	
	request.open('GET', "http://abito12.imad.hasura-app.io/counter", true);
	request.send(null);
	
};

*/
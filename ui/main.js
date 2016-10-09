var getName= function(){
    var Name, q = 'Enter Your Name';
    n = window.sessionStorage.getItem('Name');
    if (!n) {
        n = window.prompt(q);
        console.log(n);
        window.sessionStorage.setItem('Name', n);
    }
    document.getElementById('username').innerHTML = n;
    return n;
};

var button = document.getElementById('count-button');

button.onclick = function(){
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
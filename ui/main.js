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

var icount =function(){
    console.log('sda');
	var request = new XMLHttpRequest();
	request.readystatechange = function(){
	    if(request.readystate == XMLRequest.DONE){
	        if(request.status == 200){
	            var count = request.responseText;
	            console.log(count)
	            var count_button = document.getElementById('count');
	            count_button.innerHTML = count.toString();
	        }
	    }
	}
	
	request.open('GET', "http://abito12.imad.hasura-app.io/counter", true);
	request.send(null);
	
};
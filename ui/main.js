// Getting the Name of the User
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

/*Counter Button

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

console.log('main works');
// Comments Section
    var commentBtn = document.getElementById('comment-text');
    usercomment = commentBtn.value;
    console.log(usercomment);

var submit = document.getElementById('submitBtn');
submit.onclick = function(){
    console.log('sadasd')
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState ===XMLHttpRequest.DONE){
            if(request.status === 200){
                var comments = request.responseText;
                comments = JSON.parse(comments);
                var comment = '';
                for(var i =0; i< comments.length;i++){
                    comment = '<li>' + comments[i] + '</li>';
                }
                var ul = document.getElementById('comments-list');
                ul.innerHTML = comment;
            }
        }
    };

    console.log('usercomment');
    request.open('GET', 'http://abito12.imad.hasura-app.io/submit-btn?comment='+ comment , true);
    request.send(null);
};
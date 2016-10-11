

var submitBtn = document.getElementById('submitBtn');
submitBtn.onclick = function(){
    
    console.log('Clicked');
    request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        console.log('dada');
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                console.log('fafaf');
                var comments = request.responseText;
                comments = JSON.parse(comments);
                var list = '';
                for (var i =0; i<comments.length; i++){
                    list += '<li>' + comments[i] + '</li>';
                }
                var commentsList = document.getElementById('comments-list');
                commentsList.innerHTML = list;
            }
        }
    }
    
     
    var commentBtn = document.getElementById('comment-text');
    var comment = commentBtn.value;
    console.log(comment);
    request.open('GET', 'http://abito12.imad.hasura-app.io/submit?comment='+comment, true);
    request.send(null);
    
}
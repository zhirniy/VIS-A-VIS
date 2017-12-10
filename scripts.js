window.fbAsyncInit = function() {
    FB.init({
      appId            : '374623619649840',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.11'
    });
    
    FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
});

  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

  
  function statusChangeCallback(response){
      if(response.status === 'connected'){
           setElement(true);
           testApi();
      }else{
           setElement(false);
           } 
  }
   
   function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

   function testApi(){
       FB.api('/me?fields=name,email,birthday', function(response){
           if(response && !response.error){
              buildProfile(response);
           }
           FB.api('me?fields=posts.limit(5){created_time,name,picture,likes.limit(1).summary(true),shares}', function(response){
           if(response && !response.error){
              buildFeed(response);
           }    
           });
       })
   }
   
   function buildProfile(user){
      
      document.getElementById('profile').innerHTML = user.name;
   }
   
   function buildFeed(feed){
       let output = '<h3>Posts:</h3>';
       for(let i in feed.posts.data){
           if(feed.posts.data[i].id){
            
           if(feed.posts.data[i].shares){
               for (key in feed.posts.data[i].shares) {
               feed.posts.data[i].shares = feed.posts.data[i].shares[key];
               }
           } else{
               feed.posts.data[i].shares = 0;
           }
            if(i==0 || i==3){
            output +='<div class="row">';    
            }
            if(i>=0 && i<3){
             output +='<div class="col-md-4">';    
            }
            else if(i==3){
             output +='<div id="center" class="col-md-4 col-md-push-1">';   
            }
            else{
              output +='<div class="col-md-4 col-md-push-8">';  
            }
            feed.posts.data[i].created_time_ = feed.posts.data[i].created_time.substring(2,10);
            feed.posts.data[i].created_time_ = feed.posts.data[i].created_time.substring(8,10) + '.'
            + feed.posts.data[i].created_time.substring(5,7) + '.'+
            +  feed.posts.data[i].created_time.substring(2,4);
            //feed.posts.data[i].created_time_ = feed.posts.data[i].created_time_.split("").reverse().join("");
            output += '<div class="border_"><label>&nbspDate: '+feed.posts.data[i].created_time_+'</label></div>'
            + '<div class="border_ picture" style="background-image: url('+ feed.posts.data[i].picture+'); background-size: cover"></div>'
            + '<div class="border_"><label class="name">'+ feed.posts.data[i].name+'</label></div>'
            + '<div class="border_ left_user"><label>'+ feed.posts.data[i].likes.summary.total_count+' likes</label></div>'
            + '<div class="border_ left_user"><label>'+ feed.posts.data[i].shares +' shares</label></div>'
            + '<div class="border_ right_user"><label class="a_user"><a href="https://www.facebook.com/'+ feed.posts.data[i].id+'">See post on Facebook--</a></label></div></div>';   
             if(i==2 || i==4){
            output +='</div><br><br>';    
            }
            }
       }
      document.getElementById('feed').innerHTML = output; 
   }
   
   function setElement(login_in){
   if(login_in){    
     document.getElementById('logout').style.display = "block";
    document.getElementById('user').style.display = "block";
    document.getElementById('fb-btn').style.display = "none"; 
    document.getElementById('feed').style.display = "block";
   }
    else{
    document.getElementById('logout').style.display = "none";
    document.getElementById('user').style.display = "none";
    document.getElementById('fb-btn').style.display = "block";
    document.getElementById('feed').style.display = "none";
    }
   }
   
   function logout(){
       FB.logout(function(response){
           setElement(false);
       });
   }
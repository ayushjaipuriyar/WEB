var openLoginRight = document.querySelector('.h1');
var loginWrapper = document.querySelector('.login-wrapper');

openLoginRight.addEventListener('click', function(){
  loginWrapper.classList.toggle('open'); 
});

function check(form)
{
 
 if(form.userid.value == "admin" && form.pswrd.value == "admin")
  {
    window.open('https://facebook.com')
  }
 else
 {
   alert("You are not a fellow criminal")
  }
}
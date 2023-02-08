const nav = document.getElementById('nav');
const bar = document.getElementById('bar');
const icons = document.getElementById('icons');

bar.addEventListener('click',()=>{
   if (nav.classList.contains('active')){
       nav.classList.remove('active');
       icons.classList.remove('active');
   }
   else{
       nav.classList.add('active');
       icons.classList.add('active');
   }
});

const user = ()=>{
    let usr = localStorage.getItem('currentUser');
    window.location.href = `/user?field=${usr}`;
}


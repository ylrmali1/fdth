const closeBar = document.getElementById('hidden');
const openBar = document.getElementById('show');
const sideBar = document.getElementById('sidebar');
const mainBar = document.getElementById('mainbar');


closeBar.addEventListener('click',()=>{
   console.log('clicked');
   sideBar.classList.toggle('hidden');
   mainBar.classList.replace('col-md-10','col-md-12');
   openBar.parentElement.classList.replace('hidden','show');
});

openBar.addEventListener('click',()=>{
   sideBar.classList.replace('hidden','show');
   mainBar.classList.replace('col-md-12','col-md-10');
   openBar.parentElement.classList.replace('show','hidden');
});
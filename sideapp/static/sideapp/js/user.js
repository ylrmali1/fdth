const name = document.getElementById('name');
const email = document.getElementById('email');
const number = document.getElementById('number');
const username = document.getElementById('username');


let url = window.location.search;
let urlParam = new URLSearchParams(url);
let field = urlParam.get('field');

let userId;
let data = JSON.parse(localStorage.getItem('users'));

for(let i = 0; i < data.length; i++){
    if(field == data[i].username){
        userId = i;

    }
}

let currentUser = data[userId];

name.innerHTML = currentUser.name;
email.innerHTML = currentUser.email;
if(currentUser.number != ""){
    number.innerHTML = currentUser.phone;
}
username.innerHTML = currentUser.username;

const email = document.getElementById('email');
const password = document.getElementById('password');
const alert = document.getElementById('alert');


const users = JSON.parse(localStorage.getItem('users'));

const user = () =>{
    alert.classList.remove('show');
    for (let i =0; i<users.length; i++){
        let mail = users[i].email;
        let psswrd = users[i].password;

        if ((email.value === mail) && (password.value === psswrd)){
            window.location.href = '/home';
            localStorage.setItem('currentUser',users[i].username);
        }
        else{
            alert.classList.add('show');
        }
    }
}
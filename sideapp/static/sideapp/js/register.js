const phoneNumber = document.getElementById('phoneNumber');
const fullName = document.getElementById('fullName');
const userName = document.getElementById('userName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordRepeat = document.getElementById('passwordRepeat');
const card = document.getElementById('card');
const error = document.getElementById('error');
const success = document.getElementById('success');


const checkForm = () => {
    error.classList.remove('show');
    success.classList.remove('show');
    let usrnm = userName.value;
    let mail = email.value;
    let pswrd = password.value;
    let pswrdRepeat = passwordRepeat.value;
    let fullname = fullName.value;
    let phonenumber = phoneNumber.value;
    let err;
    let scss;

    if(localStorage.getItem('users') === null){
        localStorage.setItem('users','[]');
    }



    if(pswrd === pswrdRepeat){
        let users = JSON.parse(localStorage.getItem('users'));
        for(let i = 0; i<users.length; i++){
            console.log(users[i].email);

            if(mail === users[i].email){
                err = true;
            }
        }

        if(err){
            error.classList.add('show');
        }
        else{
            success.classList.add('show');
            let newUser = {'name':fullname,'phone':phonenumber,'username':usrnm,'email':mail,'password':pswrd};

            let oldUsers = JSON.parse(localStorage.getItem('users'));
            oldUsers.push(newUser);
            localStorage.setItem('users',JSON.stringify(oldUsers));
        }

    }

}
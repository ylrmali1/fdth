const inputValue = document.getElementById('docName');
const photoValue = document.getElementById('photoName');
const imgInput = document.getElementById('imgInput');

// get field number from url
const url = window.location.search;
const urlParam = new URLSearchParams(url);
const field = urlParam.get('field');


// get datas according to id
const data = JSON.parse(localStorage.getItem('documents'))[field];
const documentName = data.name;
const documentPhotoName = data.pTitle;
console.log(data);
console.log(JSON.parse(localStorage.getItem('documents')));

// printing datas
inputValue.setAttribute('placeholder',documentName);
photoValue.innerText = documentPhotoName;




let pUrl;
imgInput.onchange = () => {
    const [file] = imgInput.files;
    console.log(file);
    photoValue.innerText = file.name;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load',()=>{
        pUrl = reader.result;
    });

}
//.log(data);
//console.log(JSON.parse(localStorage.getItem('documents')).length);
let newValue = inputValue.value;
console.log(newValue);


const editDocument = () =>{

    // replace old datas from with new datas
    let newValue = inputValue.value;
    if (newValue === ""){
        newValue = data.name;
    }
    console.log('url:',pUrl);
    console.log(data.url);
    if(pUrl === undefined){
        pUrl = data.url;
    }
    const newPhoto = photoValue.innerText;

    let db = JSON.parse(localStorage.getItem('documents'));
    // get current informations
    let id= data.id;


    let newData = {"id":id,"name":`${newValue}`,"pTitle":`${newPhoto}`,"url":`${pUrl}`};


    let oldData = JSON.parse(localStorage.getItem('documents'));

    //changed data
    Object.assign(oldData[field],newData);
    console.log(oldData);
    // upload local
    localStorage.setItem('documents',JSON.stringify(oldData));

    alert('Değişiklikler başarıyla uygulandı.\nBelgeler sayfasına yönlendiriliyorsunuz...');
    window.location.href = '/documents';

}

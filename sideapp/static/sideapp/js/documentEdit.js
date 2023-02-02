const inputValue = document.getElementById('docName');
const photoValue = document.getElementById('photoName');
const imgInput = document.getElementById('imgInput');

// get field number from url
const url = window.location.search;
const urlParam = new URLSearchParams(url);
const field = urlParam.get('field');


// get datas according to id
const data = JSON.parse(localStorage.getItem('documents'))[field-1];
const documentName = data.name;
const documentPhotoName = data.pTitle;

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
    })

}
//.log(data);
//console.log(JSON.parse(localStorage.getItem('documents')).length);

const editDocument = () =>{

    // replace old datas from with new datas
    const newValue = inputValue.value;
    const newPhoto = photoValue.innerText;

    let db = JSON.parse(localStorage.getItem('documents'));
    // get current informations
    let id= data.id;


    let newData = {"id":id,"name":`${newValue}`,"pTitle":`${newPhoto}`,"url":`${pUrl}`};


    let oldData = JSON.parse(localStorage.getItem('documents'));

    // delete old data
    oldData.splice(field-1,1);
    // get temporary data before changed.
    let temp = oldData[field-1];
    // declare new data and temporary data
    oldData[field-1] = newData;
    oldData[field] = temp;
    console.log(oldData);
    // upload local
    localStorage.setItem('documents',JSON.stringify(oldData));

    alert('Değişiklikler başarıyla uygulandı.\nBelgeler sayfasına yönlendiriliyorsunuz...');
    window.location.href = '/documents';

}

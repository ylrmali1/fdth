
// url deki ekleri aldık
const url = window.location.search;
// yeni bir url search paramsi ekledik
const urlParams = new URLSearchParams(url);
// search params 'dan field icindeki degeri aldık.
const field = urlParams.get('field');
console.log(field);

// localden documents i aldık ve gecerli datayı bılmak ıcın fieldden gelen id ye gore filtrelerdik.
let datas = JSON.parse(localStorage.getItem('documents'));
let currentData = datas[field];
console.log(currentData);

// data icindeki bilgileri tanımladık
let documentName = currentData.name;
let documentUrl = currentData.url;

// gelen datalari gerekli yerlerde kullandil.
const title = document.getElementById('title');
const lbl = document.getElementById('docName');
const docPhoto = document.getElementById('docPhoto');

title.innerText = `${documentName} Belgesi Detayları`;
lbl.setAttribute('value',documentName);
docPhoto.setAttribute('src',documentUrl);


//icons link
const ocrLink = document.getElementById('ocrLink');
ocrLink.setAttribute('href',`documents/ocr?field=${field}`)

const editLink = document.getElementById('editLink');
editLink.setAttribute('href',`documentDetails/edit?field=${field}`)
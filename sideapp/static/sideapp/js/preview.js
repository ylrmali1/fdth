const tabs = document.getElementById('tabs');
const image = document.getElementById('image');

const data = JSON.parse(localStorage.getItem('uploads'));


console.log(data);

if(data.length > 1){
    for (let i = 0; i < data.length ; i++){
        tabs.innerHTML += `
            <button type="button" data-id-number="${data[i].id}"
                    onclick="window.location.href = '/preview?field=${data[i].id}'">
                ${data[i].name}
            </button>
        `;
    }


}

console.log(window.location.search === "");
let url = window.location.search;
let urlParam = new URLSearchParams(url);
let field = urlParam.get('field');

if(url === ""){
    image.setAttribute('src',data[0].url);
}
else{
    image.setAttribute('src',data[field].url);
}


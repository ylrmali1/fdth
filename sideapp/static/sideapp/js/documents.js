


//let documentName = document.getElementById('documentName');
let tableBody = document.getElementById('tableBody');


let docJson = localStorage.getItem('documents');
let docObject = JSON.parse(docJson);

console.log(docObject[0]);
for (let i = 0; i <= docObject.length - 1; i++) {
    // Create to new tr element
    const newTr = document.createElement('tr');
    const newTd = document.createElement('td');
    const childTd = document.createElement('td');
    const button = document.createElement('button');

    let key = docObject[i];
    //tr
    newTr.setAttribute('id', key.name);
    tableBody.appendChild(newTr);
    let tr = document.getElementById(key.name);
    tr.appendChild(newTd);
    tr.appendChild(childTd);


    // td
    newTd.setAttribute('id', 'documentName');
    newTd.innerText = key.name;

    // a
    button.setAttribute('onclick', 'goToInformationPage(this.getAttribute(\'data-doc-id\'))');
    //button.setAttribute('class', key.name);
    button.setAttribute('data-doc-id', key.id);
    button.innerHTML = '<i class="fa-solid fa-info"></i>';
    childTd.appendChild(button);
}






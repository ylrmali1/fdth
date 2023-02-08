
let url2 = window.location.search;
let urlParam2 = new URLSearchParams(url2);
let field2 = urlParam2.get('field');

let currentData2 = JSON.parse(localStorage.getItem('documents'))[field2];
let cdName2 = currentData2.name;
console.log(cdName2);



let number = -1;
const addKey = () =>{

        number +=1;

         // add key and value
        const div = document.createElement('div');
        const div2 = document.createElement('div');
        const div3 = document.createElement('div');
        const lbL = document.createElement('label');
        const lbL2 = document.createElement('label');
        const inpuT = document.createElement('input');
        const inpuT2 = document.createElement('input');

        // first input configurations
        inpuT.setAttribute('class','inpt');
        inpuT.setAttribute('id','key');
        inpuT.setAttribute('type','text');
        inpuT.setAttribute('onclick','keyActive(this.getAttribute(\'data-input-count\'))');
        inpuT.setAttribute('data-input-count',number);

        // first label configurations
        lbL.setAttribute('for','key');
        lbL.innerText = 'Key';

        // first child div configurations
        div2.setAttribute('class','col-md-6');
        div2.appendChild(lbL);
        div2.appendChild(inpuT);


        // second input configurations
        inpuT2.setAttribute('class','inpt');
        inpuT2.setAttribute('type','text');
        inpuT2.setAttribute('id','value');
        inpuT2.setAttribute('onclick','valueActive(this.getAttribute(\'data-label-count\'))');
        inpuT2.setAttribute('data-label-count',number);

        // second label configurations
        lbL2.setAttribute('for','value');
        lbL2.innerText = 'Value';


        // second child div configurations
        div3.setAttribute('class','col-md-6');
        div3.appendChild(lbL2);
        div3.appendChild(inpuT2);


        // parent div configurations
        div.setAttribute('class','row gap-3');
        div.appendChild(div2);
        div.appendChild(div3);

        // adding all of elements in main div
        let innerCard = document.getElementById('innerCard');
        innerCard.appendChild(div);

         if(document.getElementById('value').className.includes('active')){
                document.getElementById('value').classList.remove('active');
        }

}





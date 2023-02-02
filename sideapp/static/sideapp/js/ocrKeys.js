

const addKey = () =>{


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
        inpuT.setAttribute('onclick','active()')

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
        inpuT2.setAttribute('onclick','active()');

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



const rotateDetailPage = () =>{
        let url = window.location.search;
        let urlParam = new URLSearchParams(url);
        let field = urlParam.get('field');

        window.location.href = `/documentDetails?field=${field}`;
}


const keyInput = document.getElementById('key');
const draw = document.getElementById('draw');


const active = () =>{
        const key = document.getElementById('key');
        const value = document.getElementById('value');
        draw.setAttribute('class','active');
        if(key.classList.contains('active')){
                key.classList.remove('active');
                value.classList.add('active');
        }
        else{
                key.classList.add('active');
        }

}


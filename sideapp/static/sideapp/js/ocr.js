const $ = document.querySelector.bind(document);


console.log(JSON.parse(localStorage.getItem('kimlikCoordination')))

/**
 * Collection of rectangles defining user generated regions
 */
let rectangles = [];

// DOM elements
const $screenshot = $('#screenshot');
const $draw = $('#draw');
const $marquee = $('#marquee');
const $boxes = $('#boxes');
const key = document.getElementById('key');

// get field from url
let url = window.location.search;
let urlParam = new URLSearchParams(url);
let field = urlParam.get('field');
console.log(field);

//get photo from localstorage
let datas = JSON.parse(localStorage.getItem('documents'));
let photoUrl = datas[field].url;
$screenshot.setAttribute('src',photoUrl);

// Temp variables
let startX = 0;
let startY = 0;
const marqueeRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
};
const keyCoordination = {
    startX: 0,
    startY: 0,
    width: 0,
    height: 0,
};

 const valueCoordination = {
    startX: 0,
    startY: 0,
    width: 0,
    height: 0,
}

let row;

$marquee.classList.add('hide');
$screenshot.addEventListener('pointerdown', startDrag);


function startDrag(ev) {
    // middle button delete rect
    $boxes.innerHTML = "";
    if (ev.button === 1) {
    const rect = hitTest(ev.layerX, ev.layerY);
    if (rect) {
        rectangles.splice(rectangles.indexOf(rect), 1);
      redraw();
    }
    return;
  }

  window.addEventListener('pointerup', stopDrag);
  $screenshot.addEventListener('pointermove', moveDrag);
  $marquee.classList.remove('hide');
  startX = ev.layerX;
  startY = ev.layerY;
  drawRect($marquee, startX, startY, 0, 0);
  console.log(startX,startY);

  // which item's(key or value) coordination will get.
    if(document.getElementById('key').className.includes('active')){
        Object.assign(keyCoordination,{startX,startY});
    }
    else{
        Object.assign(valueCoordination,{startX,startY});
    }
}



function stopDrag(ev) {
  $marquee.classList.add('hide');
    window.removeEventListener('pointerup', stopDrag);
  $screenshot.removeEventListener('pointermove', moveDrag);
  if (ev.target === $screenshot && marqueeRect.width && marqueeRect.height) {
    //rectangles.push(Object.assign({}, marqueeRect));
    rectangles[0] = marqueeRect;  //yukarıda her seferinde gelen box bilgilerini iptal edip tek bir box bilgisi yolladık. Bu sayede sadece 1 kara cizmeye izin verdik.
      redraw();
    const lastX = ev.layerX;
    const lastY = ev.layerY;


  }
}

function moveDrag(ev) {
    let x = ev.layerX;
    let y = ev.layerY;
    let width = startX - x;
    let height = startY - y;
    if (width < 0) {
        width *= -1;
        x -= width;
    }
      if (height < 0) {
        height *= -1;
        y -= height;
      }
  Object.assign(marqueeRect, { x, y, width, height });
  // which item's(key or value) coordination will get.
    if(document.getElementById('key').className.includes('active')){
        Object.assign(keyCoordination,{width, height});
    }
    else{
        Object.assign(valueCoordination,{width, height});
    }
  drawRect($marquee, marqueeRect);
}

function hitTest(x, y) {
    return rectangles.find(rect => (
    x >= rect.x &&
    y >= rect.y &&
    x <= rect.x + rect.width &&
    y <= rect.y + rect.height
  ));
}

function redraw() {
    boxes.innerHTML = '';
    rectangles.forEach((data) => {
    boxes.appendChild(drawRect(
        document.createElementNS("http://www.w3.org/2000/svg", 'rect'), data
    ));
  });
}


function drawRect(rect, data) {
    const { x, y, width, height } = data;
    rect.setAttributeNS(null, 'width', width);
    rect.setAttributeNS(null, 'height', height);
    rect.setAttributeNS(null, 'x', x);
    rect.setAttributeNS(null, 'y', y);
    return rect;
}


function loadCoordination(count,key,value){
  // loading coordinations to localstorage

    let newKey = {'id':0,'startX':key.startX,'startY':key.startY,'width':key.width,'height':key.height};
    let newValue = {'id':1,'startX':value.startX,'startY':value.startY,'width':value.width,'height':value.height};
    let kv = [];

    let currentData = JSON.parse(localStorage.getItem('documents'))[field];
    let cdName = currentData.name;

    kv.push(newKey, newValue);
    let data = [kv];


    if (localStorage.getItem(`${cdName}Coordination`) != null ){
        let oldData = JSON.parse(localStorage.getItem(`${cdName}Coordination`));
        if(oldData.length >= 1){
            //oldData.push(kv);
            oldData.splice(count,1,kv);


        }
        else{
           //oldData.push(data);
            oldData.splice(count,0,kv)

        }
        localStorage.setItem(`${cdName}Coordination`,JSON.stringify(oldData));
    }
    else{
        localStorage.setItem(`${cdName}Coordination`,JSON.stringify(data));
    }
}

const draw = document.getElementById('draw');
const value = document.getElementById('value');

const valueActive = (count) =>{
    draw.setAttribute('class', 'active');
    const key = document.getElementById('key');
    const value = document.getElementById('value');

    key.classList.remove('active');
    value.classList.add('active');

    let currentData = JSON.parse(localStorage.getItem('documents'))[field];
    let cdName = currentData.name;

    // create an array and object
    let arr = [];
    let choose2 = {
        x : 0,
        y : 0,
        width : 0,
        height : 0,
    }
    let lCoord = JSON.parse(localStorage.getItem(`${cdName}Coordination`))[count][1];
     // declaring coordinations
    let x = lCoord.startX;
    let y = lCoord.startY;
    let width = lCoord.width;
    let height = lCoord.height;
    // send coordinations
    Object.assign(choose2,{x,y,width,height});
    arr[0] = choose2;
    // create a rect under boxes element
        boxes.innerHTML = '';
        arr.forEach((data) => {
            boxes.appendChild(drawRect(
                document.createElementNS("http://www.w3.org/2000/svg", 'rect'), data
            ))});
}

const keyActive = (count) =>{
    row = count;
    draw.setAttribute('class', 'active');

    boxes.innerHTML = '';
     const key = document.getElementById('key');
    const value = document.getElementById('value');

    let currentData = JSON.parse(localStorage.getItem('documents'))[field];
    let cdName = currentData.name;
    key.classList.add('active');
    value.classList.remove('active');
    // create an array and object
    let arr = [];
    let choose = {
        x : 0,
        y : 0,
        width : 0,
        height : 0,
    }

    let iCoord = JSON.parse(localStorage.getItem(`${cdName}Coordination`))[count][0];
     // declaring coordinations
    let x = iCoord.startX;
    let y = iCoord.startY;
    let width = iCoord.width;
    let height = iCoord.height;
    // send coordinations
    Object.assign(choose,{x,y,width,height});
    arr[0] = choose;
    // create a rect under boxes element
        boxes.innerHTML = '';
        arr.forEach((data) => {
            boxes.appendChild(drawRect(
                document.createElementNS("http://www.w3.org/2000/svg", 'rect'), data
            ))});
}



const saveButton = ()=>{
    //console.log(JSON.parse(localStorage.getItem('coordination'))[count]);
    loadCoordination(row,keyCoordination,valueCoordination);
}



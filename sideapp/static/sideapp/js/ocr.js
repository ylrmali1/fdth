window.onload = function() {
    const $ = document.querySelector.bind(document);


    console.log(JSON.parse(localStorage.getItem('coordination'))[0].keyAndValue[0]);
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
    let photoUrl = datas[field-1].url;
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
        lastX: 0,
        lastY: 0,
        width: 0,
        height: 0,
    };

     const valueCoordination = {
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0,
        width: 0,
        height: 0,
    }

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
        // which item's(key or value) coordination will get.
        if(document.getElementById('key').className.includes('active')){
            Object.assign(keyCoordination,{lastX,lastY});
        }
        else{
            Object.assign(valueCoordination,{lastX,lastY});
        }
        console.log(lastX,lastY);
        console.log(rectangles);
        console.log(keyCoordination);
        if(document.getElementById('value').className.includes('active')){
            loadCoordination(keyCoordination,valueCoordination);
        }

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

    function loadCoordination(key,value){
      // loading coordinations to localstorage

        let newKey = {'id':0,'startX':key.startX,'startY':key.startY,'lastX':key.lastX,'lastY':key.lastY,'width':key.width,'height':key.height};
        let newValue = {'id':1,'startX':value.startX,'startY':value.startY,'lastX':value.lastX,'lastY':key.lastY,'width':value.width,'height':value.height};
        let keyAndValue = [];


        keyAndValue.push(newKey, newValue);
        let data = {keyAndValue};
        let data2 = [];
        data2.push(data);

        if(localStorage.getItem('coordination') == null){
            localStorage.setItem('coordination','[]');
        }

        let oldData = JSON.parse(localStorage.getItem('coordination'));
        oldData.push(data);

        localStorage.setItem('coordination',JSON.stringify(oldData));
        console.log(JSON.parse(localStorage.getItem('coordination')));

        }
}


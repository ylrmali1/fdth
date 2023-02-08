const label = document.getElementById("label");
const img = document.getElementById("img");
const imgName = document.getElementById("imgName");
const row = document.getElementById('row');
const closeBtn = document.getElementById("closeBtn");
const input = document.getElementById('upload');
const imageDisplay = document.getElementById('image-display');

input.onchange = evt =>{
   let [file] = [input.files];
   if(file){
      label.classList.toggle('hidden');
      closeBtn.classList.replace('hidden','show');
      imageDisplay.classList.remove('hidden');
      //img.classList.remove('hidden');
      //imgName.classList.remove('hidden');
      //img.setAttribute("src",URL.createObjectURL(file));
      //imgName.innerHTML = file.name;

      console.log(file);
      for (let i = 0; i <file.length; i++){
         const imgbox = `
         <div  class="col-md-6">
            <img id="img" class="show content-center" src=${URL.createObjectURL(file[i])} alt="">
            <p id="imgName" class="show content-center">${file[i].name}</p>
         </div>`
         row.innerHTML += imgbox;
      }
   }

}

label.addEventListener('dragover',(e) =>{
   e.preventDefault();
});

label.addEventListener('drop',(e) => {
   e.preventDefault();
   label.classList.toggle('hidden');
   closeBtn.classList.replace('hidden','show');
   img.classList.remove('hidden');
   imgName.classList.remove('hidden');
   for(let file of e.dataTransfer.files){
      img.setAttribute("src",URL.createObjectURL(file));
      imgName.innerHTML = file.name;
      console.log(file,file.name);
   }
});

closeBtn.addEventListener('click',()=>{
   label.classList.remove('hidden');
   closeBtn.classList.replace('show','hidden');
   //img.classList.replace('show','hidden');
   //imgName.classList.replace('show','hidden');
  while(row.lastElementChild){
      row.removeChild(row.lastElementChild);
   }

});


 input.addEventListener('change', (event) => {
      const image = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);

      reader.addEventListener('load',()=>{
         //localStorage.setItem('photo',reader.result);
         console.log('successful');



      });

    });


function uploadPhoto(e){
   for (let i = 0; i<input.files.length;i++){
         const image = input.files[i];
         const reader = new FileReader();
         reader.readAsDataURL(image);

         reader.addEventListener('load',()=>{
         console.log(image);
         let imageUrl = reader.result;
         let imageName = image.name;
         let newDoc = {"id":i,'name':imageName,'url':imageUrl};

         // if no data
             if(localStorage.getItem('uploads') === null){
                 localStorage.setItem('uploads','[]');
             }

             let oldDoc = JSON.parse(localStorage.getItem('uploads'));
             oldDoc.push(newDoc);

             // save old+new data
             localStorage.setItem('uploads',JSON.stringify(oldDoc));
         //localStorage.setItem(input.files[i].name,reader.result);
      });

   }

    alert('Yükleme başarılı.\nBelgeler hazır olunca önizleme sayfasına yönlendirileceksiniz...');
    window.location.href = '/preview';
}
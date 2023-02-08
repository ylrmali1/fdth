let photoName = document.getElementById('photoName');
let docName = document.getElementById('docName');
let inpt = document.getElementById('imgInput');

inpt.onchange = () =>{
   const [file] = inpt.files;

   photoName.innerText = file.name;
}




const uploadDocument = (event)=>{
   const image = inpt.files[0];
   if(image){
      const reader = new FileReader();
      reader.readAsDataURL(image);

      reader.addEventListener('load',()=>{
         let dc = JSON.parse(localStorage.getItem('documents'));
         let count;
         if(dc===null){
            count = 0;
         }else{
            count = dc.length;
         }

         let photoName = docName.value;
         let photoUrl = reader.result;
         let id = count;


         let newData = {"id":id,"name":`${photoName}`,"pTitle":`${image.name}`,"url":`${photoUrl}`};

         //if no data
         if(localStorage.getItem('documents') == null){
            localStorage.setItem('documents','[]');
         }

         let oldData = JSON.parse(localStorage.getItem('documents'));
         oldData.push(newData);

         //save old+new data
         localStorage.setItem('documents',JSON.stringify(oldData));

         //localStorage.setItem(input,reader.result);
         //console.log(JSON.parse(localStorage.getItem('documents')));
         //console.log('successful');

         alert('Yükleme işlemi başarılı\nBelgeler sayfasına yönlendiriliyorsunuz...');
         window.location.href = "/documents";
      });


   }
}
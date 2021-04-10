
import $ from 'jquery'
import axios from 'modules/axios'


window.addEventListener('turbolinks:load', () => {
  const uploader = document.querySelector('.uploader');
  uploader.addEventListener('change', (e) => {
    const file = uploader.files[0];
    // console.log(file);
    const reader = new FileReader();
    // console.log( reader);
    const result = reader.readAsDataURL(file);
    // console.log(result);
    // console.log( reader);
    reader.onload = () => {
      const image = reader.result;
      document.querySelector('.avatar').setAttribute('src', image);
    }
    // console.log( reader);
    
  });
});


document.addEventListener('turbolinks:load', ()=> {
  //   const imgBox = document.querySelector('.profileBox_imgBox');
  //   imgBox.addEventListener('click', ()=> {
  //     axios.get('/')
  //       .then(response => console.log(response));
  //   })
  // })
});  

console.log('ok');
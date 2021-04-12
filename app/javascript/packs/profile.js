

import axios from 'modules/axios'


document.addEventListener('turbolinks:load', () => {
  // avatorの取得
    axios.get('/profile')
      .then(response => {

      })
      .catch( e => {

      });


  // input要素を取得
  const uploader = document.querySelector('.uploader');
  // inputで値が変更された時にイベント発火
  uploader.addEventListener('change', ()=> {
    // 画像の切り替え
    const file = uploader.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = reader.result;
      document.querySelector('.avatar').setAttribute('src', image);
    }

    // postでデータを保存する。
    // axios.post(`/profile`,{
    //   profile: {avatar: content}
    // })

    // ↓ここをprofileからavatarに変更！！
    // axios.post(`/profile`)
    axios.post(`/avatar`)
    .then((res) => {
      console.log('ok');
    })
    .catch( e => console.log('out!'));
  })


});





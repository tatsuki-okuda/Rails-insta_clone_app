

import axios from 'modules/axios'


function base64Encode(arrayBuffer) {
  // arraybuffer で渡された imgData を base64 エンコードする
  const base64Encoded = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
  return base64Encoded;
}

function handleAvatarImg (res){
  let avatarSrc = res.data;
  let avatar = document.querySelector('.avatar')
  let s = Buffer.from(avatarSrc).toString('base64') ;
  console.log(avatarSrc)
  avatar.setAttribute('src', s);
}


document.addEventListener('turbolinks:load', () => {

  // axiosのrequest config　インスタンスを作って、レスポンスタイプを変更する。
  const axiosInstance = axios.create({
    responseType: 'arraybuffer',
    headers: {
      'Content-Type': 'image/png'
    }
  });

  // ページに入った時にavatorの取得
  // axiosInstance.get('/avatar')
  //   .then( res => {
  //     handleAvatarImg(res);
  //   })
  //   .catch( e => {
  //     console.log('読み込めてない')
  //   });

  // input要素を取得
  const uploader = document.querySelector('.uploader');
  // inputで値が変更された時にイベント発火
  uploader.addEventListener('change', ()=> {
    // inputに設定されたfileの情報を取得
    // 一つしかアップされないので0番目
    const file = uploader.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = reader.result;
      document.querySelector('.avatar').setAttribute('src', image);
    }

    // paramsの定義
    const params = new FormData();
    params.append('avatar', file);
 
    // 作成したインスタンスを元にして、リクエストを投げる  
    axiosInstance.put(`/avatar`,params)
    .then( res => {
      // handleAvatarImg(res);
      console.log('画像の読み込みに成功');
    })
    .catch( e => console.log('画像の読み込みに失敗'));

  })


});





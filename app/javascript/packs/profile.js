

import axios from 'modules/axios'


// const createIconBox = (img) => {
//   // jsからDOMにコンテンツを加えていく.
//   const iconBox = document.querySelector('.profileBox_icon');
//   if(img === undefined || img === null){
//     img = '/assets/Ellipse.png';
//   }
//   // avatar.setAttribute('src', img);
//   iconBox.append(
//     `<img class="object-fit avatar" src="/assets/${img}">`
//   )
// }



document.addEventListener('turbolinks:load', () => {

  const avatar = document.querySelector('.avatar');
  // axiosのrequest config　インスタンスを作って、レスポンスタイプを変更する。
  const axiosInstance = axios.create({
    responseType: 'json',
    headers: {
      'Content-Type': 'image/png'
    }
  });


  // アクセスした時
  // axiosInstance.get(`/avatar`)
  //   .then( res => {
  //     avatar.setAttribute('src', res.data.url);
  //     console.log('画像の読み込みに成功');
  //   })
  //   .catch( e => console.log('画像の読み込みに失敗'));
  

  // input要素を取得
  const uploader = document.querySelector('.uploader');

  // inputで値が変更された時にイベント発火
  uploader.addEventListener('change', ()=> {
    // inputに設定されたfileの情報を取得
    // 一つしかアップされないので0番目
    const file = uploader.files[0];
    
    // paramsの定義
    const params = new FormData();
    params.append('avatar', file);
 
    // 作成したインスタンスを元にして、リクエストを投げる 
    axiosInstance.put(`/avatar`,params)
      .then( res => {
        avatar.setAttribute('src', res.data.url);
        console.log('画像の読み込みに成功');
      })
      .catch( e => {
        alert('保存できませんでした。')
        console.log('画像の読み込みに失敗')
      });

  })

});





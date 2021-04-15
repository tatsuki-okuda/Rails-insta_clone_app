

import axios from 'modules/axios'


const setImg = img => {
  const avatar = document.querySelector('.avatar');
  if(img === undefined || img === null){
    img = `/assets/Ellipse.png`;
  }
  avatar.setAttribute('src', img);
}





document.addEventListener('turbolinks:load', () => {

  // 最初にデフォルトの画像でimgタグを作る
  (function(){
    const img = `/assets/Ellipse.png`;
    const iconBox = document.querySelector('.profileBox_icon');
    const imgTag = document.createElement("img");
    imgTag.classList = "object-fit avatar";
    imgTag.setAttribute('src', img);
    iconBox.appendChild(imgTag)
  })();


  // axiosのrequest config　インスタンスを作って、レスポンスタイプを変更する。
  const axiosInstance = axios.create({
    responseType: 'json',
    headers: {
      'Content-Type': 'image/png'
    }
  });


  // アクセスした時
  axiosInstance.get(`/avatar`)
    .then( res => {
      setImg(res.data.url);
      // avatar.setAttribute('src', res.data.url);
      console.log('画像の読み込みに成功');
    })
    .catch( e => console.log('画像の読み込みに失敗'));
  

  // inputで値が変更された時にイベント発火
  const uploader = document.querySelector('.uploader');
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
        setImg(res.data.url);
        // avatar.setAttribute('src', res.data.url);
        console.log('画像の読み込みに成功');
      })
      .catch( e => {
        alert('保存できませんでした。')
        console.log('画像の読み込みに失敗')
      });
  })

});





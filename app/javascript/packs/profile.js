

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
    // inputに設定されたfileの情報を取得
    // 一つしかアップされないので0番目
    const file = uploader.files[0];
    // 非同期でアップされたファイルを読み込むインスタンスを生成
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // reader.onload = () => {
    //   // result 属性にはファイルのデータを表す data: の URL が格納される
    //   const image = reader.result;
    //   document.querySelector('.avatar').setAttribute('src', image);
    // }

    // axiosのrequest config　インスタンスを作って、レスポンスタイプを変更する。
    const axiosInstance = axios.create({
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'image/png'
      }
    });

    // paramsの定義
    const params = new FormData();
    params.append('avatar', file);
 
    // 作成したインスタンスを元にして、リクエストを投げる  
    axiosInstance.put(`/avatar`,params)
    .then((res) => {
      console.log('ok');
    })
    .catch( e => console.log('out!'));

  })


});





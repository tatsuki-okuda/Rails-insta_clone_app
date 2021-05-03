

import axios from 'modules/axios'

// 画像のセット
const setImg = img => {
  const avatar = document.querySelector('.avatar');
  if(img === undefined || img === null){
    img = `/assets/Ellipse.png`;
  }
  avatar.setAttribute('src', img);
}

// フォローした時の操作
const followAction = function(followBtn,unFollowBtn){
  followBtn.classList.add('hidden');
  unFollowBtn.classList.remove('hidden');
}


document.addEventListener('turbolinks:load', () => {

  // ********************************** 
  // 最初にデフォルトの画像でimgタグを作る
  // ********************************** 
  (function(){
    const img = `/assets/Ellipse.png`;
    const iconBox = document.querySelector('.profileBox_icon');
    const imgTag = document.createElement("img");
    imgTag.classList = "object-fit avatar";
    imgTag.setAttribute('src', img);
    iconBox.appendChild(imgTag)
  })();

  // ********************************** 
  // axiosのrequest configインスタンスを作って、レスポンスタイプを変更する。
  // ********************************** 
  const axiosInstance = axios.create({
    responseType: 'json',
    headers: {
      'Content-Type': 'image/png'
    }
  });


  // ********************************** 
  // アクセスした時
  // ********************************** 
  axiosInstance.get(`/avatar`)
    .then( res => {
      setImg(res.data.url);
      // avatar.setAttribute('src', res.data.url);
      // console.log('画像の読み込みに成功');
    })
    .catch( e => console.log('画像の読み込みに失敗'));
  

  // ********************************** 
  // 画像変更
  // ********************************** 
  // inputで値が変更された時にイベント発火
  const uploader = document.querySelector('.uploader');
  if(uploader){
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
          // console.log('画像の読み込みに成功');
        })
        .catch( e => {
          alert('保存できませんでした。')
          console.log('画像の読み込みに失敗')
        });
    })
  }


  // ********************************** 
  // フォロー
  // ********************************** 
  const followBtnBox = document.querySelector('.profileBox_follow-btnBox');
  const userId = followBtnBox.dataset.userId;
  const followBtn = document.querySelector('.profileBox_follow-btn');
  const unFollowBtn = document.querySelector('.profileBox_unfollow-btn');

  // アクセスした時
  axios.get(`/profiles/${userId}/follows`)
    .then(res => {
      // console.log('ok');
      if (res.data.status === 'follow'){
        followAction(followBtn,unFollowBtn);
      } 
    })
    .catch( e => console.log('フォロー確認読み込みに失敗'));


  // フォローをクリックした時。
  followBtn.addEventListener('click', function(){
    axios.post(`/profiles/${userId}/follows`)
    .then(res => {
      // console.log('ok');
      if (res.data.status === 'follow'){
        followAction(followBtn,unFollowBtn);
      }
    })
    .catch( e => console.log('フォローエラー'));
  });

  // アンフォロー
  unFollowBtn.addEventListener('click', function(){
    axios.post(`/profiles/${userId}/unfollows`)
    .then(res => {
      // console.log('ok');
      if (res.data.status === 'unfollow'){
        followBtn.classList.remove('hidden');
        unFollowBtn.classList.add('hidden');
      }
    })
    .catch( e => console.log('アンフォローエラー'));
  });

});





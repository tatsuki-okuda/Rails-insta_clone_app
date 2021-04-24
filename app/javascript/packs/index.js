import axios from 'modules/axios'
import {
  likeCheckStatus,
	likeDo,
	likeDone
} from 'modules/like'



document.addEventListener('turbolinks:load', () => {
  // *****************************
  // swiper
  // *****************************
  var mySwiper = new Swiper('.swiper-container', {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  // *****************************
  // いいねの初期状態を確認する
  // *****************************
  // 表示されている全投稿を取得する
  const cardIds = document.querySelectorAll('.card');
  // 各投稿に紐づくいいねの状態をリクエストする。
  cardIds.forEach(cardId => {
    // 各カードのデータ属性の値を取得
    const Id = cardId.dataset.cardId
    // 対象となるdata属性の子要素をクラス名から取得する
    // showページでquerySelectorがnullとエラーが出たのでIdがfalseの時に処理をしないようにする
    if(Id){
      const likeActive = document.querySelector(`[data-card-id="${Id}"]`).querySelector('.like-active')
      const likeNonActive = document.querySelector(`[data-card-id="${Id}"]`).querySelector('.like-nonActive')
      // いいねの初期状態のセット
      likeCheckStatus(Id,likeActive,likeNonActive)
      // クリックでいいねできる。
      likeNonActive.addEventListener('click',function(){
        likeDo(Id,likeActive,likeNonActive);
      });
      // クリックイベントでいいねを解除
      likeActive.addEventListener('click',function(){
        likeDone(Id,likeActive,likeNonActive);
      });
    }
  });

})


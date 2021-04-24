import axios from 'modules/axios'
// import 'modules/like'


// *****************************
// 初期のいいねの状態を振り分ける
// *****************************
function likeCheck(Id,hasLiked){
  // 対象となるdata属性の子要素をクラス名から取得する
  const likeActive = document.querySelector(`[data-card-id="${Id}"]`).querySelector('.like-active')
  const likeNonActive = document.querySelector(`[data-card-id="${Id}"]`).querySelector('.like-nonActive')
  if(hasLiked){
    likeActive.classList.remove('hidden')
    likeNonActive.classList.add('hidden')
  } else{
    likeNonActive.classList.remove('hidden')
  }
}


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
  // 表示されている全投稿のIDを取得する
  const cardIds = document.querySelectorAll('.card');
  // 各投稿に紐づくいいねの状態をリクエストする。
  cardIds.forEach(cardId => {
    const Id = cardId.dataset.cardId
    axios.get(`/cards/${Id}/like`)
    .then((response) => {
      // jsonデータ取得
      const hasLiked = response.data.hasLiked;
      likeCheck(Id,hasLiked);
    })
    .catch((e) => {
      console.log(e)
    })
  });


  // *****************************
  
  // *****************************


})


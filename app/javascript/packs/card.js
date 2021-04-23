import axios from 'modules/axios'


// *****************************
// 初期状態のいいねを振り分ける
// *****************************
function likeCheck(hasLiked){
  const likeActive = document.querySelector('.like-active')
  const likeNonActive = document.querySelector('.like-nonActive')
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
	// 読み込み時にいいねの状態を確認する
	// *****************************
  const cardId = document.querySelector('.card').dataset.cardId
	axios.get(`/cards/${cardId}/like`)
	.then((response) => {
		// console.log('ok')
		const hasLiked = response.data.hasLiked;
		likeCheck(hasLiked);
	})
	.catch((e) => {
		console.log(e)
	})

})
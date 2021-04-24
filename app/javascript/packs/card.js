import axios from 'modules/axios'


// *****************************
// 初期状態のいいねを振り分ける
// *****************************
function likeCheck(hasLiked,likeActive,likeNonActive){
  if(hasLiked){
    likeActive.classList.remove('hidden')
    likeNonActive.classList.add('hidden')
  } else{
    likeNonActive.classList.remove('hidden')
  }
}
// *****************************
// クリックでいいねの状態を変更する
// *****************************
function likeClassListToggle(likeActive,likeNonActive){
	likeActive.classList.toggle('hidden');
	likeNonActive.classList.toggle('hidden');
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
	// いいねに必要な要素を取得
	// *****************************
	const likeActive = document.querySelector('.like-active');
  const likeNonActive = document.querySelector('.like-nonActive');
  const cardId = document.querySelector('.card').dataset.cardId;

	// *****************************
	// 読み込み時にいいねの状態を確認する
	// *****************************
	axios.get(`/cards/${cardId}/like`)
	.then((response) => {
		const hasLiked = response.data.hasLiked;
		likeCheck(hasLiked,likeActive,likeNonActive);
	})
	.catch((e) => {
		console.log(e)
	})

	// *****************************
  // クリックイベントでいいねをする
  // *****************************
	likeNonActive.addEventListener('click',function(){
		axios.post(`/cards/${cardId}/like`)
		.then((response) => {
			if( response.data.status === 'ok'){
				likeClassListToggle(likeActive,likeNonActive);
			}
		})
		.catch((e) => {
			console.log(e)
		})
	});

	// *****************************
  // クリックイベントでいいねを解除
  // *****************************
	likeActive.addEventListener('click',function(){
		axios.delete(`/cards/${cardId}/like`)
		.then((response) => {
			if( response.data.status === 'ok'){
				likeClassListToggle(likeActive,likeNonActive);
			}
		})
		.catch((e) => {
			console.log(e)
		})
	});

})
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
	// いいねに必要な要素を取得
	// *****************************
	const likeActive = document.querySelector('.like-active');
  const likeNonActive = document.querySelector('.like-nonActive');
  const cardId = document.querySelector('.card').dataset.cardId;
	// *****************************
	// 読み込み時にいいねの状態を確認する
	// *****************************
	likeCheckStatus(cardId,likeActive,likeNonActive);
	// *****************************
  // クリックイベントでいいねをする
  // *****************************
	likeNonActive.addEventListener('click',function(){
		likeDo(cardId,likeActive,likeNonActive);
	});
	// *****************************
  // クリックイベントでいいねを解除
  // *****************************
	likeActive.addEventListener('click',function(){
		likeDone(cardId,likeActive,likeNonActive);
	});




})



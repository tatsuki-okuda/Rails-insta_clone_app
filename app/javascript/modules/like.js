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


// *****************************
// 読み込み時にいいねの状態を確認する
// *****************************
function likeCheckStatus(Id,likeActive,likeNonActive){
  axios.get(`/cards/${Id}/like`)
  .then((response) => {
    const hasLiked = response.data.hasLiked;
    likeCheck(hasLiked,likeActive,likeNonActive);
  })
  .catch((e) => {
    console.log(e)
  })
}



// *****************************
// axiosでpostリクエストを送って、いいねの状態を変更する
// *****************************
function likeDo(Id,likeActive,likeNonActive){
	axios.post(`/cards/${Id}/like`)
		.then((response) => {
			if( response.data.status === 'ok'){
				likeClassListToggle(likeActive,likeNonActive);
			}
		})
		.catch((e) => {
			console.log(e)
		})
}

// *****************************
// axiosでdeleteリクエストを送って、いいねの状態を変更する
// *****************************
function likeDone(Id,likeActive,likeNonActive){
	axios.delete(`/cards/${Id}/like`)
		.then((response) => {
			if( response.data.status === 'ok'){
				likeClassListToggle(likeActive,likeNonActive);
			}
		})
		.catch((e) => {
			console.log(e)
		})
}



export {
  likeCheckStatus,
  likeDo,
  likeDone
}
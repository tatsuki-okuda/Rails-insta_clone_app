import axios from 'modules/axios'



function newCommentAdd(newComment){
  // ulの取得
  const commentBox = document.querySelector('.comment_box');
  // リストタグを生成
  const listTag = document.createElement("li");
  // *************************************************************
  // leftboxを生成
  const leftBox = document.createElement("div");
  leftBox.classList = "comment_box_leftIcon";
  // アバター画像
  const avatar = document.createElement("img");
  avatar.setAttribute('src', newComment.user.avatar_url);
  leftBox.appendChild(avatar);
  // *************************************************************
  // roightboxを生成
  const rightBox = document.createElement("div");
  rightBox.classList = "comment_box_rightText";
  // プrpフィールテキスト要素を生成
  const profileText = document.createElement("p");
  profileText.classList = "comment_box_rightText_name";
  profileText.innerText = newComment.user.username
  // コンテントテキスト要素を生成
  const contentText = document.createElement("p");
  contentText.classList = "comment_box_rightText_text";
  contentText.innerText = newComment.content
  // rightboxに子要素を加える
  rightBox.appendChild(profileText);
  rightBox.appendChild(contentText);
  // *************************************************************
  // liに子要素を加える
  listTag.appendChild(leftBox);
  listTag.appendChild(rightBox);
  // *************************************************************
  // ulにliを加える
  commentBox.appendChild(listTag);
}


document.addEventListener('turbolinks:load', () => {
  const cardId = document.querySelector('.comment').dataset.cardId;
  // const userId = document.querySelector('.comment').dataset.userId;
  const commentBtn  = document.querySelector('.comment_input_btn');


  axios.get(`/cards/${cardId}/comments/json`)
  .then((response) => {
    const comments = response.data
    if(comments){
      comments.forEach(comment => {
        newCommentAdd(comment);
      });
    }
  })

  // **********************
  // post
  // **********************
  commentBtn.addEventListener('click', function(){
    const commentValue = document.querySelector('.commentValue');
    const value = commentValue.value;
    if(value){
      axios.post(`/cards/${cardId}/comments`,{
        comment: {content: value, card_id: cardId}
      })
      .then((response) => {
        const newComment = response.data
        newCommentAdd(newComment);
        commentValue.value = '';
        console.log('ok');
      })
      .catch((e) => {
        console.log(e)
      })
    } else{
      window.alert('コメントを入力してください！');
    }
  });

});
import axios from "axios";


const domCreate = function(user){
  const dom = `
    <li>
      <div class="usersList_avatar">
        <a href="" class="card_header_img"><img class="object-fit" src="${user.avatar_url}"></a>
      </div>
      <div class="usersList_userContent">
        <p>${user.username}</p>
        <p>Last seen 3 hours ago</p>
      </div>
      <div class="profileBox">
        <div class="profileBox_follow-btnBox" data-user-id="${user.id}" >
          <div class="profileBox_follow-btn">Follow</div>
          <div class="profileBox_unfollow-btn hidden">UnFollow</div>
        </div>
      </div>
    </li>
  `
  return dom;
}


const UsersListCreate = function(users ,date){
  users.forEach( user => {
    date.insertAdjacentHTML('afterbegin',domCreate(user));
  });
}


// ********************************
// axiosで引数で受け取ったurlに対してuserの取得を行うクラス
// ********************************
class getUsers {
  constructor(url){
    this.url = url;
    this._init();
  }
  _init(){
    const date = document.querySelector('ul');
    const userId = date.dataset.userId;
    axios.get(`/profiles/${userId}/${this.url}`)
      .then( res => {
        console.log('ok');
        const users = res.data;
        UsersListCreate(users, date);
      })
      .catch(e => console.log('error'))
  }
}



export {
  getUsers
}

import {
  getUsers
} from 'modules/followUsers'


document.addEventListener('turbolinks:load', () => {
  const url = `followingapi`
  const followingUsers = new getUsers(url);
});
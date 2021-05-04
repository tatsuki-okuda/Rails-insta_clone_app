import {
  getUsers
} from 'modules/followUsers'


document.addEventListener('turbolinks:load', () => {
  const url = `followerapi`
  const followerUsers = new getUsers(url);
});
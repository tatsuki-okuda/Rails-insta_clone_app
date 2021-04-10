
import axios from 'axios'
// railsでのトークン発行
// https://www.inodev.jp/entry/2019/12/03/234210
import { csrfToken } from 'rails-ujs'

// https://github.com/tatsuki-okuda/axios#config-defaults
axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()


export default axios
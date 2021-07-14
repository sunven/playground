import './assets/css/index.css'
import './assets/css/home.less'
import logo from './assets/images/logo.png'
import axios from 'axios'
import createApp from './app'
createApp()

import { str } from './a'
console.log(str + 'a')

axios.get('/api/info').then(console.log)

const image = new Image()
image.src = logo

document.querySelector('#app').append(image)

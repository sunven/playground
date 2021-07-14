import './assets/css/index.css'
import './assets/css/home.less'
import logo from './assets/images/logo.png'

import { str } from './a'
console.log(str)

const image = new Image()
image.src = logo

document.querySelector('#app').append(image)

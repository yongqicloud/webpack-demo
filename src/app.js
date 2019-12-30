// import '@babel/polyfill'
import Vue from 'vue'
import Home from './components/Home.vue'
import './components/reset.styl'
import './components/common.scss'

import message from './components/index01.js'
message.show() 

new Vue({
  el:'#root',
  render(h) {
    return h(Home)
  }
})

import _ from 'lodash'
let arr = ['a', 'b', 'c', 'd']

let arr2 = _.chunk(arr, 3)
console.log(arr2)


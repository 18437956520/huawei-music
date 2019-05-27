import './icons.js'

const $ = selector =>document.querySelector(selector)
const $$ = selector => document.querySelectorAll(selector)

class Player{
    constructor(node){
        this.root = typeof node === 'string' ? $(node) : node  
    }

    bind(){

    }
}


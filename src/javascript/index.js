import './icons.js'

const $ = selector =>document.querySelector(selector)
const $$ = selector => document.querySelectorAll(selector)

class Player{
    constructor(node){
        this.root = typeof node === 'string' ? $(node) : node  
        this.songList = []
        this.currentIndex = 0
        this.start()
        //https://yyyh.info/huawei-music-list/music-list.json
    }

    start(){
        fetch('https://yyyh.info/huawei-music-list/music-list.json')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.songList = data
            })
    }

    bind(){

    }
}

new Player('#player')


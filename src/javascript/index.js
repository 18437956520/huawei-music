import './icons.js'
import Swiper from './swiper.js'

const $ = selector => document.querySelector(selector)
const $$ = selector => document.querySelectorAll(selector)

// function $(selector){
//     return document.querySelector(selector)
// }

class Player {
    constructor(node) {
        this.root = typeof node === 'string' ? $(node) : node
        this.$ = selector => this.root.querySelector(selector)
        this.$$ = selector => this.root.querySelectorAll(selector)
        this.songList = []
        this.currentIndex = 0
        this.audio = new Audio()
        this.start()
        this.bind()
        //https://yyyh.info/huawei-music-list/music-list.json
    }

    start() {
        fetch('https://yyyh.info/huawei-music-list/music-list.json')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.songList = data
                this.audio.src = this.songList[this.currentIndex].url
            })
    }

    bind() {
        let self = this
        this.$('.btn-play').onclick = function () {
            if (this.classList.contains('playing')) {
                self.audio.pause()
                this.classList.remove('playing')
                this.classList.add('pause')
                this.querySelector('use').setAttribute('xlink:href', '#icon-play')
            } else if (this.classList.contains('pause')) {
                self.audio.play()
                this.classList.remove('pause')
                this.classList.add('playing')
                this.querySelector('use').setAttribute('xlink:href', '#icon-pause')
            }
        }

        this.$('.btn-pre').onclick = function () {
            self.playPrevSong()
            self.$('.btn-play').classList.remove('pause')
            self.$('.btn-play').classList.add('playing')
            self.$('.btn-play').querySelector('use').setAttribute('xlink:href', '#icon-pause')
        }
        this.$('.btn-next').onclick = function () {
            self.playNextSong()
            self.$('.btn-play').classList.remove('pause')
            self.$('.btn-play').classList.add('playing')
            self.$('.btn-play').querySelector('use').setAttribute('xlink:href', '#icon-pause')
        }

        let swiper = new Swiper(this.$('.panels'))
        swiper.on('swipLeft', function() {
            this.classList.remove('panel1')
            this.classList.add('panel2')
        })
        swiper.on('swipRight', function() {
            this.classList.remove('panel2')
            this.classList.add('panel1')
        })
    }

    playPrevSong() {
        this.currentIndex = (this.songList.length + this.currentIndex - 1) % this.songList.length
        this.audio.src = this.songList[this.currentIndex].url
        console.log(this.audio)
        this.audio.play()
    }
    playNextSong() {
        this.currentIndex = (this.songList.length + this.currentIndex + 1) % this.songList.length
        this.audio.src = this.songList[this.currentIndex].url
        console.log(this.audio)
        this.audio.play()
    }
}

new Player('#player')
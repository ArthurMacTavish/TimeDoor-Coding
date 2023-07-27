import Phaser from 'phaser'
export default class StartScene extends
Phaser.Scene {
    constructor(){
        super('start-scene')
    }
    init(data){
        this.replayButton = undefined
        this.score = data.score
    }
    preload(){
        this.load.image('background', 'img/Background.png')
        this.load.image('GameTitle', 'img/GameTitle.png')
        this.load.image('start-button', 'img/Start.png')
    }
    create(){
        this.add.image(240, 360, 'background')
        this.add.image(240, 240, 'GameTitle')

        this.replayButton = this.add.image(240, 440, 'start-button').setInteractive().setScale(0.5)

        this.replayButton.once('pointerup', () => {
            this.scene.start('Math-Bomb-Scene')
        })
    }
}
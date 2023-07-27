import Phaser from 'phaser'
export default class GameOverScene extends
Phaser.Scene {
    constructor(){
        super('gameover-scene')
    }
    init(data){
        this.replayButton = undefined
        this.score = data.ScoreCounter
    }
    preload(){
        this.load.image('background', 'img/Background.png')
        this.load.image('gameover', 'img/GameOver.png')
        this.load.image('replay-button', 'img/Replay.png')

        this.load.audio('BGM', 'aud/GameOver.mp3')
    }
    create(){
        // BTD5 Music
        this.BGM = this.sound.add('BGM')
        const BGMConfig = {
            loop: false,
            volume: 0.5,
        }

        this.BGM.play(BGMConfig)

        this.add.image(240, 320, 'background')
        this.add.image(240, 200, 'gameover')
        this.add.text(160, 300, 'Score: ' + this.score, {
            // @ts-ignore
            fontSize: '32px', 'fill': '#FFF', fontFamily: 'Comic Sans MS'
        })

        this.replayButton = this.add.image(240, 400, 'replay-button').setInteractive().setScale(0.5)

        this.replayButton.once('pointerup', () => {
            this.scene.start('Math-Bomb-Scene')
        })
    }
}
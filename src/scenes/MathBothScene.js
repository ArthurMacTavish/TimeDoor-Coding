import Phaser from 'phaser'
export default class MathBombScene extends
    Phaser.Scene {
    constructor() {
        super('Math-Bomb-Scene')
    }
    init() {
        this.midPointHeight = this.scale.height / 2
        this.midPointWidth = this.scale.width / 2

        this.Bomb = undefined
        this.Player = undefined

        // The Pure Torments of Keypads (Thanks ChatGPT 3.5!)
        this.Keypad1 = undefined
        this.Keypad2 = undefined
        this.Keypad3 = undefined
        this.Keypad4 = undefined
        this.Keypad5 = undefined
        this.Keypad6 = undefined
        this.Keypad7 = undefined
        this.Keypad8 = undefined
        this.Keypad9 = undefined
        this.Keypad0 = undefined
        this.KeypadOk = undefined
        this.KeypadDel = undefined
    }
    preload() {
        this.load.image('Background', 'img/Background.png')
        this.load.image('Player', 'img/PlayerWerewolf.png')

        this.load.spritesheet('Keypad', 'img/KeyPad.png', {
            frameWidth: 131,
            frameHeight: 71.25
        })

        this.load.spritesheet('Bomb', 'img/BombPulse.png', {
            frameWidth: 750,
            frameHeight: 750
        })

        this.load.audio('BGMGame', 'aud/Music.mp3')
    }
    create() {
        // Background
        this.add.image(this.midPointWidth, this.midPointHeight, 'Background')

        // Bomb Animations
        this.Bomb = this.add.sprite(this.midPointWidth + (this.midPointWidth / 2), this.midPointHeight - 180, 'Bomb').setScale(0.15)
        this.bombAnimation()
        this.Bomb.anims.play('bomb-beating', true)

        // GOOD HOWLIN' NIGHT, MORDEX!
        this.Player = this.add.sprite(this.midPointWidth - (this.midPointWidth / 2), this.midPointHeight - 180, 'Player').setScale(0.15)

        this.createKeyPad()
    }
    update() {

    }
    bombAnimation() {
        this.anims.create({
            key: 'bomb-beating',
            frames: this.anims.generateFrameNumbers('Bomb', {
                start: 0,
                end: 14
            }),
            frameRate: 15,
            repeat: -1
        })
    }
    createKeyPad() {
        const startPosY = this.midPointHeight + 90
        const scaleFactor = 0.9
        const widthDiff = 131 * scaleFactor
        const heightDiff = 71.25 * scaleFactor

        //Centre
        this.Keypad2 = this.add.image(
            this.midPointWidth,
            startPosY,
            'Keypad',
            1
        )
        .setInteractive()
        .setData('value', 2)
        .setScale(scaleFactor)

        this.Keypad5 = this.add.image(
            this.midPointWidth,
            this.Keypad2.y + heightDiff,
            'Keypad', 4
        )
        .setInteractive()
        .setData('value', 5)
        .setScale(scaleFactor)

        this.Keypad8 = this.add.image(
            this.midPointWidth,
            this.Keypad5.y + heightDiff,
            'Keypad', 7
        )
        .setInteractive()
        .setData('value', 8)
        .setScale(scaleFactor)

        this.Keypad0 = this.add.image(
            this.midPointWidth,
            this.Keypad8.y + heightDiff,
            'Keypad', 10
        )
        .setInteractive()
        .setData('value', 0)
        .setScale(scaleFactor)

        // Left
        this.Keypad1 = this.add.image(
            this.Keypad2.x - widthDiff,
            this.Keypad2.y,
            'Keypad',
            0
        )
        .setInteractive()
        .setData('value', 1)
        .setScale(scaleFactor)

        this.Keypad4 = this.add.image(
            this.Keypad5.x - widthDiff,
            this.Keypad5.y,
            'Keypad', 3
        )
        .setInteractive()
        .setData('value', 4)
        .setScale(scaleFactor)

        this.Keypad7 = this.add.image(
            this.Keypad8.x - widthDiff,
            this.Keypad8.y,
            'Keypad', 6
        )
        .setInteractive()
        .setData('value', 7)
        .setScale(scaleFactor)

        this.KeypadDel = this.add.image(
            this.Keypad0.x - widthDiff,
            this.Keypad0.y,
            'Keypad', 9
        )
        .setInteractive()
        .setData('value', 'del')
        .setScale(scaleFactor)
    }
}
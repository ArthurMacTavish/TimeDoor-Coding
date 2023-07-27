import Phaser from 'phaser'
export default class MathBombScene extends
    Phaser.Scene {
    constructor() {
        super('Math-Bomb-Scene')
    }
    init() {
        // As Crucial as Werewolves Blood.
        this.midPointHeight = this.scale.height / 2
        this.midPointWidth = this.scale.width / 2

        this.Bomb = undefined
        this.Player = undefined
        this.ScoreCounter = 0 // Supposed to be Hidden
        this.Timer = 30
        this.TimerText = undefined
        this.ModulusCounter = 0

        // Bring that Beat Back
        this.BGM = undefined

        // Health Metre Mechanism
        this.HealthMetre = undefined
        this.HealthLevel = 3

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

        // Pure Math Mechanism
        this.NumberArray = []
        this.Number = 0
        this.AnswerText = undefined
        this.Question = []
        this.QuestionText = undefined

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
        this.load.spritesheet('Health', 'img/HealthMetre.png', {
            frameWidth: 375,
            frameHeight: 1090
        })

        this.load.audio('BGMGame', 'aud/Music.mp3')
    }
    create() {
        // BTD5 Music
        this.BGM = this.sound.add('BGMGame')
        const BGMConfig = {
            loop: true,
            volume: 0.5,
        }

        this.BGM.play(BGMConfig)

        // Background
        this.add.image(
            this.midPointWidth,
            this.midPointHeight,
            'Background'
        )

        // Bomb Animations
        this.Bomb = this.add.sprite(
            this.midPointWidth + (this.midPointWidth / 2),
            this.midPointHeight - 180,
            'Bomb', 0
        )
            .setScale(0.15)

        this.bombAnimation()

        // GOOD HOWLIN' NIGHT, MORDEX!
        this.Player = this.add.sprite(
            this.midPointWidth - (this.midPointWidth / 2),
            this.midPointHeight - 180,
            'Player'
        )
            .setScale(0.15)

        // Create Keypad
        this.createKeyPad()

        // Create Health Metre
        this.HealthMetre = this.add.sprite(
            this.Player.x - 90,
            this.Player.y,
            'Health', 0
        )
            .setScale(0.1)

        // You Ask, We Answer. That's How It Works. Btw, this is Text.
        const TextConfig = {
            fontSize: '32px',
            fill: '#FFF',
            fontFamily: 'Comic Sans MS'
        }
        this.QuestionText = this.add.text(
            this.midPointWidth,
            this.midPointHeight - 100,
            '0',
            TextConfig
        )
        this.AnswerText = this.add.text(
            this.midPointWidth,
            this.midPointHeight - 35,
            '0',
            TextConfig
        )
        this.TimerText = this.add.text(
            this.midPointWidth - 15,
            this.Player.y-20,
            "30",
            TextConfig
        )

        // Countdown Mechanism
        this.Countdown = this.time.addEvent({
            delay: 1000,
            callback: this.timerMechanism,
            callbackScope: this,
            loop: true
        })

        // Enables Keypad Input and Generate Questions
        this.input.on('gameobjectdown', this.actionKeyPad, this)
        this.questionGenerator()
    }
    update() {
        this.updateHealthMetre()
        this.delayUpdater()
        this.silverSword()
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

        this.Bomb.anims.play('bomb-beating', true)
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
            'Keypad', 1
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

        // Right
        this.Keypad3 = this.add.image(
            this.Keypad2.x + widthDiff,
            this.Keypad2.y,
            'Keypad',
            2
        )
            .setInteractive()
            .setData('value', 3)
            .setScale(scaleFactor)

        this.Keypad6 = this.add.image(
            this.Keypad5.x + widthDiff,
            this.Keypad5.y,
            'Keypad', 5
        )
            .setInteractive()
            .setData('value', 6)
            .setScale(scaleFactor)

        this.Keypad9 = this.add.image(
            this.Keypad8.x + widthDiff,
            this.Keypad8.y,
            'Keypad', 8
        )
            .setInteractive()
            .setData('value', 9)
            .setScale(scaleFactor)

        this.KeypadOk = this.add.image(
            this.Keypad0.x + widthDiff,
            this.Keypad0.y,
            'Keypad', 11
        )
            .setInteractive()
            .setData('value', 'ok')
            .setScale(scaleFactor)
    }
    updateHealthMetre() { //Metre cause I'm British
        if (this.HealthLevel == 2) {
            this.HealthMetre.setFrame(1)
            this.Player.setTint(0xff8080)
        } else if (this.HealthLevel == 1) {
            this.HealthMetre.setFrame(2)
            this.Player.setTint(0xff0000)
        }
    }
    actionKeyPad(pointer, object, event) {
        let Value = object.getData('value')

        // Translate Input to Value
        if (isNaN(Value)) {
            if (Value == 'del') {
                this.NumberArray.pop()
                if (this.NumberArray.length < 1) {
                    this.NumberArray[0] = 0
                }
            }

            if (Value == 'ok') {
                this.checkAnswer()
                this.NumberArray = []
                this.NumberArray[0] = 0
            }
        } else if (this.NumberArray.length == 1 && this.NumberArray[0] == 0) {
            this.NumberArray[0] = Value
        } else {
            if (this.NumberArray.length < 10) {
                this.NumberArray.push(Value)
            }
        }

        this.Number = parseInt(this.NumberArray.join(''))

        // Update Number
        // @ts-ignore
        this.AnswerText.setText(this.Number)
        const textHalfWidth = this.AnswerText.width / 2
        this.AnswerText.setX(this.midPointWidth - textHalfWidth)
        event.stopPropagation()
    }
    questionGenerator() {
        // Question Generator Mechanism
        const possibleOperator = ["+", "-", "x", ":"]

        let operator = possibleOperator[Phaser.Math.Between(0, 3)]

        if (operator == "x") {
            let numberA = Phaser.Math.Between(0, 10)
            let numberB = Phaser.Math.Between(0, 10)

            this.Question[0] = `${numberA} x ${numberB}`
            this.Question[1] = numberA * numberB
        } else {
            let numberA = Phaser.Math.Between(0, 50)
            let numberB = Phaser.Math.Between(0, 50)

            if (operator == "+") {
                this.Question[0] = `${numberA} + ${numberB}`
                this.Question[1] = numberA + numberB
            }
            if (operator == "-") {
                if (numberB > numberA) {
                    this.Question[0] = `${numberB} - ${numberA}`
                    this.Question[1] = numberB - numberA
                } else {
                    this.Question[0] = `${numberA} - ${numberB}`
                    this.Question[1] = numberA - numberB
                }
            }
            if (operator == ':') {
                do {
                    numberA = Phaser.Math.Between(0, 50)
                    numberB = Phaser.Math.Between(0, 50)
                } while (!Number.isInteger(numberA / numberB))
                this.Question[0] = `${numberA} : ${numberB}`
                this.Question[1] = numberA / numberB
            }
        }

        // Generate Question Text
        this.QuestionText.setText(this.Question[0])
        const textHalfWidth = this.QuestionText.width / 2
        this.QuestionText.setX(this.midPointWidth - textHalfWidth)
    }
    checkAnswer() {
        if (this.Number == this.Question[1]) {
            this.ScoreCounter += 1
            this.ModulusCounter += 1
            this.Timer = 30
            // @ts-ignore
            this.TimerText.setText(this.Timer)
        } else {
            this.HealthLevel -= 1
        }

        this.questionGenerator()
    }
    delayUpdater() { // Thanks ChatGPT 3.5 for Help!
        if (this.ModulusCounter % 5 === 0 && this.ModulusCounter > 0) {
            this.ModulusCounter = 0
            // @ts-ignore
            this.Countdown.delay = this.Countdown.delay * (1 - 0.5) // Speed up by 50%
        }
    }
    timerMechanism() {
        this.Timer--
        // @ts-ignore
        this.TimerText.setText(this.Timer)

        if (this.Timer < 1) {
            this.HealthLevel--
            // @ts-ignore
            this.Countdown.delay = 1000
            this.Timer = 30
        }
    }
    silverSword() { // Werewolves hate this...
        if (this.HealthLevel < 1) {
            this.sound.stopAll()
            this.scene.start('gameover-scene',
                {
                    ScoreCounter: this.ScoreCounter
                })
        }
    }
}
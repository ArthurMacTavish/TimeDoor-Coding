import Phaser from 'phaser'

import StartScene from './scenes/StartScene'
import MathBombScene from './scenes/MathBothScene'
import GameOverScene from './scenes/GameOverScene'

const config = {
	type: Phaser.AUTO,
	width: 480,
	height: 640,
	physics: {
		default: 'arcade',
		arcade: {
		}
	},
	scene: [StartScene, MathBombScene, GameOverScene],
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	}
}

export default new Phaser.Game(config)
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        //load menu pertained audio 
        this.load.audio('transition', './assets/menu_transition.mp3')


    }


    //settings 
    create() {
        let titleConfig = {
            fontFamily: 'Brush Script MT',
            fontSize: '65px',
            backgroundColor: '#4CAF50',
            color: '#0077BE',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        let directionsConfig = {
            fontFamily: 'Impact',
            fontSize: '28px',
            backgroundColor: 'rgba(76, 175, 80, 0.5)',
            color: 'Red',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //overall background color
        this.cameras.main.setBackgroundColor('#4CAF50')

        //menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 100, 'INSULT MASTER', titleConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 71, 'Use 1, 2, 3, 4 keys to choose attack!!', directionsConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding + 130, 'Press SPACEBAR to begin', directionsConfig).setOrigin(0.5)



        //define keyboard input regarding spacebar
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('transition');
            this.scene.start('playScene');    
        }
    }

}
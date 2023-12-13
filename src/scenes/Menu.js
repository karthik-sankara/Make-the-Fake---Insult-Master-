class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        //load menu pertained audio 
        this.load.audio('transition', './assets/menu_transition.mp3')

    }


    
    create() {
        //text settings 
        let titleConfig = {
            fontFamily: 'Brush Script MT',
            fontSize: '45px',
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
            fontSize: '20px',
            backgroundColor: 'rgba(76, 175, 80, 0.5)',
            color: 'Red',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }


        let creditsConfig = {
            fontFamily: 'Impact',
            fontSize: '30px',
            backgroundColor: 'rgba(76, 175, 80, 0.5)',
            color: 'Yellow',
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
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 100, 'INSULT  MASTER', titleConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 75, 'Use ↕️ arrow keys to choose insult, [ENTER] confirm insult', directionsConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 40, 'You are the left character..', directionsConfig).setOrigin(0.5)

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding + 75, 'Press SPACEBAR to begin', directionsConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 150, 'Aqua Teen Hunger Force!', creditsConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding + 230, 'Art Made From pixilart & leshylabs', creditsConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding + 270, 'SFX From pixabay', creditsConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding + 310, 'By Karthik Sankara', creditsConfig).setOrigin(0.5)



        



        //define keyboard input regarding spacebar
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    update() {

        //starting play scene based on user input
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('transition');
            this.scene.start('playScene');    
        }


    }

}
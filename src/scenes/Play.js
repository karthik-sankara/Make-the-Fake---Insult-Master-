class Play extends Phaser.Scene{
    constructor() {
        super("playScene")
    }

    //load in assets used for this scene
    preload() {
        this.load.spritesheet('leftPlayerUser', './assets/userspritesheet.png', {
            frameWidth: 100,
            frameHeight: 100
        })
        this.load.image('background', './assets/background.png')
        this.load.image('border','./assets/orange_border.png')


    }

    create() {
        this.scrollBackGround = this.add.tileSprite(0, 0, 600, 600, 'background').setOrigin(0,0);
        this.orange_border = this.add.tileSprite(0, 0, 600, 600, 'border').setOrigin(0,0);




        this.userLeftPlayer = new LeftPlayerUser(this, game.config.width/3, game.config.height - borderUISize - borderPadding - 300, 'leftPlayerUser',0).setOrigin(0.5,0)




    }

    update() {
        this.scrollBackGround.tilePositionY += 1 
    }
}
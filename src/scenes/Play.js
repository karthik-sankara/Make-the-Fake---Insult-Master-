class Play extends Phaser.Scene{
    constructor() {
        super("playScene")
    }

    //load in assets used for this scene
    preload() {

        //user controlled asset, spritesheet
        this.load.spritesheet('leftPlayerUser', './assets/userspritesheet.png', {
            frameWidth: 100,
            frameHeight: 100
        })

        //ai controlled asset, spritesheet
        this.load.spritesheet('rightPlayerAI','./assets/AIspritesheet.png', {
            frameWidth: 100,
            frameHeight: 100
        })

        //loading images 
        this.load.image('background', './assets/background.png')
        this.load.image('border','./assets/orange_border.png')

        //loading audio for game based actions
        this.load.audio('ui_select','./assets/selectUI.mp3')
        this.load.audio('confirm','./assets/confirm.mp3')
        this.load.audio('background_music','./assets/background_music.mp3')


    }

    create() {
        //using the images to create background effect similiar to the game within the show
        this.scrollBackGround = this.add.tileSprite(0, 0, 400, 400, 'background').setOrigin(0,0);
        this.orange_border = this.add.tileSprite(0, 0, 400, 400, 'border').setOrigin(0,0);


            
        //two player objects, one user controlled, one AI controlled
        this.userLeftPlayer = new LeftPlayerUser(this, game.config.width/3 + 30, game.config.height - borderUISize - borderPadding - 220, 'leftPlayerUser',0).setOrigin(0.5,0)
        this.rightPlayerAI = new RightPlayerAI(this, game.config.width/2 + 85, game.config.height - borderUISize - borderPadding - 270, 'rightPlayerAI',0).setOrigin(0.5,0)

        
        //UI config for turn based combat
        this.graphics = this.add.graphics()
        this.graphics.lineStyle(1, 0xffffff)
        this.graphics.fillStyle(0x031f4c, 1)     
        
        this.graphics.strokeRect(5, 270, 90, 20)
        this.graphics.fillRect(5, 270, 90, 20)
        
        this.graphics.strokeRect(100, 270, 158, 125)
        this.graphics.fillRect(100, 270, 158, 125)
        
        this.graphics.strokeRect(262, 270, 135, 20)
        this.graphics.fillRect(262, 270, 135, 20)

    
        // basic container to hold all menus
        this.menus = this.add.container();
                
        //Portions of the turn-based UI pertaining to the user, actions, and enemy
        this.playersMenu = new PlayersMenu(5, 270, this)          
        this.actionsMenu = new ActionsMenu(100, 270, this)         
        this.enemiesMenu = new EnemiesMenu(262, 270, this) 
        
        // the currently selected menu 
        this.currentMenu = this.actionsMenu;
        
        // add menus to the container
        this.menus.add(this.playersMenu)
        this.menus.add(this.actionsMenu)
        this.menus.add(this.enemiesMenu)



        //adding listener for keyboard events
        this.input.keyboard.on('keydown', this.onKeyInput, this)

        //playscene_music initialization
        this.background_music = this.sound.add('background_music', {loop: true})
        this.background_music.setVolume(0.05)


        this.select_sound = this.sound.add('ui_select', {loop: false})
        this.select_sound.setVolume(0.9)
       

        this.confirm_sound = this.sound.add('confirm', {loop: false})
        this.confirm_sound.setVolume(0.4)






        this.background_music.play()

        this.randomNumber = Math.floor(Math.random() * (max - min + 1)) + min

        
    }

    update() {
        this.randomNumber++
        //background effect with tilesprite
        this.scrollBackGround.tilePositionY += 0.5 


        if(ai_turn) {
            for(let i = 0; i < this.randomNumber; i++) {
                this.currentMenu.moveSelectionUp();
                this.currentMenu.moveSelectionDown();
            }
            this.confirm_sound.play()
            this.currentMenu.confirm();
            ai_turn = false
            user_turn = true
        }

    }

    //method for when keyboard is pressed, triggers 'event': uses keyboard codes to detect action
    onKeyInput(event) {
        if (this.currentMenu) {
            switch (event.code) {
                case "ArrowUp":
                    this.select_sound.play()
                    this.currentMenu.moveSelectionUp();
                    break
                case "ArrowDown":
                    this.select_sound.play()
                    this.currentMenu.moveSelectionDown();
                    break
                case "ArrowRight":
                    // Handle ArrowRight or Shift key press if needed
                    this.select_sound.play()
                    break
                case "Enter":
                    this.confirm_sound.play()
                    this.currentMenu.confirm();
                    break
                default:
                    // Handle other key inputs if needed
                    this.select_sound.play()
                    break;
            }
        }
    }


}








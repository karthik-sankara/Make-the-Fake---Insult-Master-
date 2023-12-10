class Play extends Phaser.Scene{
    constructor() {
        super("playScene")
    }

    //load in assets used for this scene
    preload() {

        //user controlled asset, spritesheet
        this.load.spritesheet('leftPlayerUser', './assets/userspritesheet.png', {
            frameWidth: 150,
            frameHeight: 150
        })

        //ai controlled asset, spritesheet
        this.load.spritesheet('rightPlayerAI','./assets/AIspritesheet.png', {
            frameWidth: 100,
            frameHeight: 100
        })
        //loading images 
        this.load.image('background', './assets/background.png')
        this.load.image('border','./assets/orange_border.png')
        this.load.image('battle_ring', './assets/battle_ring.png')

        //loading audio for game based actions
        this.load.audio('ui_select','./assets/selectUI.mp3')
        this.load.audio('confirm','./assets/confirm.mp3')
        this.load.audio('background_music','./assets/background_music.mp3')


    }


    create() {
        //using the images to create background effect similiar to the game within the show
        this.scrollBackGround = this.add.tileSprite(0, 0, 900, 600, 'background').setOrigin(0,0);
        this.orange_border = this.add.tileSprite(0, 0, 900, 600, 'border').setOrigin(0,0);
        this.battle_ring = this.add.tileSprite(210, -80, 530, 625, 'battle_ring').setOrigin(0,0)

            
        //two player objects, one user controlled, one AI controlled
        this.userLeftPlayer = new LeftPlayerUser(this, 200, game.config.height - borderUISize - borderPadding - 405, 'leftPlayerUser',0).setOrigin(0.5,0)
        this.rightPlayerAI = new RightPlayerAI(this, game.config.width/2 + 300, game.config.height - borderUISize - borderPadding - 450, 'rightPlayerAI',0).setOrigin(0.5,0)

        
        //UI config for turn based combat
        this.graphics = this.add.graphics()
        this.graphics.lineStyle(2, 0xffffff)
        this.graphics.fillStyle(0x031f4c, 1)     
        
        this.graphics.strokeRect(150, 300, 90, 20)
        this.graphics.fillRect(150, 300, 90, 20)
        
        this.graphics.strokeRect(250, 300, 400, 250)
        this.graphics.fillRect(250, 300, 400, 250)
        
        this.graphics.strokeRect(670, 300, 135, 20)
        this.graphics.fillRect(670, 300, 135, 20)

    
        // basic container to hold all menus
        this.menus = this.add.container();
                
        //Portions of the turn-based UI pertaining to the user, actions, and enemy
        this.playersMenu = new PlayersMenu(150, 300, this)          
        this.actionsMenu = new ActionsMenu(250, 300, this)         
        this.enemiesMenu = new EnemiesMenu(670, 300, this) 
        
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


        //moving around sound for choosing options in UI
        this.select_sound = this.sound.add('ui_select', {loop: false})
        this.select_sound.setVolume(0.9)
       
        
        //confirm sound when pressing enter on a ui prompt
        this.confirm_sound = this.sound.add('confirm', {loop: false})
        this.confirm_sound.setVolume(0.4)

        this.background_music.play()


        
    }

    update() {

        time_elapsed += 1
        if(time_elapsed % 10000 == 0) {
            return
        }

        //background effect with tilesprite
        this.scrollBackGround.tilePositionY  += 1.5
        


        if(ai_turn) { 
            for(let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
                this.select_sound.play()
                this.currentMenu.moveSelectionUp();
            }
            this.confirm_sound.play()
            this.currentMenu.confirm(this.currentMenu.menuItemIndex, this.currentMenu)
            return
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
                    this.currentMenu.confirm(this.currentMenu.menuItemIndex, this.currentMenu);
                    break
                default:
                    // Handle other key inputs if needed
                    this.select_sound.play()
                    break;
            }
        }
    }


}








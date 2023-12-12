//https://gamedevacademy.org/how-to-create-a-turn-based-rpg-game-in-phaser-3-part-2/
//turn based menu/combat system based off of reference above with some minor tweaks
class MenuItem extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text) {
        super(scene, x, y, text, { color: '#ffffff', align: 'left', fontSize: 15 })
    }

    //selecting an item indicates a color
    select() {
        this.setColor('#f8ff38')

    }

    //return the color back to its original
    deselect() {
        this.setColor('#ffffff')
    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//container for UI objects
class UI extends Phaser.GameObjects.Container {
    constructor(x, y, scene, players) {
        super(scene,x,y)
        this.menuItems = []
        this.menuItemIndex = 0
        this.players = players
        this.x = x
        this.y = y
    }


    //adding an item inside a certain area inside the ui
    addMenuItem(unit) {
        const menuItem = new MenuItem(this.scene, 0, this.menuItems.length * 20, unit)
        this.menuItems.push(menuItem)
        this.add(menuItem)
    }

    
    
    //selection goes up, menu items are stored in a set, index alters everytime we changed directions
    moveSelectionUp() {
        this.menuItems[this.menuItemIndex].deselect()
        this.menuItemIndex--
        if (this.menuItemIndex < 0) {
            this.menuItemIndex = this.menuItems.length - 1
        }
        this.menuItems[this.menuItemIndex].select()
    }

    //same as above but index increases since we are going down, we are envisioning the list of menu items horizontally: array
    moveSelectionDown() {
        this.menuItems[this.menuItemIndex].deselect()
        this.menuItemIndex++
        if (this.menuItemIndex >= this.menuItems.length) {
            this.menuItemIndex = 0
        }
        this.menuItems[this.menuItemIndex].select()
    }

    //indicates selection action from above
    select(index) {
        if (!index) {
            index = 0
        }
        this.menuItems[this.menuItemIndex].deselect()
        this.menuItemIndex = index
        this.menuItems[this.menuItemIndex].select()
    }

    //indicates deselect action from above
    deselect() {
        this.menuItems[this.menuItemIndex].deselect()
        this.menuItemIndex = 0
    }

    //clears the item selections from the UI
    clear() {
        for (const menuItem of this.menuItems) {
            menuItem.destroy()
        }
        this.menuItems = []
        this.menuItemIndex = 0
    }


    //confirm selection when its user's turn: takes menuitem index, menu item, scene where ui exists, user object, ai object
    confirm_selection(x,menu, scene, leftplayer,rightplayer) {     //use rightplayer and leftplayer objects in the param as well
        if(x == 0 && user_turn && turn) {  
                                   //use boolean flag, turn to infer selection 
            menu.clear()                                                            //clear ui for further actions if player/ai attacks                                                      
            menu.addMenuItem('Your hat looks stupid!')
            menu.addMenuItem('You have the IQ of a goldfish!')
            menu.addMenuItem('You have the attention span of a sloth.')
            menu.addMenuItem('You are why the gene-pool needs a life-guard.')
            turn = false
            return
        }
        else if (x == 0 && ai_turn && turn) {
            menu.clear()
            menu.addMenuItem('You look like a giraffe.')
            menu.addMenuItem('You are as sharp as a rubber ball.')
            menu.addMenuItem('You are the human equivalent of a doorknob.')
            menu.addMenuItem('Im jealous of people that dont know you.')
            turn = false
            return
        }
        else if(x == 1 && user_turn && turn) {                                          //skip move selection
                          //skip move selection
            ai_turn = true
            user_turn = false
            return
        }
        else if(x == 1 && ai_turn && turn) {                         
            
            ai_turn = false
            user_turn = true
            return
        }

            
        //Actual insult UI selections from PLAYER/AI using Flags, clearing and resetting UI and reversing turn flags for turn-based combat   
        //USER   Selections
        if(x == 0 && user_turn) {               //insult 1
            let textConfig = {                          //text config for insult
                fontFamily: 'Impact',
                fontSize: '25px',
                backgroundColor: 'rgba(76, 175, 80, 0.5)',
                color: 'Red',
                align: 'left',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                fixedWidth: 0
            }
        
            let textBox = scene.add.text(game.config.width / 2 - 100, game.config.height / 2 - borderUISize - borderPadding - 130, 'Your hat looks stupid!', textConfig)
                .setOrigin(0.5)
                .setAlpha(1); // Set alpha to 1 to make it initially visible

            leftplayer.play('leftPlayerPoint')                  //animation for insult
        
            // Hide the text after a certain duration (e.g., 3 seconds)
            scene.time.delayedCall(3000, function () {
                textBox.setAlpha(0); // Set alpha to 0 to hide the text after 3 seconds
            }, [], scene);

            rightplayer.healthpoints -= 10                      //opposing player gets damagaed
            


            user_turn = false                               //turn based alter of boolean flags
            ai_turn = true
            turn = true
            menu.clear()                                        //reset UI prompts
            menu.addMenuItem('Attack')
            menu.addMenuItem('Take the Insult')

            
            

            return                                  //immediately exiting function
        }

        if(x == 1 && user_turn) {                       //insult 2
            let textConfig = {
                fontFamily: 'Impact',
                fontSize: '25px',
                backgroundColor: 'rgba(76, 175, 80, 0.5)',
                color: 'Red',
                align: 'left',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                fixedWidth: 0
            }
        
            let textBox = scene.add.text(game.config.width / 2 - 100, game.config.height / 2 - borderUISize - borderPadding - 130, 'You have the IQ of a goldfish!', textConfig)
                .setOrigin(0.5)
                .setAlpha(1); // Set alpha to 1 to make it initially visible


            leftplayer.play('leftPlayerPoint')
        
        
            // Hide the text after a certain duration (e.g., 3 seconds)
            scene.time.delayedCall(3000, function () {
                textBox.setAlpha(0); // Set alpha to 0 to hide the text after 3 seconds
            }, [], scene);
            
            rightplayer.healthpoints -= 10

            user_turn = false
            ai_turn = true
            turn = true
            menu.clear()
            menu.addMenuItem('Attack')
            menu.addMenuItem('Take the Insult')
            return
        }
            
        if(x == 2 && user_turn) {                               //insult 3
            let textConfig = {
                fontFamily: 'Impact',
                fontSize: '25px',
                backgroundColor: 'rgba(76, 175, 80, 0.5)',
                color: 'Red',
                align: 'left',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                fixedWidth: 0
            }
        
            let textBox = scene.add.text(game.config.width / 2 - 100, game.config.height / 2 - borderUISize - borderPadding - 130, 'You have the attention span of a sloth', textConfig)
                .setOrigin(0.5)
                .setAlpha(1); // Set alpha to 1 to make it initially visible

            
            leftplayer.play('leftPlayerPoint')
        
            // Hide the text after a certain duration (e.g., 3 seconds)
            scene.time.delayedCall(3000, function () {
                textBox.setAlpha(0); // Set alpha to 0 to hide the text after 3 seconds
            }, [], scene);
            
            
            rightplayer.healthpoints -= 10
            
            user_turn = false
            ai_turn = true
            turn = true
            menu.clear()
            menu.addMenuItem('Attack')
            menu.addMenuItem('Take the Insult')
            return
        }

        if(x == 3 && user_turn) {                               //insult 4
            let textConfig = {
                fontFamily: 'Impact',
                fontSize: '25px',
                backgroundColor: 'rgba(76, 175, 80, 0.5)',
                color: 'Red',
                align: 'left',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                fixedWidth: 0
            }
        
            let textBox = scene.add.text(game.config.width / 2 - 100, game.config.height / 2 - borderUISize - borderPadding - 130, 'You are why the gene-pool needs a life-guard.', textConfig)
                .setOrigin(0.5)
                .setAlpha(1); // Set alpha to 1 to make it initially visible

            
            leftplayer.play('leftPlayerPoint')
        
            // Hide the text after a certain duration (e.g., 3 seconds)
            scene.time.delayedCall(3000, function () {
                textBox.setAlpha(0); // Set alpha to 0 to hide the text after 3 seconds
            }, [], scene);
            

            rightplayer.healthpoints -= 10
            
            user_turn = false
            ai_turn = true
            turn = true
            menu.clear()
            menu.addMenuItem('Attack')
            menu.addMenuItem('Take the Insult')
            return
        }
    
           
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        //AI Selections

        if(x == 0 && ai_turn) {
            let textConfig = {
                fontFamily: 'Impact',
                fontSize: '25px',
                backgroundColor: 'rgba(76, 175, 80, 0.5)',
                color: '#0077BE',
                align: 'right',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                fixedWidth: 0
            }
        
            let textBox = scene.add.text(game.config.width / 2 + 130, game.config.height / 2 - borderUISize - borderPadding - 200, 'You look like a giraffe.', textConfig)
                .setOrigin(0.5)
                .setAlpha(1); // Set alpha to 1 to make it initially visible

             rightplayer.play('rightPlayerPoint')
        
            // Hide the text after a certain duration (e.g., 3 seconds)
            scene.time.delayedCall(4000, function () {
                textBox.setAlpha(0); // Set alpha to 0 to hide the text after 3 seconds
            }, [], scene);


            leftplayer.healthpoints -= 10



            user_turn = true
            ai_turn = false
            turn = true
            menu.clear()
            menu.addMenuItem('Attack')
            menu.addMenuItem('Take the Insult')
            return
        }

        if(x == 1 && ai_turn) {
            let textConfig = {
                fontFamily: 'Impact',
                fontSize: '25px',
                backgroundColor: 'rgba(76, 175, 80, 0.5)',
                color: '#0077BE',
                align: 'right',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                fixedWidth: 0
            }
        
            let textBox = scene.add.text(game.config.width / 2 + 130, game.config.height / 2 - borderUISize - borderPadding - 200, 'You are as sharp as a rubber ball.', textConfig)
                .setOrigin(0.5)
                .setAlpha(1); // Set alpha to 1 to make it initially visible
            
            rightplayer.play('rightPlayerPoint')
        
            // Hide the text after a certain duration (e.g., 3 seconds)
            scene.time.delayedCall(4000, function () {
                textBox.setAlpha(0); // Set alpha to 0 to hide the text after 3 seconds
            }, [], scene);

            leftplayer.healthpoints -= 10

            user_turn = true
            ai_turn = false
            turn = true
            menu.clear()
            menu.addMenuItem('Attack')
            menu.addMenuItem('Take the Insult')
            return 
        }


        if(x == 2 && ai_turn) {
            let textConfig = {
                fontFamily: 'Impact',
                fontSize: '25px',
                backgroundColor: 'rgba(76, 175, 80, 0.5)',
                color: '#0077BE',
                align: 'right',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                fixedWidth: 0
            }
        
            let textBox = scene.add.text(game.config.width / 2 + 130, game.config.height / 2 - borderUISize - borderPadding - 200, 'You are the human equivalent of a doorknob.', textConfig)
                .setOrigin(0.5)
                .setAlpha(1); // Set alpha to 1 to make it initially visible

            rightplayer.play('rightPlayerPoint')
        
            // Hide the text after a certain duration (e.g., 3 seconds)
            scene.time.delayedCall(4000, function () {
                textBox.setAlpha(0); // Set alpha to 0 to hide the text after 3 seconds
            }, [], scene);


            leftplayer.healthpoints -= 10



            
            user_turn = true
            ai_turn = false
            turn = true
            menu.clear()
            menu.addMenuItem('Attack')
            menu.addMenuItem('Take the Insult')
            return
        }

        if(x == 3 && ai_turn) {
            let textConfig = {
                fontFamily: 'Impact',
                fontSize: '25px',
                backgroundColor: 'rgba(76, 175, 80, 0.5)',
                color: '#0077BE',
                align: 'right',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                fixedWidth: 0
            }
        
            let textBox = scene.add.text(game.config.width / 2 + 130, game.config.height / 2 - borderUISize - borderPadding - 200, 'Im jealous of people that dont know you.', textConfig)
                .setOrigin(0.5)
                .setAlpha(1); // Set alpha to 1 to make it initially visible

            rightplayer.play('rightPlayerPoint')
        
            // Hide the text after a certain duration (e.g., 3 seconds)
            scene.time.delayedCall(4000, function () {
                textBox.setAlpha(0); // Set alpha to 0 to hide the text after 3 seconds
            }, [], scene);



            leftplayer.healthpoints -= 10


            user_turn = true
            ai_turn = false
            turn = true
            menu.clear()
            menu.addMenuItem('Attack')
            menu.addMenuItem('Take the Insult')
            return
        }
    
        
        
        

    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//sub class for adding items inside user box, (mainly user's name)
//UI for User controlled player
class PlayersMenu extends UI {
    constructor(x, y, scene) {
        super(x, y, scene)
        this.addMenuItem('Cool Guy')
    }
}

//sub class for adding actions inside user box,(these are the two options for the two characters)
class ActionsMenu extends UI {
    constructor(x, y, scene) {
        super(x, y, scene)
        this.addMenuItem('Attack')
        this.addMenuItem('Take the Insult')
    }

    //for when a menu prompt gets selected
    confirm(z,ActionsMenu,Play,LeftPlayerUser,RightPlayerAI) {                    //add right/left player objects to parameters
        this.confirm_selection(z,ActionsMenu,Play,LeftPlayerUser,RightPlayerAI)         //+ scene of that UI menu
    }

    
}

//sub class for adding items inside user box, (mainly enemy's name)
//UI for AI controller player
class EnemiesMenu extends UI {
    constructor(x, y, scene) {
        super(x, y, scene)
        this.addMenuItem('Brutal Bully')
    }
}
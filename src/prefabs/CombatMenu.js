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
            menuItem.destroy();
        }
        this.menuItems = [];
        this.menuItemIndex = 0;
    }


    //confirm selection when its user's turn
    confirm_selection(x,menu) {     //use rightplayer and leftplayer objects in the param as well
        if(x == 0 && user_turn && turn) {
            menu.clear()
            menu.addMenuItem('Your hat looks stupid!')
            menu.addMenuItem('You have the IQ of a goldfish!')
            menu.addMenuItem('You have the attention span of a sloth')
            menu.addMenuItem('You are why the gene-pool needs a life-guard')
            turn = false
            return
        }
        else if (x == 0 && ai_turn && turn) {
            menu.clear()
            menu.addMenuItem('You look like a giraffe.')
            menu.addMenuItem('You are as sharp as a rubber ball')
            menu.addMenuItem('You are the human equivalent of a doorknob')
            menu.addMenuItem('Im jealous of people that dont know you')
            turn = false
            return
        }

        if(x == 1 && user_turn && turn) {
            console.log("reached")
            ai_turn = true
            user_turn = false
            return
        }
        else if(x == 1 && ai_turn && turn) {
            console.log("reached")
            ai_turn = false
            user_turn = true
            return
        }
            
            
        if(x == 0 && user_turn) {
            console.log("You chose insult1")
            user_turn = false
            ai_turn = true
            turn = true
            menu.clear()
            menu.addMenuItem('Attack')
            menu.addMenuItem('Take the Insult')
            return
        }

        if(x == 1 && user_turn) {
            console.log("You chose insult2")
            user_turn = false
            ai_turn = true
            turn = true
            menu.clear()
            menu.addMenuItem('Attack')
            menu.addMenuItem('Take the Insult')
            return
        }
            
        if(x == 2 && user_turn) {
            console.log("You chose insult3")
            user_turn = false
            ai_turn = true
            turn = true
            menu.clear()
            menu.addMenuItem('Attack')
            menu.addMenuItem('Take the Insult')
            return
        }

        if(x == 3 && user_turn) {
            console.log("You chose insult4")
            user_turn = false
            ai_turn = true
            turn = true
            menu.clear()
            menu.addMenuItem('Attack')
            menu.addMenuItem('Take the Insult')
            return
        }
    
           
        /////////////////////////////////////////////////////////////////////

        if(x == 0 && ai_turn) {
            console.log("You chose insult5")
            user_turn = true
            ai_turn = false
            turn = true
            menu.clear()
            menu.addMenuItem('Attack')
            menu.addMenuItem('Take the Insult')
            return
        }

        if(x == 1 && ai_turn) {
            console.log("You chose insult6")
            user_turn = true
            ai_turn = false
            turn = false
            menu.clear()
            menu.addMenuItem('Attack')
            menu.addMenuItem('Take the Insult')
            return 
        }


        if(x == 2 && ai_turn) {
            console.log("You chose insult7")
            user_turn = true
            ai_turn = false
            turn = true
            menu.clear()
            menu.addMenuItem('Attack')
            menu.addMenuItem('Take the Insult')
            return
        }

        if(x == 3 && ai_turn) {
            console.log("You chose insult8")
            user_turn = true
            ai_turn = false
            turn = true
            menu.clear()
            menu.addMenuItem('Attack')
            menu.addMenuItem('Take the Insult')
            return
        }
    
            ///////////////////////////////////////////////////////////////

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
    confirm(z,ActionsMenu) {                    //add right/left player objects to parameters
        this.confirm_selection(z,ActionsMenu)
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
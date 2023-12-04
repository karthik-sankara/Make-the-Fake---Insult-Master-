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


    clear() {
        for (const menuItem of this.menuItems) {
            menuItem.destroy();
        }
        this.menuItems = [];
        this.menuItemIndex = 0;
    }

    confirm_selection(x) {
        if(x == 0 && user_turn) {
            this.addMenuItem('Insult1')
            this.addMenuItem('Insult2')
            this.addMenuItem('Insult3')
            this.addMenuItem('Insult4')
            user_turn = false
            ai_turn = true
        }

        if(x == 0 && ai_turn) {
            this.addMenuItem('Insult5')
            this.addMenuItem('Insult6')
            this.addMenuItem('Insult7')
            this.addMenuItem('Insult8')
            ai_turn = false
            user_turn = true
        }


        if(x == 1) {
            if(user_turn) {
                ai_turn = true
                user_turn = false
            }
            if(ai_turn) {
                ai_turn = false
                user_turn = true
            }
            
        }
    }
    


    

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//sub class for adding items inside user box, (mainly user's name)
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

    confirm() {
        this.confirm_selection(this.menuItemIndex)
    }

    
}

//sub class for adding items inside user box, (mainly enemy's name)
class EnemiesMenu extends UI {
    constructor(x, y, scene) {
        super(x, y, scene)
        this.addMenuItem('Bitch Ass Bully')
    }
}
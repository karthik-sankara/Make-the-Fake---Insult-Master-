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


    //method for actually confirming the option on the menu, and performing its action
    /*
    confirm() {
        // when the player confirms his selection, do the action
    }
    */


    

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//sub class for adding items inside user box, (mainly user's name)
class PlayersMenu extends UI {
    constructor(x, y, scene) {
        super(x, y, scene)
        this.addMenuItem('Cool Guy')
    }
    /* 
    confirm() {
        // Do something when the player selects an action
    }
    */
}

//sub class for adding actions inside user box,(these are the two options for the two characters)
class ActionsMenu extends UI {
    constructor(x, y, scene) {
        super(x, y, scene)
        this.addMenuItem('Attack')
        this.addMenuItem('Take the Insult')
    }

    /*
    confirm() {
        // Do something when the player selects an action
    }
    */
}

//sub class for adding items inside user box, (mainly enemy's name)
class EnemiesMenu extends UI {
    constructor(x, y, scene) {
        super(x, y, scene)
        this.addMenuItem('Bitch Ass Bully')
    }

    /*
    confirm() {
        // Do something when the player selects an action
    }
    */
}
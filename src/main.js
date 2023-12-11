//Karthik Sankara
//Make the Fake: Insult Master

//game configuration settings
let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    height: 600,
    width: 900,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Menu, Play]
}


//actual game object
let game = new Phaser.Game(config) 


//set ui sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3


//global variables
let keySPACE



//turn based
let user_turn = true
let ai_turn = false
let turn = true



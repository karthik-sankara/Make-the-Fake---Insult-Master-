//Karthik Sankara
//Make the Fake: Insult Master

//game configuration settings
let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    height: 400,
    width: 400,
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

//selection flags in the UI box
let selected = false
let confirmed_attack = false


//turn based
let user_turn = true
let ai_turn = false

//random num gen
let min = 1;
let max = 4;

//Karthik Sankara
//Make the Fake: Insult Master
/*
Particle Effects: When the game is over, a bunch of flames will be emitted. The color of the flame
is based on which player wins. User wins -> red flames, AI wins -> blue flames
Play.js 162-169, 189-195

Text Objects: To create insults for the game and display them on the screen for a certain amount of time. 
Created a User Interface for a turn based combat using the GameObjects.text phaser class

Animation Manager: Create animations for specific actions for User Controlled and AI Controlled player. Used Animations in
CombatMenu.js
Created Animations in: LeftPlayerUser.js & RightPlayerUser.js

Timer: Used timer to display a text on the screen for a certain amount of time and then make it dissapear due to turn based combat
This is seen in each of the if-statements in confirm_selection, using setAlpha(0) and 1 to delay text visibility

TileMaps: Created Spritesheets for each leftplayer and rightplayer class, used the sheet's frame's create animations

*Note: The difficulty can vary each game. I have programmed the AI player to randomly choose decisions based on Math.random
One of the options is accepting the insulting, which is basically a skip move mechanism
In some games, you may see that the AI is barely insulting and this may just because of what they are randomly deciding
In other games, the AI might fully demean you with insults. 
*/

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
let keySPACE, keyM, keyR //for UI prompts



//turn based
let user_turn = true
let ai_turn = false
let turn = true



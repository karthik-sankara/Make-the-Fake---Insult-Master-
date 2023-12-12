class LeftPlayerUser extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        //calls constructor from parent class
        super(scene, x, y, texture, frame)
        this.healthpoints = 100         //health, decides who wins or loses

        //add this character to the class it is being called upon
        scene.add.existing(this)            //add object to existing scene 


        //enable physics for this object
        scene.physics.add.existing(this)                    

        //character properties
        this.setDepth(1)
        this.setOrigin(0.5)
        
        //set up the animations using the texture atlas for this object
        scene.anims.create({
            key: 'leftPlayerIdle',
            frames: scene.anims.generateFrameNumbers('leftPlayerUser',{
                prefix: 'leftPlayerIdle',
                start: 0,
                end: 0,
            }),
            frameRate: 8,
            repeat: -1
        })

        //insult animation
        scene.anims.create({
            key: 'leftPlayerPoint',
            frames: scene.anims.generateFrameNumbers('leftPlayerUser',{
                prefix: 'leftPlayerPoint',
                start: 3,
                end: 5,
            }),
            frameRate: 5,
            repeat: 0
        })


        //winning animation
        scene.anims.create({
            key: 'leftPlayerWinner',
            frames: scene.anims.generateFrameNumbers('leftPlayerUser',{
                prefix: 'leftPlayerWinner',
                start: 5,
                end: 7,
            }),
            frameRate: 5,
            repeat: -1
        })


        //losing animation
        scene.anims.create({
            key: 'leftPlayerLoser',
            frames: scene.anims.generateFrameNumbers('leftPlayerUser',{
                prefix: 'leftPlayerLoser',
                start: 8,
                end: 9,
            }),
            frameRate: 5, 
            repeat: -1
        })









    }







}


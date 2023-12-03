class LeftPlayerUser extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        //calls constructor from parent class
        super(scene, x, y, texture, frame)

        //add this character to the class it is being called upon
        scene.add.existing(this)


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





    
    }







}


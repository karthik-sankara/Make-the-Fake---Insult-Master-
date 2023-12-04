class RightPlayerAI extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        //calls constructor from parent class
        super(scene, x, y, texture, frame)
        this.healthpoints = 100
        this.damage = 0



        //add this character to the class it is being called upon
        scene.add.existing(this)


        //enable physics for this object
        scene.physics.add.existing(this)

        //character properties
        this.setDepth(1)
        this.setOrigin(0.5)
        
        //set up the animations using the texture atlas for this object
        scene.anims.create({
            key: 'rightPlayerIdle',
            frames: scene.anims.generateFrameNumbers('rightPlayerAI',{
                prefix: 'rightPlayerIdle',
                start: 0,
                end: 0,
            }),
            frameRate: 8,
            repeat: -1
        })

    }







}

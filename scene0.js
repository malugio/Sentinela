class scene0 extends Phaser.Scene {
  constructor() {
    super("scene0");
    
    this.threshold = 0.1;
    this.speed = 100;
    this.direction = undefined;
    this.money = 0;
    this.timer = 120;
  }
  
  preload() {
    this.load.setPath("assets/");
    
    this.load.tilemapTiledJSON("mars", "mars.json");
    
    this.load.image("tileset", "mars-tileset.png");
    
    
    this.load.spritesheet("astronauta", "astronauta.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("monster", "monster.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    
    this.load.spritesheet("buttons", "buttons.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.plugin(
      "rexvirtualjoystickplugin",
      "../rexvirtualjoystickplugin.min.js",
      true,
    );
    
    this.load.audio("music", "music.mp3");
    this.load.audio("laser", "laser.mp3");
  }
  
  create() {
    this.tilemap = this.make.tilemap({ key: "mars" });
    
    this.tilesetTileset = this.tilemap.addTilesetImage(
      "mars-tileset",
      "tileset",
    );
    
    this.layerCeu = this.tilemap.createLayer("ceu", [this.tilesetTileset
    ]);
    this.layerareia = this.tilemap.createLayer("areia", [this.tilesetTileset
    ]);
    this.layerchao = this.tilemap.createLayer("chao", [this.tilesetTileset
    ]);
    this.layermontanha = this.tilemap.createLayer("montanha", [this.tilesetTileset
    ]);
    this.layerplataforma = this.tilemap.createLayer("plataforma", [this.tilesetTileset
    ]);
    this.layerrochas = this.tilemap.createLayer("rochas", [this.tilesetTileset
    ]);
    
    
    this.joystick = this.plugins.get("rexvirtualjoystickplugin").add(this, {
      x: 100,
      y: 350,
      radius: 50,
      base: this.add.circle(0, 0, 50, 0xcccccc),
            thumb: this.add.circle(0, 0, 25, 0x666666),

    });
     
      this.joystick.on("update", () => {
        const angle = Phaser.Math.DegToRad(this.joystick.angle);
        const force = this.joystick.force;
      
        if (force > this.threshold) {
          this.direction = new Phaser.Math.Vector2(
            Math.cos(angle),
            Math.sin(angle),
          ).normalize();
        }
      
        if (this.joystick.force > 0) {
          this.astronauta.setVelocity(
            this.direction.x * this.speed,
            this.direction.y * this.speed,
          );
      
          switch (true) {
            case this.joystick.angle >= -45 && this.joystick.angle < 45:
              this.astronauta.anims.play("walk-right", true);
              break;
            case this.joystick.angle >= 135 || this.joystick.angle < -135:
              this.astronauta.anims.play("walk-left", true);
              break;
          }
        } else {
          this.astronauta.setVelocity(0, 0);
          this.astronauta.anims.stop();
        }
      }),
    


    this.laser = this.sound.add("laser");
    this.music = this.sound.add("music", { loop: true }).play();
    
    this.anims.create({
      key: "stay",
      frames: this.anims.generateFrameNumbers("astronauta", { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-right",
      frames: this.anims.generateFrameNumbers("astronauta", { start: 18, end: 25  }),
      frameRate: 10,
      repeat: -1,
    });
    
    this.anims.create({
      key: "walk-left",
      frames: this.anims.generateFrameNumbers("astronauta", { start: 10, end: 17  }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "jumping",
      frames: this.anims.generateFrameNumbers("astronauta", { start: 2, end: 9 }),
      frameRate: 10,
      repeat: -1,
    });

    this.astronauta = this.physics.add.sprite(400, 225, "astronauta", 20);

    this.physics.world.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels,
    );
    this.cameras.main.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels,
    );
    this.cameras.main.startFollow(this.astronauta);

    this.astronauta.setCollideWorldBounds(true);

    this.layerChao.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.astronauta, this.layerChao);

    this.layerareia.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.astronauta, this.layerareia);

    this.layerplataforma.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.astronauta, this.layerplataforma);


  
    tile.setCollision(false, false, true, false);
  }
}

export default scene0;

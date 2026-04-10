class scene0 extends Phaser.Scene {
  constructor() {
    super("scene0");

    this.threshold = 0.1;
    this.speed = 100;
    this.direction = undefined;
  }

  preload() {
    this.load.setPath("assets/");

    this.load.tilemapTiledJSON("mars", "mars.json");

    this.load.spritesheet("astronauta", "astronauta.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("monster", "monster.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.image("marte", "mars-tileset.png");

    this.load.spritesheet("buttons", "buttons.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.audio("music", "music.mp3");

    this.load.plugin(
      "rexvirtualjoystickplugin",
      "../rexvirtualjoystickplugin.min.js",
      true,
    );

    this.load.audio("coin", "coin.mp3");
  }

  create() {
    this.map = this.make.tilemap({ key: "mars" });

    this.tilesetmars = this.map.addTilesetImage("marte");

    this.layerceu = this.map.createLayer("ceu", [this.tilesetmars]);
    this.layersol = this.map.createLayer("sol", [this.tilesetmars]);
    this.layerf4 = this.map.createLayer("f4", [this.tilesetmars]);
    this.layerf2 = this.map.createLayer("f2", [this.tilesetmars]);
    this.layerf1 = this.map.createLayer("f1", [this.tilesetmars]);
    this.layerf5 = this.map.createLayer("f5", [this.tilesetmars]);
    this.layertub1 = this.map.createLayer("tub1", [this.tilesetmars]);
    this.layertub2 = this.map.createLayer("tub2", [this.tilesetmars]);
    this.layerchao = this.map.createLayer("chao", [this.tilesetmars]);
    this.layerplatf = this.map.createLayer("platf", [this.tilesetmars]);
    this.layersub1 = this.map.createLayer("sub1", [this.tilesetmars]);
    this.layersub2 = this.map.createLayer("sub2", [this.tilesetmars]);

    /*
    this.layerCharacter = this.tilesetmars.createLayer("character", [
      this.tilesetCharacter,
    ]);
    this.layerEnemy = this.tilesetmars.createLayer("enemy", [this.tilesetAndroid]);
    */

    this.astronauta = this.physics.add.sprite(150, 0, "astronauta", 0);

    this.anims.create({
      key: "standing-still",
      frames: this.anims.generateFrameNumbers("astronauta", {
        start: 0,
        end: 2,
      }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "running-right",
      frames: this.anims.generateFrameNumbers("astronauta", {
        start: 19,
        end: 26,
      }),
      frameRate: 10,
      repeat: -1,
    });
  
    this.anims.create({
      key: "running-left",
      frames: this.anims.generateFrameNumbers("astronauta", {
        start: 11,
        end: 19,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "jumping",
      frames: this.anims.generateFrameNumbers("astronauta", {
        start: 3,
        end: 10,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.physics.world.setBounds(
      0,
      0,
      this.tilesetmars.widthInPixels,
      this.tilesetmars.heightInPixels,
    );
    this.cameras.main.setBounds(
      0,
      0,
      this.tilesetmars.widthInPixels,
      this.tilesetmars.heightInPixels,
    );
    this.cameras.main.startFollow(this.astronauta);


    this.astronauta.setCollideWorldBounds(true);

    this.layerceu.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.astronauta, this.layerceu);

    this.layertub1.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.astronauta, this.layertub1);

     this.layertub2.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.astronauta, this.layertub);

    
    this.layerchao.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.astronauta, this.layerchao);

    this.layerplatf.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.astronauta, this.layerplatf);
    this.layerplatf.forEachTile((tile) => {
      if (tile.properties.collides) {
        // left, right, up, down
        tile.setCollision(false, false, true, false);
      }
    });

    this.music = this.sound.add("music", { loop: true }).play();

    this.coin = this.sound.add("coin");

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

      if (force > this.threshold)
        this.direction = new Phaser.Math.Vector2(
          Math.cos(angle),
          Math.sin(angle),
        ).normalize();

      if (this.joystick.force > 0)
        switch (true) {
          // right
          case this.joystick.angle >= -20 && this.joystick.angle < 20:
            this.astronauta.flipX = false;
            this.astronauta.setVelocityX(200);

            if (
              this.astronauta.body.blocked.down ||
              this.astronauta.body.blocked.up
            ) {
              this.astronauta.anims.play("running-right", true);
            }
            break;
          // left
          case this.joystick.angle >= 160 || this.joystick.angle < -160:
            this.astronauta.flipX = true;
            this.astronauta.setVelocityX(-200);

            if (
              this.astronauta.body.blocked.down ||
              this.astronauta.body.blocked.up
            ) {
              this.astronauta.anims.play("running-left", true);
            }
            break;
        }
      else this.astronauta.setVelocityX(0);
    });


    this.jumpButton = this.add
      .sprite(750, 400, "buttons", 8)
      .setInteractive()
      .on("pointerdown", () => {
        this.jumpButton.setFrame(9);
        this.jump(this.astronauta, this.physics.world.gravity.y);
      })
      .on("pointerup", () => {
        this.jumpButton.setFrame(8);
      })
      .setScrollFactor(0);
  }

  update() {
    if (
      this.astronauta.body.velocity.x === 0 &&
      this.astronauta.body.velocity.y === 0 &&
      (this.astronauta.body.blocked.down || this.astronauta.body.blocked.up)
    )
      this.astronauta.anims.play("standing-still", true);
  }

  jump(astronauta, gravity) {
    if (gravity > 0)
      if (astronauta.body.blocked.down) {
        astronauta.setVelocityY(-150);
        astronauta.anims.play("jumping", true);
      } else if (astronauta.body.blocked.up) {
        astronauta.setVelocityY(150);
        astronauta.anims.play("jumping", true);
      }
  }
}

export default scene0;

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
  
    this.load.image("tileset", "marte.png");
  
    this.load.spritesheet("buttons", "buttons.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.audio("music", "music.mp3");
    this.load.audio("laser", "laser.mp3");

    this.load.plugin(
      "rexvirtualjoystickplugin",
      "../rexvirtualjoystickplugin.min.js",
      true,
    );
  }

  create() {
    this.tilemars = this.make.tilemap({ key: "mars" });

    this.tilesetTileset = this.tilemars.addTilesetImage("tileset");/*
    this.tilesetTurret = this.tilemars.addTilesetImage("turret");
    this.tilesetCharacter = this.tilemars.addTilesetImage("character");
    this.tilesetAndroid = this.tilemars.addTilesetImage("android");
    */

    this.layerceu = this.tilemars
      .createLayer("ceu", [this.tilesetTileset])
    this.layersol = this.tilemars
      .createLayer("sol", [this.tilesetTileset])
    this.layerf4 = this.tilemars
      .createLayer("f4", [this.tilesetTileset])
    this.layerf2 = this.tilemars
      .createLayer("f2", [this.tilesetTileset])
    this.layerf1 = this.tilemars
      .createLayer("f1", [this.tilesetTileset])
    this.layerf5 = this.tilemars
      .createLayer("f5", [this.tilesetTileset])
     this.layertub1 = this.tilemars
      .createLayer("tub1", [this.tilesetTileset])
    this.layertub2 = this.tilemars
      .createLayer("tub2", [this.tilesetTileset])
    this.layerchaos = this.tilemars
      .createLayer("chaos", [this.tilesetTileset])
    this.layerplatf = this.tilemars
      .createLayer("platf", [this.tilesetTileset])
    this.layersub1= this.tilemars 
      .createLayer("sub1", [this.tilesetTileset])
    this.layersub2=this.tilemars
      .createLayer("sub2", [this.tilesetTileset])
   
    /*
    this.layerCharacter = this.tilemars.createLayer("character", [
      this.tilesetCharacter,
    ]);
    this.layerEnemy = this.tilemars.createLayer("enemy", [this.tilesetAndroid]);
    */

    this.player = this.physics.add
      .sprite(150, 656, "Astronauta", 0)

    this.anims.create({
      key: "standing-still",
      frames: this.anims.generateFrameNumbers("Astronauta", {
        start: 0,
        end: 2
      }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "running",
      frames: this.anims.generateFrameNumbers("Astronauta", {
        start: 11,
        end: 26,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "jumping",
      frames: this.anims.generateFrameNumbers("Astronauta", {
        start: 3,
        end: 10,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.physics.world.setBounds(
      0,
      0,
      this.tilemars.widthInPixels,
      this.tilemars.heightInPixels,
    );
    this.cameras.main.setBounds(
      0,
      0,
      this.tilemars.widthInPixels,
      this.tilemars.heightInPixels,
    );
    this.cameras.main.startFollow(this.Astronauta);

    this.lights.enable();
    this.lights.setAmbientColor(0x333333);
    this.lamp = this.lights
      .addLight(this.Astronauta.x, this.Astronauta.y, 64)
      .setIntensity(2);

    this.Astronauta.setCollideWorldBounds(true);

    this.layerceu.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.Astronauta, this.layerceu);

    this.layersol.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.Astronauta, this.layersol);

    this.layerf4.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.Astronauta, this.layerf4);

    this.layerchaos.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.Astronauta, this.layerchaos);

    this.layerplatf.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.Astronauta, this.layerplatf);
    this.layerplatf.forEachTile((tile) => {
      if (tile.properties.collides) {
        // left, right, up, down
        tile.setCollision(false, false, true, false);
      }
    });

    this.music = this.sound.add("music", { loop: true }).play();
    this.laser = this.sound.add("laser");

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
            this.player.flipX = false;
            this.Astronauta.setVelocityX(200);

            if (this.Astronauta.body.blocked.down || this.Astronauta.body.blocked.up) {
              this.Astronauta.anims.play("running", true);
            }
            break;
          // left
          case this.joystick.angle >= 160 || this.joystick.angle < -160:
            this.Astronauta.flipX = true;
            this.Astronauta.setVelocityX(-200);

            if (this.Astronauta.body.blocked.down || this.Astronauta.body.blocked.up) {
              this.Astronauta.anims.play("running", true);
            }
            break;
        }
      else this.Astronauta.setVelocityX(0);
    });

    this.changeGravityButton = this.add
      .sprite(700, 400, "buttons", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.changeGravityButton.setFrame(1);
        this.physics.world.gravity.y *= -1;
        this.Astronauta.setFlipY(this.physics.world.gravity.y < 0);
      })
      .on("pointerup", () => {
        this.changeGravityButton.setFrame(0);
      })
      .setScrollFactor(0);

    this.jumpButton = this.add
      .sprite(750, 400, "buttons", 8)
      .setInteractive()
      .on("pointerdown", () => {
        this.jumpButton.setFrame(9);
        this.jump(this.Astronauta, this.physics.world.gravity.y);
      })
      .on("pointerup", () => {
        this.jumpButton.setFrame(8);
      })
      .setScrollFactor(0);
  }

  update() {
    if (
      this.Astronauta.body.velocity.x === 0 &&
      this.Astronauta.body.velocity.y === 0 &&
      (this.Astronauta.body.blocked.down || this.Astronauta.body.blocked.up)
    )
      this.Astronauta.anims.play("standing-still", true);

    this.lamp.x = this.Astronauta.x;
    this.lamp.y = this.Astronauta.y;
  }

  jump(Astronauta, gravity) {
    if (gravity > 0)
      if (Astronauta.body.blocked.down) {
        Astronauta.setVelocityY(-150);
        Astronauta.anims.play("jumping", true);
      } else if (Astronauta.body.blocked.up) {
        Astronauta.setVelocityY(150);
        Astronauta.anims.play("jumping", true);
      }
  }
}

export default scene0;
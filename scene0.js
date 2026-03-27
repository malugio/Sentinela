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

    this.load.tilemapTiledJSON("marte1", "marte1.json");

    this.load.image("tileset", "mars-tileset.png");


    this.load.spritesheet("alien", "alien.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.image("tileset", "mars-tileset.png");

    this.load.plugin(
      "rexvirtualjoystickplugin",
      "../rexvirtualjoystickplugin.min.js",
      true,
    );

    this.load.audio("music", "music.mp3");
    this.load.audio("laser", "laser.mp3");
  }

  create() {
    this.tilemap = this.make.tilemap({ key: "marte1" });

    this.tilesetTileset = this.tilemap.addTilesetImage(
      "mars-tileset",
      "tileset",
    );

    this.layerCeu = this.tilemap.createLayer("ceu", [this.tilesetTileset]);
    this.layerSol = this.tilemap.createLayer("sol", [this.tilesetTileset, ,]);
    this.layerAreia = this.tilemap.createLayer("areia", [this.tilesetTileset]);
    this.layerChaoEscuro = this.tilemap.createLayer("chaoescuro", [this.tilesetTileset,
    ]);
    this.layerRochasPequenas = this.tilemap.createLayer("rochaspequenas", [
      this.tilesetTileset,
    ]);
    this.layerRochasMinusculas = this.tilemap.createLayer("rochasminusculas", [
      this.tilesetTileset,
    ]);

    this.layerMontanha2 = this.tilemap.createLayer("montanha2", [
      this.tilesetTileset,
    ]);
    this.layerMontanha1 = this.tilemap.createLayer("montanha1", [
      this.tilesetTileset,
    ]);
    this.layerMontanha2Mpde = this.tilemap.createLayer("montanha2mpde", [
      this.tilesetTileset,
    ]);
    this.layerMontanha1Mpde = this.tilemap.createLayer("montanha1mpde", [
      this.tilesetTileset,
    ]);
    this.layerRochasGrandes = this.tilemap.createLayer("rochasgrandes", [
      this.tilesetTileset,
    ]);
    this.layerRochasR = this.tilemap.createLayer("rochasr", [
      this.tilesetTileset,
    ]);

    this.layerRochasMedias2 = this.tilemap.createLayer("rochasmedias2", [
      this.tilesetTileset,
    ]);
    this.layerRochasMedias = this.tilemap.createLayer("rochasmedias", [
      this.tilesetTileset,
    ]);
    this.layerRochaPontudaEsquerda = this.tilemap.createLayer(
      "rocha-pontuda-esquerda",
      [this.tilesetTileset],
    );
    this.layerRochaPontudaDireita = this.tilemap.createLayer(
      "rocha-pontuda-direita",
      [this.tilesetTileset],
    );
    this.layerPlataformaRandom = this.tilemap.createLayer("plataformar", [
      this.tilesetTileset,
    ]);
    this.layerPlataforma = this.tilemap.createLayer("plataforma", [
      this.tilesetTileset,
    ]);

    this.layerConjunto = this.tilemap.createLayer("conjunto", [
      this.tilesetTileset,
    ]);

    this.laser = this.sound.add("laser");
    this.music = this.sound.add("music", { loop: true }).play();

    this.anims.create({
      key: "walk-up",
      frames: this.anims.generateFrameNumbers("alien", { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-left",
      frames: this.anims.generateFrameNumbers("alien", { start: 8, end: 15 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-right",
      frames: this.anims.generateFrameNumbers("alien", { start: 24, end: 31 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-down",
      frames: this.anims.generateFrameNumbers("alien", { start: 16, end: 23 }),
      frameRate: 10,
      repeat: -1,
    });

    this.alien = this.physics.add.sprite(400, 225, "alien", 20);

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
    this.cameras.main.startFollow(this.alien);

    this.alien.setCollideWorldBounds(true);

    this.layerCeu.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.alien, this.layerCeu);

    this.layerAreia.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.alien, this.layerAreia);

    this.layerChaoEscuro.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.alien, this.layerChaoEscuro);

    this.layerSol.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.alien, this.layerSol);

    this.layerRochasPequenas.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.alien, this.layerRochasPequenas);

    this.layerRochasMinusculas.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.alien, this.layerRochasMinusculas);

    this.layerMontanha2.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.alien, this.layerMontanha2);

    this.layerMontanha1.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.alien, this.layerMontanha1);

    this.layerPlataforma.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.alien, this.layerPlatforma);
    this.layerPlataforma.forEachTile((tile) => {
      if (tile.properties.collides) {
        // left, right, up, down
        tile.setCollision(false, false, true, false);
      }
    });

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
        this.alien.setVelocity(
          this.direction.x * this.speed,
          this.direction.y * this.speed,
        );

        switch (true) {
          case this.joystick.angle >= -135 && this.joystick.angle < -45:
            this.alien.anims.play("walk-up", true);
            break;
          case this.joystick.angle >= -45 && this.joystick.angle < 45:
            this.alien.anims.play("walk-right", true);
            break;
          case this.joystick.angle >= 45 && this.joystick.angle < 135:
            this.alien.anims.play("walk-down", true);
            break;
          case this.joystick.angle >= 135 || this.joystick.angle < -135:
            this.alien.anims.play("walk-left", true);
            break;
        }
      } else {
        this.alien.setVelocity(0, 0);
        this.alien.anims.stop();
      }
    });
  }
}
export default scene0;

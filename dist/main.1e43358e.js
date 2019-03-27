// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/CST.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CST = void 0;
var CST = {
  SCENES: {
    LOAD: "LOAD",
    MENU: "MENU",
    PLAY: "PLAY"
  }
};
exports.CST = CST;
},{}],"src/scenes/LoadScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadScene = void 0;

var _CST = require("../CST");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var LoadScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(LoadScene, _Phaser$Scene);

  function LoadScene() {
    _classCallCheck(this, LoadScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(LoadScene).call(this, {
      key: _CST.CST.SCENES.LOAD
    }));
  }

  _createClass(LoadScene, [{
    key: "init",
    value: function init() {}
  }, {
    key: "preload",
    value: function preload() {
      var _this = this;

      //add Loading image, sound and spritesheet
      this.load.image('key1', './assets/title_bg.jpg');
      this.load.image("StartButton", "./assets/StartButton.png");
      this.load.image("cursor", "./assets/fight.png");
      this.load.image("fire", "./assets/SkillEffect1.png");
      this.load.atlas("angle", "./assets/sprite/angle.png", "./assets/sprite/angle.json");
      this.load.atlas("magic", "./assets/sprite/magic.png", "./assets/sprite/magic.json");
      this.load.atlas("wolf", "./assets/sprite/wolf.png", "./assets/sprite/wolf.json");
      this.load.atlas("building1", "./assets/sprite/buildings/building1.png", "./assets/sprite/buildings/building1_atlas.json");
      this.load.atlas("University", "./assets/sprite/buildings/University.png", "./assets/sprite/buildings/University.json");
      this.load.atlas("pyramid", "./assets/sprite/buildings/pyramid.png", "./assets/sprite/buildings/pyramid.json");
      this.load.atlas("magicstone", "./assets/sprite/buildings/magicstone.png", "./assets/sprite/buildings/magicstone.json");
      this.load.audio("menuMusic", "./assets/music/Rise of spirit.mp3");
      this.load.atlas("sword_in_the_stone", "./assets/sprite/sword_in_the_stone.png", "./assets/sprite/sword_in_the_stone.json");
      this.load.audio("beginsound", "./assets/soundeffect/metal-clash.wav"); //add loading bar

      var loadingBar = this.add.graphics({
        fillStyle: {
          color: 0xffffff
        }
      }); //add Loading event

      this.load.on("progress", function (percent) {
        loadingBar.fillRect(0, _this.game.renderer.height / 2, _this.game.renderer.width * percent, 50);
      });
    }
  }, {
    key: "create",
    value: function create() {
      this.scene.start(_CST.CST.SCENES.MENU);
    }
  }]);

  return LoadScene;
}(Phaser.Scene);

exports.LoadScene = LoadScene;
},{"../CST":"src/CST.js"}],"src/scenes/MenuScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuScene = void 0;

var _CST = require("../CST");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MenuScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(MenuScene, _Phaser$Scene);

  function MenuScene() {
    _classCallCheck(this, MenuScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(MenuScene).call(this, {
      key: _CST.CST.SCENES.MENU
    }));
  }

  _createClass(MenuScene, [{
    key: "init",
    value: function init() {}
  }, {
    key: "create",
    value: function create() {
      var _this = this;

      //add Main menu image
      this.add.image(0, 0, "key1").setOrigin(0, 0).setDepth(0); //add Start Button image

      var startButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "StartButton").setDepth(1); //add background music

      var bgmusic = this.sound.add("menuMusic");
      bgmusic.play();
      var buttonCursor = this.add.image(100, 100, "cursor");
      buttonCursor.setScale(0.03);
      buttonCursor.setVisible(false);
      startButton.setInteractive();
      startButton.on("pointerover", function () {
        buttonCursor.setVisible(true);
        buttonCursor.x = startButton.x - 90;
        buttonCursor.y = startButton.y;
      });
      startButton.on("pointerout", function () {
        buttonCursor.setVisible(false);
      });
      startButton.on("pointerup", function () {
        _this.sound.play("beginsound");

        bgmusic.stop();

        _this.scene.start(_CST.CST.SCENES.PLAY);
      });
    }
  }]);

  return MenuScene;
}(Phaser.Scene);

exports.MenuScene = MenuScene;
},{"../CST":"src/CST.js"}],"src/gameObjects/Projectiles.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bullet = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Bullet =
/*#__PURE__*/
function (_Phaser$GameObjects$I) {
  _inherits(Bullet, _Phaser$GameObjects$I);

  function Bullet(scene) {
    var _this;

    _classCallCheck(this, Bullet);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Bullet).call(this, scene, 0, 0));

    _this.setTexture('Magic_01.png'); //Need to change to actual bullet


    _this.speed = 1;
    _this.angle = 0;
    _this.xSpeed = 1;
    _this.ySpeed = 1;
    _this.timeAlive = 0;
    return _this;
  }

  _createClass(Bullet, [{
    key: "shoot",
    value: function shoot(shooter, mouseX, mouseY) {
      this.timeAlive = 0;
      this.setActive(true);
      this.setVisible(true);
      this.setPosition(shooter.x, shooter.y);
      this.setAngle(shooter.body.rotation); //Shoots in the direciton the player is facing. 

      this.xSpeed = this.speed * Math.sign(shooter.nonZeroVelocity.x);
      this.ySpeed = this.speed * Math.sign(shooter.nonZeroVelocity.y);

      if (this.timeAlive > 2000) {
        this.setActive(false);
        this.setVisible(false);
      }
    }
  }, {
    key: "update",
    value: function update(time, delta) {
      this.timeAlive += delta;
      this.x += this.xSpeed * delta;
      this.y += this.ySpeed * delta;

      if (this.timeAlive > 2000) {
        this.setActive(false); //this.setVisible(false);
      }
    }
  }]);

  return Bullet;
}(Phaser.GameObjects.Image);

exports.Bullet = Bullet;
},{}],"src/gameObjects/Units.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Units = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Units =
/*#__PURE__*/
function (_Phaser$Physics$Arcad) {
  _inherits(Units, _Phaser$Physics$Arcad);

  // init the units properties
  function Units(scene, x, y, name, frame) {
    var _this;

    var healthPoints = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 10;
    var speed = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 1;
    var range = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;

    _classCallCheck(this, Units);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Units).call(this, scene, x, y, name, frame));
    scene.sys.updateList.add(_assertThisInitialized(_this));
    scene.sys.displayList.add(_assertThisInitialized(_this)); //this.setScale(1);

    scene.physics.world.enable(_assertThisInitialized(_this));

    _this.setCollideWorldBounds(true); //this.setImmovable(true);


    _this.healthPoints = healthPoints;
    _this.speed = speed;
    _this.range = range;
    return _this;
  }

  return Units;
}(Phaser.Physics.Arcade.Sprite);

exports.Units = Units;
},{}],"src/gameObjects/Player.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = void 0;

var _Projectiles = require("../gameObjects/Projectiles");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Player =
/*#__PURE__*/
function (_Phaser$Physics$Arcad) {
  _inherits(Player, _Phaser$Physics$Arcad);

  function Player(scene, x, y, key, textureName) {
    var _this;

    var healthPoints = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 100;

    _classCallCheck(this, Player);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Player).call(this, scene, x, y, key, textureName)); //adds to the scenes update and display list

    scene.sys.updateList.add(_assertThisInitialized(_this));
    scene.sys.displayList.add(_assertThisInitialized(_this));

    _this.setOrigin(0, 0);

    _this.nonZeroVelocity = {
      x: 0,
      y: 1
    }; //enables body in the phsyics world in the game

    scene.physics.world.enableBody(_assertThisInitialized(_this));

    _this.createWeapon(scene); //Create intial Healthpoints for the player


    _this.healthPoints = healthPoints;
    scene.input.on('pointerdown', function () {
      //pointerdown event handler
      if (_this.attack) _this.attack();
    });
    return _this;
  }

  _createClass(Player, [{
    key: "createWeapon",
    value: function createWeapon(scene) {
      var _this2 = this;

      var bullets = scene.physics.add.group({
        classType: _Projectiles.Bullet,
        runChildUpdate: true
      });

      this.attack = function () {
        var bullet = bullets.get();
        scene.children.add(bullet);
        bullet.shoot(_this2, scene.input.x, scene.input.y);
      };

      this.removeWeapon = function () {
        //destroys the weapon used
        bullets.destroy();
        _this2.attack = null;
      };
    }
  }, {
    key: "kill",
    value: function kill() {
      //Remove a player so we can handle other things related to the death such as removing the wepopn
      this.removeWeapon();
      this.destroy();
    }
  }]);

  return Player;
}(Phaser.Physics.Arcade.Sprite);

exports.Player = Player;
},{"../gameObjects/Projectiles":"src/gameObjects/Projectiles.js"}],"src/gameObjects/Enemy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Enemy = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Enemy =
/*#__PURE__*/
function (_Phaser$Physics$Arcad) {
  _inherits(Enemy, _Phaser$Physics$Arcad);

  function Enemy(scene, x, y, key, textureName, target) {
    var _this;

    var healthPoints = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 50;

    _classCallCheck(this, Enemy);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Enemy).call(this, scene, x, y, key, textureName, target)); //adds to the scenes update and display list

    scene.sys.updateList.add(_assertThisInitialized(_this));
    scene.sys.displayList.add(_assertThisInitialized(_this));

    _this.setOrigin(0, 0); //enable body in physics game


    scene.physics.world.enableBody(_assertThisInitialized(_this)); //Health

    _this.healthPoints = healthPoints; //setup the movement of the enemy

    _this.setupMovement(scene, target);

    return _this;
  }

  _createClass(Enemy, [{
    key: "setupMovement",
    value: function setupMovement(scene, target) {
      var _this2 = this;

      //sets up the movement funciton that is called by the update method.
      this.moveEnemy = function () {
        scene.physics.moveToObject(_this2, target);
      };
    }
  }, {
    key: "attack",
    value: function attack() {//Add an attack ability.
    }
  }, {
    key: "update",
    value: function update() {
      //We can add a check so if the enemy is within a certain distance of a player it can launch an attack.
      this.moveEnemy();
    }
  }]);

  return Enemy;
}(Phaser.Physics.Arcade.Sprite);

exports.Enemy = Enemy;
},{}],"src/scenes/PlayScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayScene = void 0;

var _CST = require("../CST");

var _Projectiles = require("../gameObjects/Projectiles");

var _Units = require("../gameObjects/Units");

var _Player = require("../gameObjects/Player");

var _Enemy = require("../gameObjects/Enemy");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PlayScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(PlayScene, _Phaser$Scene);

  function PlayScene() {
    _classCallCheck(this, PlayScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(PlayScene).call(this, {
      key: _CST.CST.SCENES.PLAY
    }));
  }

  _createClass(PlayScene, [{
    key: "preload",
    value: function preload() {
      this.load.image("tiles1", "./assets/tiles/map_atlas.png");
      this.load.image("tiles2", "./assets/tiles/map_atlas2.png");
      this.load.tilemapTiledJSON("Mymap", "./assets/map/map.json");
    }
  }, {
    key: "create",
    value: function create() {
      var _this = this;

      //Create an enemygroup with runChildUpdate set to true. Every enemy added to this group will have its update function then called. 
      //Without this groupt the update funciton would not be called for the enemies
      this.enemyGroup = this.add.group({
        runChildUpdate: true
      }); //create phaser game object, and add in sprite

      this.player = new _Player.Player(this, 300, 300, "magic", "Magic_01.png"); //The enemies wolf and angel. 

      this.wolf = new _Enemy.Enemy(this, 100, 100, "wolf", "Wolf_01.png", this.player);
      this.angel = new _Enemy.Enemy(this, 200, 150, "angle", "angle_01.png", this.player);
      this.enemyGroup.add(this.wolf);
      this.enemyGroup.add(this.angel); //adding buildings for each player

      this.building = new _Units.Units(this, 1200, 1200, "building1");
      this.building.setScale(0.15);
      this.University = new _Units.Units(this, 1200, 0, "University");
      this.University.setScale(1.5);
      this.pyramid = new _Units.Units(this, 0, 0, "pyramid");
      this.pyramid.setScale(1.5);
      this.magicstone = new _Units.Units(this, 0, 1200, "magicstone");
      this.magicstone.setScale(1.5); //adding resrouces to the middle 

      this.sword_in_the_stone = new _Units.Units(this, 645, 645, "sword_in_the_stone");
      this.sword_in_the_stone.setScale(0.5);
      this.player.setCollideWorldBounds(true); //create animations for different directions 

      this.anims.create({
        key: "down",
        frameRate: 8,
        //walking downward animation frames
        frames: this.anims.generateFrameNames('magic', {
          start: 1,
          end: 4,
          zeroPad: 2,
          prefix: 'Magic_',
          suffix: '.png'
        }),
        repeat: -1
      });
      this.anims.create({
        key: 'left',
        frameRate: 8,
        //walking left animation frames
        frames: this.anims.generateFrameNames('magic', {
          start: 5,
          end: 8,
          zeroPad: 2,
          prefix: 'Magic_',
          suffix: '.png'
        }),
        repeat: -1
      });
      this.anims.create({
        key: 'right',
        frameRate: 8,
        //walking left animation frames
        frames: this.anims.generateFrameNames('magic', {
          start: 9,
          end: 12,
          zeroPad: 2,
          prefix: 'Magic_',
          suffix: '.png'
        }),
        repeat: -1
      });
      this.anims.create({
        key: 'up',
        frameRate: 8,
        //walking left animation frames
        frames: this.anims.generateFrameNames('magic', {
          start: 13,
          end: 16,
          zeroPad: 2,
          prefix: 'Magic_',
          suffix: '.png'
        }),
        repeat: -1
      }); //input and phyics

      this.keyboard = this.input.keyboard.addKeys("W, A, S, D"); //add in our map

      var Mymap = this.add.tilemap("Mymap");
      var tiles1 = Mymap.addTilesetImage("map_atlas", "tiles1");
      var tiles2 = Mymap.addTilesetImage("map_atlas2", "tiles2"); //display layers

      var groundLayer = Mymap.createStaticLayer("GroundLayer", [tiles1], 0, 0).setDepth(-1);
      var centerLayer = Mymap.createStaticLayer("Center", [tiles2], 0, 0).setDepth(-1);
      var waterLayer = Mymap.createStaticLayer("Water", [tiles1], 0, 0).setDepth(-1);
      var objectLayer = Mymap.createStaticLayer("Objects", [tiles1], 0, 0).setDepth(-1);
      var addonLayer = Mymap.createStaticLayer("AddOn", [tiles1], 0, 0).setDepth(-1); //Camera
      // set bounds to avoid camera goes outside the map

      this.physics.world.setBounds(0, 0, Mymap.widthInPixels, Mymap.heightInPixels); //camera follows the player

      this.cameras.main.startFollow(this.player); //If it gets the character, character dies

      var collider = this.physics.add.overlap(this.wolf, this.player, function (overlaped) {
        //stop when they overplay, kill the player(test)
        overlaped.body.stop();

        _this.player.kill();

        _this.physics.world.removeCollider(collider);
      }, null, this);
    }
  }, {
    key: "update",
    value: function update(time, delta) {
      //key control
      //movement note: we should only be able to move our character when it is alive
      if (this.player.active) {
        if (this.keyboard.W.isDown) {
          this.player.setVelocityY(-64);
          this.player.play("up", true);
        }

        if (this.keyboard.S.isDown) {
          this.player.setVelocityY(64);
          this.player.play("down", true);
        }

        if (this.keyboard.A.isDown) {
          this.player.setVelocityX(-64);
          this.player.play("left", true);
        }

        if (this.keyboard.D.isDown) {
          this.player.setVelocityX(64);
          this.player.play("right", true);
        }

        if (this.keyboard.W.isUp && this.keyboard.S.isUp) {
          this.player.setVelocityY(0);
        }

        if (this.keyboard.A.isUp && this.keyboard.D.isUp) {
          this.player.setVelocityX(0);
        }

        if (this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0) {
          this.player.nonZeroVelocity = {
            x: this.player.body.velocity.x,
            y: this.player.body.velocity.y
          }; //velocity unless the actual velocity is zero then it stores previous nonzero velocity
          //Need this value to keep track of the current direction when player is standing still. Prob will chage this later to direction
        }
      }
    }
  }]);

  return PlayScene;
}(Phaser.Scene);

exports.PlayScene = PlayScene;
},{"../CST":"src/CST.js","../gameObjects/Projectiles":"src/gameObjects/Projectiles.js","../gameObjects/Units":"src/gameObjects/Units.js","../gameObjects/Player":"src/gameObjects/Player.js","../gameObjects/Enemy":"src/gameObjects/Enemy.js"}],"src/main.js":[function(require,module,exports) {
"use strict";

var _LoadScene = require("./scenes/LoadScene");

var _MenuScene = require("./scenes/MenuScene");

var _PlayScene = require("./scenes/PlayScene");

/** @type {import { "../typing/phaser" };} */
var game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  scene: [_LoadScene.LoadScene, _MenuScene.MenuScene, _PlayScene.PlayScene],
  render: {
    pixelArt: true
  }
});
},{"./scenes/LoadScene":"src/scenes/LoadScene.js","./scenes/MenuScene":"src/scenes/MenuScene.js","./scenes/PlayScene":"src/scenes/PlayScene.js"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61318" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.js"], null)
//# sourceMappingURL=/main.1e43358e.js.map
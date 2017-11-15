/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _generator = __webpack_require__(1);

var _generator2 = _interopRequireDefault(_generator);

var _displaySettings = __webpack_require__(2);

var _displaySettings2 = _interopRequireDefault(_displaySettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gen = new _generator2.default();
var disp = new _displaySettings2.default();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*  -- Appendix --
    - class Generator
    - constructor
    - #Init
    - #Logic
    - #Interface
  
    * Sections can be found via #Section!
    * "Cats" is "Categories".
*/

var Generator = function () {
  function Generator() {
    _classCallCheck(this, Generator);

    this.activeCats = [];
    this.data = null;
    this.log = [];
    this.output = document.querySelector('.output__username'); // Tethered to this.username!
    this.history = document.querySelector('.history__log'); // Tethered to this.log!
    this.settings = [];
    this.username = [];
    this.wordCount = 3; // Default, not updated until change is fired.
    this.init();
  }

  /* #Init -- Begin the initialization process; this code only runs once at startup! */

  _createClass(Generator, [{
    key: 'init',
    value: function init() {
      this.getData();
      this.getButtons();
      this.getWordCount();
    }
  }, {
    key: 'getButtons',
    value: function getButtons() {
      this.generate();
      this.toggleOptions('setting', this.settings);
      this.toggleOptions('category', this.activeCats);
    }
  }, {
    key: 'getData',
    value: function getData() {
      var _this = this;

      fetch('./assets/data/collection.json').then(function (response) {
        return response.json();
      }).then(function (data) {
        _this.data = data.category;
        _this.enableCats();
      });
    }
  }, {
    key: 'enableCats',
    value: function enableCats() {
      var _this2 = this;

      this.data.forEach(function (item) {
        _this2.activeCats.push(item.name);
      });
    }

    /* End #Init */
    /* #Logic -- Methods that are called for data manipulation. */

  }, {
    key: 'clearGen',
    value: function clearGen() {
      this.setName();
      this.setOutput('');
    }
  }, {
    key: 'createName',
    value: function createName() {
      var _this3 = this;

      var i = 0;

      var _loop = function _loop() {
        var randCat = _this3.activeCats[Math.floor(Math.random() * _this3.activeCats.length)]; // Pull random available category.
        var dataCat = _this3.data.find(function (arg) {
          // Connect random category to object data.
          return arg.name === randCat;
        });
        var selection = dataCat.content[Math.floor(Math.random() * dataCat.content.length)]; // Select random word from object.
        if (_this3.username.indexOf(selection) === -1) {
          // No repeated words allowed! Decided to force this feature.
          _this3.username.push(selection);
          i++;
        }
      };

      while (i < this.wordCount) {
        _loop();
      }
    }
  }, {
    key: 'setName',
    value: function setName() {
      this.username = [];
    }
  }, {
    key: 'setOutput',
    value: function setOutput(arg) {
      this.output.textContent = arg;
    }
  }, {
    key: 'addLog',
    value: function addLog(arg) {
      if (this.log.length >= 10) {
        this.log.shift();
      }
      this.log.push(arg);
    }
  }, {
    key: 'transformOutput',
    value: function transformOutput(settings) {
      var _this4 = this;

      settings.forEach(function (setting) {
        switch (setting) {
          case 'capsfirst':
            _this4.toCaps('first');
            break;
          case 'capslock':
            _this4.toCaps('lock');
            break;
          case 'capsrandom':
            _this4.toCaps('random');
            break;
          case 'leet':
            _this4.toLeet();
            break;
          case 'title':
            _this4.toTitle();
            break;
        }
      });
      this.username = this.username.join('');
    }
  }, {
    key: 'toCaps',
    value: function toCaps(style) {
      var _this5 = this;

      this.username.forEach(function (word, i) {

        if (style === 'first') {
          // 'capsfirst' is enabled.
          _this5.username[i] = word.charAt(0).toUpperCase() + word.slice(1);
        }

        if (style === 'lock') {
          // 'capslock' is enabled.
          _this5.username[i] = word.toUpperCase();
        }

        if (style === 'random') {
          // 'capsrandom' is enabled.
          var temp = '';
          for (var letter in word) {
            var rand = Math.floor(Math.random() * 2);
            if (rand) {
              temp += word[letter].toUpperCase();
            } else {
              temp += word[letter];
            }
          }
          _this5.username[i] = temp;
        }
      });
    }
  }, {
    key: 'toLeet',
    value: function toLeet() {
      var _this6 = this;

      this.username.forEach(function (word, i) {
        _this6.username[i] = word.replace(/a/gi, '4').replace(/e/gi, '3').replace(/f/gi, 'ph').replace(/i/gi, '1').replace(/t/gi, '7').replace(/o/gi, '0').replace(/s/gi, '5').replace(/ate/gi, '8');
      });
    }
  }, {
    key: 'toTitle',
    value: function toTitle() {
      var title = this.activeCats.find(function (e) {
        return e.name === 'titles';
      });
      var rand = Math.floor(Math.random() * title.content.length);
      this.username[0] = title.content[rand];
    }

    /* End #Logic */
    /* #Interface -- .addEventListener functionality to enable user inputs. */

  }, {
    key: 'generate',
    value: function generate() {
      var _this7 = this;

      document.querySelector('#generate').addEventListener('click', function () {
        _this7.clearGen();
        _this7.createName();
        _this7.transformOutput(_this7.settings);
        _this7.setOutput(_this7.username);
        _this7.addLog(_this7.username);
      });
    }
  }, {
    key: 'toggleOptions',
    value: function toggleOptions(query, arr) {
      var elements = document.querySelectorAll('.' + query);
      elements.forEach(function (element) {
        element.addEventListener('click', function (e) {
          var feature = e.currentTarget;
          var location = arr.indexOf(feature.id);
          if (location === -1) {
            arr.push(feature.id);
          } else {
            arr.splice(location, 1);
          }
          feature.classList.toggle(query + '--enabled'); // Toggle the style!        
        });
      });
    }
  }, {
    key: 'getWordCount',
    value: function getWordCount() {
      var _this8 = this;

      document.querySelector('#wordcount').addEventListener('change', function (e) {
        _this8.wordCount = e.currentTarget.value;
      });
    }

    /* End #Interface */

  }]);

  return Generator;
}();

exports.default = Generator;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* This file is tied into the HTML and CSS, and can function without the generator.js module,
   however, that would be pretty silly, wouldn't it?
*/

var Display = function () {
  function Display() {
    _classCallCheck(this, Display);

    this.container = document.querySelector('.container');
    this.features = document.querySelector('.features');
    this.settingsButton = document.querySelector('.btn--options');
    this.titleHeight = window.getComputedStyle(document.querySelector('.title'), null).getPropertyValue("height"); // Tied to _container.sass to compensate for title height!
    this.init();
  }

  _createClass(Display, [{
    key: 'init',
    value: function init() {
      var _this = this;

      this.settingsButton.addEventListener('click', function (e) {
        _this.features.classList.toggle('features--hidden');
      });
      this.container.style.top = 'calc(50% - ' + this.titleHeight + ')';
    }
  }]);

  return Display;
}();

exports.default = Display;

/***/ })
/******/ ]);
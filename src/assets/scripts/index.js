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

var _display = __webpack_require__(2);

var _display2 = _interopRequireDefault(_display);

var _quotes = __webpack_require__(3);

var _quotes2 = _interopRequireDefault(_quotes);

var _title = __webpack_require__(4);

var _title2 = _interopRequireDefault(_title);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gen = new _generator2.default();
var disp = new _display2.default();
var quote = new _quotes2.default();
var title = new _title2.default();

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
    this.custom = document.querySelector('#custom__input');
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
    key: 'buildCats',
    value: function buildCats(callback) {
      var fragment = document.createDocumentFragment();
      this.data.forEach(function (item) {
        var cat = document.createElement('div'),
            toggle = document.createElement('i'),
            name = item.name;

        toggle.classList.add('fa', 'fa-toggle-on');
        cat.classList.add('category', 'category--enabled');
        cat.id = name;
        cat.textContent = ' ' + name;
        cat.prepend(toggle);
        fragment.appendChild(cat);
      });
      document.querySelector('.features__categories').appendChild(fragment);
      callback(); // Now we can add functionality to our buttons!
    }
  }, {
    key: 'getData',
    value: function getData(callback) {
      var _this = this;

      fetch('./assets/data/collection.json').then(function (response) {
        return response.json();
      }).then(function (data) {
        _this.data = data.category;
        _this.buildCats(function () {
          return _this.getButtons();
        });
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

      var aCLength = this.activeCats.length; // Cached for speed.
      var customs = this.custom.value.replace(/ /g, '').split(',');
      var customsLength = customs.length; // Cached for speed.
      var i = 0;

      var _loop = function _loop() {
        var dataCat = null,
            selection = null,
            randCat = _this3.activeCats[Math.floor(Math.random() * aCLength)];

        /*  From here, we're going to:
              1. Check if custom words were selected (somecustom).
              2a. If somecustom is true, we'll pick a random custom word.
              2b. If somecustom is false, we'll pick a random word from our database.
              3. If this is an unused word, add it to our builder;
                otherwise, repeat the loop without increasing 'i'.
        */

        randCat === 'somecustom' ? selection = customs[Math.floor(Math.random() * customsLength)] // 1 ? 2a.
        : (dataCat = _this3.data.find(function (arg) {
          return arg.name === randCat;
        }), // 2b.
        selection = dataCat.content[Math.floor(Math.random() * dataCat.content.length)]);

        if (_this3.username.indexOf(selection) === -1) {
          // 3.
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
            var nextLetter = word[letter];
            Math.floor(Math.random() * 2) ? temp += nextLetter.toUpperCase() : temp += nextLetter;
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
        try {
          _this7.createName();
          _this7.transformOutput(_this7.settings);
          _this7.setOutput(_this7.username);
          _this7.addLog(_this7.username);
        } catch (err) {
          _this7.setOutput('Pick some words!');
        }
      });
    }
  }, {
    key: 'toggleOptions',
    value: function toggleOptions(query, arr) {
      var elements = document.querySelectorAll('.' + query);
      elements.forEach(function (element) {
        element.addEventListener('click', function (e) {
          var feature = e.currentTarget,
              featureFA = feature.children[0],
              featureID = feature.id,
              location = arr.indexOf(featureID);

          location === -1 ? arr.push(featureID) : arr.splice(location, 1);

          feature.classList.toggle(query + '--enabled'); // Toggle the style!
          featureFA.classList.toggle('fa-toggle-on');
          featureFA.classList.toggle('fa-toggle-off');
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
    this.init();
  }

  _createClass(Display, [{
    key: 'init',
    value: function init() {
      var _this = this;

      this.settingsButton.addEventListener('click', function (e) {
        _this.features.classList.toggle('features--hidden');
      });
    }
  }]);

  return Display;
}();

exports.default = Display;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Quotes = function () {
  function Quotes() {
    _classCallCheck(this, Quotes);

    this.data = [];
    this.getData();
  }

  _createClass(Quotes, [{
    key: 'getData',
    value: function getData() {
      var _this = this;

      fetch('./assets/data/quotes.json').then(function (response) {
        return response.json();
      }).then(function (data) {
        for (var key in data.quotes.quote) {
          _this.data.push(data.quotes.quote[key]);
        }
        _this.triggerOutput();
      });
    }
  }, {
    key: 'triggerOutput',
    value: function triggerOutput() {
      var _this2 = this;

      setInterval(function () {
        var output = _this2.data[Math.floor(Math.random() * _this2.data.length)];
        var quote = document.createElement('p');
        var username = document.querySelector('.output__username').textContent;
        var x = Math.floor(Math.random() * window.innerWidth);
        var y = Math.floor(Math.random() * window.innerHeight);
        output = output.replace('username', username);

        quote.classList.add('quote'); // Build output element.
        quote.style.left = y + 'px';
        quote.style.top = x + 'px';
        quote.textContent = '"' + output + '"';

        document.querySelector('body').append(quote);

        setTimeout(function () {
          quote.classList.add('quote--show');
          setTimeout(function () {
            quote.classList.remove('quote--show');
            setTimeout(function () {
              quote.remove();
            }, 5000); // Destroy output element after x seconds.
          }, 3000); // Hide output after x seconds.
        }, 100); // Toggle fade-in transition on load.
      }, 3000); // Create new element every tick.
    }
  }]);

  return Quotes;
}();

exports.default = Quotes;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Title = function () {
  function Title() {
    _classCallCheck(this, Title);

    this.title = document.querySelector('.title');
    this.colorize();
  }

  _createClass(Title, [{
    key: 'colorize',
    value: function colorize() {
      var _this = this;

      var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
      setInterval(function (e) {
        var select = Math.floor(Math.random() * colors.length);
        _this.title.style.color = colors[select];
      }, 2000);
    }
  }]);

  return Title;
}();

exports.default = Title;

/***/ })
/******/ ]);
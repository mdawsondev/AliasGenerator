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


var _generator = __webpack_require__(2);

var _generator2 = _interopRequireDefault(_generator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gen = new _generator2.default();

/***/ }),
/* 1 */,
/* 2 */
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
    this.output = document.querySelector('.output__username');
    this.settings = ['capsrandom'];
    this.username = [];
    this.wordCount = 3;
    this.init();
  }

  /* #Init -- Begin the initialization process; this code only runs once at startup! */

  _createClass(Generator, [{
    key: 'init',
    value: function init() {
      this.getData();
      this.generate();
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
        _this2.activeCats.push(item);
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
    key: 'transformOutput',
    value: function transformOutput(settings) {
      var _this3 = this;

      settings.forEach(function (setting) {
        switch (setting) {
          case 'capsfirst':
            _this3.toCapsFirst();
            break;
          case 'capslock':
            _this3.toCapsLock();
            break;
          case 'capsrandom':
            _this3.toCapsRandom();
            break;
          case 'leet':
            _this3.toLeet();
            break;
        }
      });
    }
  }, {
    key: 'toCapsFirst',
    value: function toCapsFirst() {
      var _this4 = this;

      this.username.forEach(function (word, i) {
        _this4.username[i] = word.charAt(0).toUpperCase() + word.slice(1);
      });
    }
  }, {
    key: 'toCapsLock',
    value: function toCapsLock() {
      var _this5 = this;

      this.username.forEach(function (word, i) {
        _this5.username[i] = word.toUpperCase();
      });
    }
  }, {
    key: 'toCapsRandom',
    value: function toCapsRandom() {
      var _this6 = this;

      this.username.forEach(function (word, i) {
        var temp = '';
        for (var letter in word) {
          var rand = Math.floor(Math.random() * 2);
          if (rand) {
            temp += word[letter].toUpperCase();
          } else {
            temp += word[letter];
          }
        }
        _this6.username[i] = temp;
      });
    }

    /* End #Logic */
    /* #Interface -- .addEventListener functionality to enable user inputs. */

  }, {
    key: 'generate',
    value: function generate() {
      var _this7 = this;

      document.querySelector('#generate').addEventListener('click', function () {
        _this7.clearGen();
        var i = 0;
        while (i < _this7.wordCount) {
          var randCat = Math.floor(Math.random() * _this7.activeCats.length);
          var randWord = Math.floor(Math.random() * _this7.activeCats[randCat].content.length);
          _this7.username.push(_this7.activeCats[randCat].content[randWord]);
          i++;
        }
        _this7.transformOutput(_this7.settings);
        _this7.setOutput(_this7.username.join(''));
      });
    }

    /* End #Interface */

  }]);

  return Generator;
}();

exports.default = Generator;

/***/ })
/******/ ]);
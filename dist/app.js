(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
    function App() {
        _classCallCheck(this, App);

        this.onLoad = this.onLoad.bind(this);
        this.controller = null;
    }

    _createClass(App, [{
        key: 'onLoad',
        value: function onLoad() {
            this.controller = new _controller2.default();
            this.controller.init();
        }
    }]);

    return App;
}();

var app = new App();
window.onload = function () {
    console.log(window);
    console.log('onload called!!');
    app.onLoad();
};

},{"./controller":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _view = require('./view');

var _view2 = _interopRequireDefault(_view);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
    function Controller() {
        _classCallCheck(this, Controller);

        this.view = new _view2.default();
        this.onGameRowClick = this.onGameRowClick.bind(this);
        this.onRestartClick = this.onRestartClick.bind(this);
        this.onPlayAgainClick = this.onPlayAgainClick.bind(this);
        this.onNoPlayClick = this.onNoPlayClick.bind(this);
        _util2.default.on(this.view.dialogYes, 'click', this.onPlayAgainClick);
        _util2.default.on(this.view.dialogNo, 'click', this.onNoPlayClick);
        this.plays = 0;
    }

    _createClass(Controller, [{
        key: 'onGameRowClick',
        value: function onGameRowClick(e) {
            this.plays++;
            this.view.setRowState(e.currentTarget.getAttribute('data-position') - 1, this.player);
            _util2.default.off(e.currentTarget, 'click', this.onGameRowClick);
            if (this.plays === 9) {
                this.endGame();
            }
        }
    }, {
        key: 'endGame',
        value: function endGame() {
            this.view.setDialogState(true);
        }
    }, {
        key: 'onPlayAgainClick',
        value: function onPlayAgainClick() {
            this.plays = 0;
            _util2.default.off(this.view.restart, 'click', this.onRestartClick);
            this.init();
            this.view.setDialogState(false);
        }
    }, {
        key: 'onNoPlayClick',
        value: function onNoPlayClick() {
            this.view.setDialogState(false);
        }
    }, {
        key: 'init',
        value: function init() {
            var _this = this;

            _util2.default.on(this.view.restart, 'click', this.onRestartClick);
            this.view.rows.forEach(function (row) {
                row.innerHTML = '';
                console.log(row);
                _util2.default.on(row, 'click', _this.onGameRowClick);
            });
        }
    }, {
        key: 'onRestartClick',
        value: function onRestartClick(e) {
            this.plays = 0;
            _util2.default.off(this.view.restart, 'click', this.onRestartClick);
            this.init();
        }
    }, {
        key: 'player',
        get: function get() {
            if (this.plays % 2 > 0) {
                return 'X';
            }
            return 'O';
        }
    }]);

    return Controller;
}();

exports.default = Controller;

},{"./util":3,"./view":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UTIL = function () {
    function UTIL() {
        _classCallCheck(this, UTIL);
    }

    _createClass(UTIL, null, [{
        key: "byId",
        value: function byId(id) {
            return window.document.getElementById(id);
        }
    }, {
        key: "byClass",
        value: function byClass(cls) {
            return window.document.getElementsByClassName(cls);
        }
    }, {
        key: "on",
        value: function on(el, event, cb) {
            el.addEventListener(event, cb);
        }
    }, {
        key: "off",
        value: function off(el, event, cb) {
            el.removeEventListener(event, cb);
        }
    }]);

    return UTIL;
}();

exports.default = UTIL;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameView = function () {
    function GameView() {
        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'board';

        _classCallCheck(this, GameView);

        this.element = _util2.default.byId(id);
        console.log(this.element);
        this._rows = this.element.getElementsByTagName('td');
        this.rows = this.formatRows();
        this.restart = _util2.default.byId('btnRestart');
        this.dialog = _util2.default.byId('gameModal');
        this.dialogYes = _util2.default.byId('btnDialogYes');
        this.dialogNo = _util2.default.byId('btnDialogNo');
        console.log(this._rows);
    }

    _createClass(GameView, [{
        key: 'setRowState',
        value: function setRowState(i, text) {
            this.rows[i].innerHTML = text;
        }
    }, {
        key: 'setDialogState',
        value: function setDialogState(open) {
            this.dialog.style.display = open ? 'block' : 'none';
        }
    }, {
        key: 'formatRows',
        value: function formatRows() {
            var ar = [];
            for (var i = 0; i < this._rows.length; i++) {
                ar[i] = this._rows.item(i);
            }
            return ar;
        }
    }]);

    return GameView;
}();

exports.default = GameView;

},{"./util":3}]},{},[1]);

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _newPoem = __webpack_require__(1);
	
	var _newPoem2 = _interopRequireDefault(_newPoem);
	
	var _editPoem = __webpack_require__(2);
	
	var _editPoem2 = _interopRequireDefault(_editPoem);
	
	var _trash = __webpack_require__(3);
	
	var _trash2 = _interopRequireDefault(_trash);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Main = function (_React$Component) {
	  _inherits(Main, _React$Component);
	
	  function Main(props) {
	    _classCallCheck(this, Main);
	
	    var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));
	
	    _this.state = {
	      activeTab: 0
	    };
	    _this.changeTab = _this.changeTab().bind(_this);
	    return _this;
	  }
	
	  _createClass(Main, [{
	    key: 'changeTab',
	    value: function changeTab(index) {
	      this.setState({
	        activeTab: index
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var changeTab = this.state.changeTab;
	
	      return React.createElement(
	        'div',
	        { className: 'container' },
	        React.createElement(
	          'div',
	          { className: 'active-user' },
	          React.createElement(
	            'div',
	            { className: 'active-user-name' },
	            'admin'
	          ),
	          React.createElement('i', { className: 'icon-user' })
	        ),
	        React.createElement(
	          'div',
	          { className: 'workspace' },
	          React.createElement(
	            'ul',
	            { className: 'menu' },
	            React.createElement(
	              'li',
	              { className: 'active' },
	              'New poem',
	              React.createElement('i', { className: 'icon-circle-plus' })
	            ),
	            React.createElement(
	              'li',
	              null,
	              'Poems list',
	              React.createElement('i', { className: 'icon-list' })
	            ),
	            React.createElement(
	              'li',
	              null,
	              'Recycle',
	              React.createElement('i', { className: 'icon-trash' })
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'poem-editing' },
	            React.createElement(
	              'form',
	              { action: '/newPoem', className: 'new-poem' },
	              React.createElement('input', { type: 'text', className: 'poem-title', name: 'poem-title', placeholder: 'Title' }),
	              React.createElement('textarea', { name: 'poem', className: 'poem-body', cols: '30', rows: '10', placeholder: 'Enter your poem here' }),
	              React.createElement(
	                'div',
	                { className: 'date-and-submit' },
	                React.createElement('input', { type: 'date', className: 'poem-date', name: 'poem-date' }),
	                React.createElement('input', { type: 'submit', className: 'submit', value: 'Save' })
	              )
	            )
	          )
	        ),
	        React.createElement('div', { className: 'poem-list' })
	      );
	    }
	  }]);
	
	  return Main;
	}(React.Component);
	
	ReactDOM.render(React.createElement(Main, null), document.querySelector('#root'));

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var New = exports.New = function (_React$Component) {
	  _inherits(New, _React$Component);
	
	  function New(props) {
	    _classCallCheck(this, New);
	
	    return _possibleConstructorReturn(this, (New.__proto__ || Object.getPrototypeOf(New)).call(this, props));
	  }
	
	  return New;
	}(React.Component);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Edit = exports.Edit = function (_React$Component) {
	  _inherits(Edit, _React$Component);
	
	  function Edit(props) {
	    _classCallCheck(this, Edit);
	
	    return _possibleConstructorReturn(this, (Edit.__proto__ || Object.getPrototypeOf(Edit)).call(this, props));
	  }
	
	  return Edit;
	}(React.Component);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Trash = exports.Trash = function (_React$Component) {
	  _inherits(Trash, _React$Component);
	
	  function Trash(props) {
	    _classCallCheck(this, Trash);
	
	    return _possibleConstructorReturn(this, (Trash.__proto__ || Object.getPrototypeOf(Trash)).call(this, props));
	  }
	
	  return Trash;
	}(React.Component);

/***/ })
/******/ ]);
//# sourceMappingURL=script.js.map
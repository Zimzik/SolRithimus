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
	
	var Tabs = function (_React$Component) {
	  _inherits(Tabs, _React$Component);
	
	  function Tabs(props) {
	    _classCallCheck(this, Tabs);
	
	    return _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));
	  }
	
	  _createClass(Tabs, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          activeTab = _props.activeTab,
	          changeTab = _props.changeTab;
	
	      var tabs = [{ title: "New poem", tabsClass: "icon-circle-plus" }, { title: "Poems list", tabsClass: "icon-list" }, { title: "Recycle", tabsClass: "icon-trash" }];
	      var tabsTemplate = tabs.map(function (el, index) {
	        return React.createElement(
	          'li',
	          { className: activeTab === index ? "active" : "",
	            onClick: function onClick() {
	              changeTab(index);
	            },
	            key: index },
	          el.title,
	          React.createElement('i', { className: el.tabsClass })
	        );
	      });
	
	      return React.createElement(
	        'ul',
	        { className: 'menu' },
	        tabsTemplate
	      );
	    }
	  }]);
	
	  return Tabs;
	}(React.Component);
	
	var Main = function (_React$Component2) {
	  _inherits(Main, _React$Component2);
	
	  function Main(props) {
	    _classCallCheck(this, Main);
	
	    var _this2 = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));
	
	    _this2.state = {
	      activeTab: 0
	    };
	    _this2.changeTab = _this2.changeTab.bind(_this2);
	    return _this2;
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
	      var activeTab = this.state.activeTab;
	
	      var RenderingTab = void 0;
	      switch (activeTab) {
	        case 0:
	          RenderingTab = _newPoem2.default;
	          break;
	        case 1:
	          RenderingTab = _editPoem2.default;
	          break;
	        case 2:
	          RenderingTab = _trash2.default;
	          break;
	      }
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
	          React.createElement(Tabs, { changeTab: this.changeTab, activeTab: activeTab }),
	          React.createElement(
	            'div',
	            { className: 'workfield' },
	            React.createElement(RenderingTab, null)
	          )
	        )
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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var New = function (_React$Component) {
	  _inherits(New, _React$Component);
	
	  function New(props) {
	    _classCallCheck(this, New);
	
	    var _this = _possibleConstructorReturn(this, (New.__proto__ || Object.getPrototypeOf(New)).call(this, props));
	
	    _this.onSubmit = _this.onSubmit.bind(_this);
	    return _this;
	  }
	
	  _createClass(New, [{
	    key: "onSubmit",
	    value: function onSubmit() {}
	  }, {
	    key: "render",
	    value: function render() {
	      return React.createElement(
	        "div",
	        { className: "poem-creating" },
	        React.createElement(
	          "form",
	          { action: "/newPoem", className: "new-poem" },
	          React.createElement("input", { type: "text", className: "poem-title", name: "poem-title", placeholder: "Title" }),
	          React.createElement("textarea", { name: "poem", className: "poem-body", cols: "30", rows: "10", placeholder: "Enter your poem here" }),
	          React.createElement(
	            "div",
	            { className: "date-and-submit" },
	            React.createElement("input", { type: "date", className: "poem-date", name: "poem-date" }),
	            React.createElement("input", { type: "submit", className: "submit", value: "Save", onClick: function onClick() {
	                return onSubmit();
	              } })
	          )
	        ),
	        React.createElement(
	          "div",
	          { className: "message" },
	          "Poem has been successfully saved on db."
	        )
	      );
	    }
	  }]);
	
	  return New;
	}(React.Component);
	
	exports.default = New;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var poems = [{ title: 'Sol rithimius',
	  date: '22 грудня, 2017',
	  img: 'img/pics/poem1.png',
	  poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n' }, { title: 'Viridi ligno',
	  date: '11 червня, 2017',
	  img: 'img/pics/poem2.png',
	  poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n' }, { title: 'Igens papiliomen',
	  date: '6 вересня, 2017',
	  img: 'img/pics/poem3.png',
	  poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n' }, { title: 'Bruin ursi',
	  date: '19 жовтня, 2017',
	  img: 'img/pics/poem4.png',
	  poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n' }, { title: 'Holey medius soccus',
	  date: '1 квітня, 2017',
	  img: 'img/pics/poem5.png',
	  poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n' }, { title: 'Puer laetanem',
	  date: '20 січня, 2017',
	  img: 'img/pics/poem6.png',
	  poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n' }, { title: 'Delecamenti popon',
	  date: '9 вересня, 2017',
	  img: 'img/pics/poem7.png',
	  poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n' }, { title: 'Palmam lingo',
	  date: '15 липня, 2017',
	  img: 'img/pics/poem8.png',
	  poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n' }, { title: 'Solis occasum',
	  date: '30 червня, 2017',
	  img: 'img/pics/poem9.png',
	  poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n' }, { title: 'Poem1',
	  date: '22.12.1988',
	  img: 'img/pics/poem1.png',
	  poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n' }, { title: 'Poem1',
	  date: '22.12.1988',
	  img: 'img/pics/poem1.png',
	  poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n' }, { title: 'Poem1',
	  date: '22.12.1988',
	  img: 'img/pics/poem1.png',
	  poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n' }, { title: 'Poem1',
	  date: '22.12.1988',
	  img: 'img/pics/poem1.png',
	  poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n' }, { title: 'Poem1',
	  date: '22.12.1988',
	  img: 'img/pics/poem1.png',
	  poem: 'Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n   Lorem ipsum dolor sit amet, consectetur. \n' }];
	
	var PoemsList = function (_React$Component) {
	  _inherits(PoemsList, _React$Component);
	
	  function PoemsList(props) {
	    _classCallCheck(this, PoemsList);
	
	    return _possibleConstructorReturn(this, (PoemsList.__proto__ || Object.getPrototypeOf(PoemsList)).call(this, props));
	  }
	
	  _createClass(PoemsList, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          poemsList = _props.poemsList,
	          onPoemClick = _props.onPoemClick,
	          activePoemIndex = _props.activePoemIndex,
	          editingPoemIndex = _props.editingPoemIndex,
	          editingPoemClick = _props.editingPoemClick;
	
	      var poemsTemplate = poemsList.map(function (el, index) {
	        return React.createElement(
	          'div',
	          { key: index,
	            className: activePoemIndex === index ? 'poem activePoem' : 'poem',
	            onClick: function onClick() {
	              return onPoemClick(index);
	            }, id: index },
	          React.createElement('img', { src: el.img }),
	          React.createElement(
	            'div',
	            { className: 'poemInfo' },
	            React.createElement(
	              'p',
	              { className: 'poemTitle' },
	              el.title
	            ),
	            React.createElement(
	              'p',
	              { className: 'poemDate' },
	              el.date
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'editButtons' },
	            React.createElement('i', { className: 'icon-edit', title: '\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438', onClick: function onClick() {
	                return editingPoemClick(index);
	              } }),
	            React.createElement('i', { className: 'icon-trash', title: '\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438' })
	          )
	        );
	      });
	
	      return React.createElement(
	        'div',
	        { className: 'poemsList' },
	        React.createElement('div', { className: editingPoemIndex == -1 ? "" : "poemBlocking" }),
	        React.createElement(
	          'h2',
	          null,
	          '\u0421\u043F\u0438\u0441\u043E\u043A \u0432\u0456\u0440\u0448\u0456\u0432:'
	        ),
	        React.createElement(
	          'div',
	          { className: 'poemsListField' },
	          poemsTemplate
	        )
	      );
	    }
	  }]);
	
	  return PoemsList;
	}(React.Component);
	
	var PoemBlock = function (_React$Component2) {
	  _inherits(PoemBlock, _React$Component2);
	
	  function PoemBlock(props) {
	    _classCallCheck(this, PoemBlock);
	
	    return _possibleConstructorReturn(this, (PoemBlock.__proto__ || Object.getPrototypeOf(PoemBlock)).call(this, props));
	  }
	
	  _createClass(PoemBlock, [{
	    key: 'render',
	    value: function render() {
	      var PoemPresentTemplate = void 0;
	      var _props2 = this.props,
	          activePoem = _props2.activePoem,
	          editingPoemIndex = _props2.editingPoemIndex,
	          editingPoem = _props2.editingPoem,
	          cancelChange = _props2.cancelChange;
	
	
	      if (activePoem && editingPoemIndex > -1) {
	        PoemPresentTemplate = React.createElement(
	          'form',
	          { className: 'poemBlock', action: '/editPoem' },
	          React.createElement(
	            'div',
	            { className: 'poemInfo' },
	            React.createElement('input', { type: 'text', className: 'titleEdit', defaultValue: editingPoem.title }),
	            React.createElement('textarea', { className: 'bodyEdit', defaultValue: editingPoem.poem }),
	            React.createElement(
	              'div',
	              { className: 'date-and-submit' },
	              React.createElement('input', { type: 'text', className: 'dateEdit', defaultValue: editingPoem.date }),
	              React.createElement('input', { type: 'submit', className: 'savePoem', value: '\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438' }),
	              React.createElement('input', { type: 'button', value: '\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438', onClick: function onClick() {
	                  return cancelChange();
	                } })
	            )
	          )
	        );
	      } else {
	        if (activePoem && editingPoemIndex == -1) {
	          PoemPresentTemplate = React.createElement(
	            'div',
	            { className: 'poemBlock' },
	            React.createElement(
	              'div',
	              { className: 'poemInfo' },
	              React.createElement(
	                'h2',
	                { className: 'title' },
	                activePoem.title
	              ),
	              React.createElement(
	                'p',
	                { className: 'poemsBody' },
	                activePoem.poem
	              ),
	              React.createElement(
	                'p',
	                { className: 'poemsDate' },
	                activePoem.date
	              )
	            )
	          );
	        } else {
	          PoemPresentTemplate = React.createElement(
	            'div',
	            { className: 'poemBlock' },
	            React.createElement(
	              'div',
	              { className: 'poemInfo' },
	              React.createElement(
	                'h2',
	                { className: 'title' },
	                '\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A'
	              ),
	              React.createElement(
	                'p',
	                { className: 'poemsBody' },
	                '\u0412\u0456\u0440\u0448'
	              ),
	              React.createElement(
	                'p',
	                { className: 'poemsDate' },
	                '\u0414\u0430\u0442\u0430'
	              )
	            )
	          );
	        }
	      }
	
	      return React.createElement(
	        'div',
	        { className: 'poemPresent' },
	        PoemPresentTemplate
	      );
	    }
	  }]);
	
	  return PoemBlock;
	}(React.Component);
	
	var Edit = function (_React$Component3) {
	  _inherits(Edit, _React$Component3);
	
	  function Edit(props) {
	    _classCallCheck(this, Edit);
	
	    var _this3 = _possibleConstructorReturn(this, (Edit.__proto__ || Object.getPrototypeOf(Edit)).call(this, props));
	
	    _this3.state = {
	      activePoem: -1,
	      poemsList: [],
	      editingPoem: -1,
	      editingPoemIndex: -1
	    };
	    _this3.onPoemClick = _this3.onPoemClick.bind(_this3);
	    _this3.editingPoemClick = _this3.editingPoemClick.bind(_this3);
	    _this3.cancelChange = _this3.cancelChange.bind(_this3);
	    return _this3;
	  }
	
	  _createClass(Edit, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      // TODO: add server call to retrieve poems list
	      this.setState({ poemsList: poems });
	    }
	  }, {
	    key: 'onPoemClick',
	    value: function onPoemClick(poemIndex) {
	      this.setState({ activePoemIndex: poemIndex });
	    }
	  }, {
	    key: 'editingPoemClick',
	    value: function editingPoemClick(poemIndex) {
	      this.setState({ editingPoemIndex: poemIndex });
	    }
	  }, {
	    key: 'cancelChange',
	    value: function cancelChange() {
	      this.setState({
	        editingPoemIndex: -1
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _state = this.state,
	          poemsList = _state.poemsList,
	          activePoemIndex = _state.activePoemIndex,
	          editingPoemIndex = _state.editingPoemIndex,
	          cancelChange = _state.cancelChange;
	
	
	      return React.createElement(
	        'div',
	        { className: 'poems-show' },
	        React.createElement(PoemBlock, {
	          activePoem: activePoemIndex !== -1 ? poemsList[activePoemIndex] : null,
	          editingPoem: editingPoemIndex !== -1 ? poemsList[editingPoemIndex] : null,
	          cancelChange: this.cancelChange,
	          editingPoemIndex: editingPoemIndex
	        }),
	        React.createElement(PoemsList, {
	          poemsList: poemsList,
	          onPoemClick: this.onPoemClick,
	          editingPoemClick: this.editingPoemClick,
	          activePoemIndex: activePoemIndex,
	          editingPoemIndex: editingPoemIndex })
	      );
	    }
	  }]);
	
	  return Edit;
	}(React.Component);
	
	exports.default = Edit;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Trash = function (_React$Component) {
	  _inherits(Trash, _React$Component);
	
	  function Trash(props) {
	    _classCallCheck(this, Trash);
	
	    return _possibleConstructorReturn(this, (Trash.__proto__ || Object.getPrototypeOf(Trash)).call(this, props));
	  }
	
	  _createClass(Trash, [{
	    key: "render",
	    value: function render() {
	      return React.createElement("div", null);
	    }
	  }]);
	
	  return Trash;
	}(React.Component);
	
	exports.default = Trash;

/***/ })
/******/ ]);
//# sourceMappingURL=script.js.map
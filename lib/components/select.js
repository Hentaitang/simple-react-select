"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

require("../simple-react-select.css");

require("./svg");

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};

var myGlobalSetTimeOut = null;

var debounce = function debounce(fn, args) {
  clearTimeout(myGlobalSetTimeOut);
  myGlobalSetTimeOut = setTimeout(function () {
    return fn(args);
  }, 300);
};

var component = (0, _react.memo)(__signature__(function (_ref) {
  var children = _ref.children,
      placeholder = _ref.placeholder,
      select = _ref.select,
      onSelectChange = _ref.onSelectChange,
      noOptionsText = _ref.noOptionsText,
      optionsIsLoading = _ref.optionsIsLoading,
      loadingText = _ref.loadingText,
      loadingIcon = _ref.loadingIcon,
      style = _ref.style;
  var stateInputValue = (0, _react.useState)('');
  var stateInputWidth = (0, _react.useState)(2);
  var stateIsShowList = (0, _react.useState)(false);
  var stateSelectList = (0, _react.useState)(null);
  var stateIsfocus = (0, _react.useState)(false);
  var selectRef = (0, _react.useRef)(null);
  var inputRef = (0, _react.useRef)(null);
  var fakeInputRef = (0, _react.useRef)(null);
  var stateCurrentItemIndex = (0, _react.useState)(0);
  var listWrapRef = (0, _react.useRef)(null);
  var listRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    stateSelectList[1](children);
  }, [children]); ///////////////////
  // click outside //
  ///////////////////

  var outSideClick = (0, _react.useCallback)(function (e) {
    if (selectRef.current && !selectRef.current.contains(e.target)) {
      stateIsShowList[1](false);
      stateIsfocus[1](false);
      stateInputValue[1]('');
    }
  }, []);
  (0, _react.useEffect)(function () {
    document.addEventListener('click', outSideClick);
    return function () {
      document.removeEventListener('click', outSideClick);
    };
  }, []); //////////////////
  // input change //
  //////////////////

  (0, _react.useEffect)(function () {
    stateInputWidth[1](fakeInputRef.current.clientWidth ? fakeInputRef.current.clientWidth + 2 : 2);

    if (stateSelectList[0] && stateInputValue[0]) {
      var filterArray = [];
      children.forEach(function (item) {
        item.props.value.toString().toLowerCase().indexOf(stateInputValue[0]) >= 0 ? filterArray.push(item) : '';
      });
      stateSelectList[1](filterArray);
      stateCurrentItemIndex[1](0);
    } else {
      stateSelectList[1](children);
      children && children.length ? children.forEach(function (child, index) {
        child.props.value === select ? stateCurrentItemIndex[1](index) : '';
      }) : '';
    }
  }, [stateInputValue[0], children]); ///////////////////
  // input keydown //
  ///////////////////

  var handleKeyDown = (0, _react.useCallback)(function (e) {
    if (stateIsShowList[0] && stateSelectList[0]) {
      switch (e.keyCode) {
        case 13:
        case 32:
          if (stateSelectList[0].length && stateSelectList[0][stateCurrentItemIndex[0]].props.disabled) return;
          stateIsShowList[1](false);
          stateInputValue[1]('');
          stateSelectList[0].length && onSelectChange(stateSelectList[0][stateCurrentItemIndex[0]].props.value);
          break;

        case 27:
          stateIsShowList[1](false);
          stateInputValue[1]('');
          break;

        case 38:
          e.preventDefault();

          if (stateCurrentItemIndex[0] > 0) {
            var listPosition = listRef.current.getBoundingClientRect();
            var listWrapPosition = listWrapRef.current.getBoundingClientRect();
            var difference = listPosition.top - listWrapPosition.top;
            stateCurrentItemIndex[1](stateCurrentItemIndex[0] - 1);

            if (difference < listPosition.height) {
              listWrapRef.current.scrollBy(0, -(listPosition.height - difference + 6));
            }
          }

          break;

        case 40:
          e.preventDefault();

          if (stateCurrentItemIndex[0] < stateSelectList[0].length - 1) {
            var _listPosition = listRef.current.getBoundingClientRect();

            var _listWrapPosition = listWrapRef.current.getBoundingClientRect();

            var _difference = _listWrapPosition.bottom - _listPosition.bottom;

            stateCurrentItemIndex[1](stateCurrentItemIndex[0] + 1);

            if (_difference < _listPosition.height) {
              listWrapRef.current.scrollBy(0, _listPosition.height - _difference + 6);
            }
          }

          break;

        default: // console.log(1);

      }
    } else {
      if (e.keyCode !== 27) {
        stateIsShowList[1](true);
        stateIsfocus[1](true);
      }
    }
  }); ///////////////
  // list html //
  ///////////////

  var listHtml;

  if (optionsIsLoading) {
    listHtml = _react["default"].createElement("li", {
      className: 'loadingItem'
    }, loadingIcon ? _react["default"].createElement("div", {
      className: 'loadingIcon'
    }, _react["default"].createElement("svg", {
      "aria-hidden": "true",
      width: "14px",
      height: "14px"
    }, _react["default"].createElement("use", {
      xlinkHref: "#icon-loading"
    }))) : '', loadingText ? loadingText : 'Loading...');
  } else {
    if (stateSelectList[0] && stateSelectList[0].length) {
      listHtml = stateSelectList[0].map(function (child, index) {
        return _react["default"].createElement("li", {
          style: {
            backgroundColor: stateCurrentItemIndex[0] === index ? '#f5f7fa' : '',
            color: child.props.disabled ? '#d9d9d9' : select === child.props.value ? '#409eff' : '',
            cursor: child.props.disabled ? 'not-allowed' : ''
          },
          ref: function ref(_ref2) {
            stateCurrentItemIndex[0] === index ? listRef.current = _ref2 : '';
          },
          className: 'selectListItem',
          key: child.key,
          onClick: function onClick() {
            if (child.props.disabled) return;
            stateIsShowList[1](false);
            stateInputValue[1]('');
            onSelectChange(child.props.value);
          },
          onMouseEnter: function onMouseEnter() {
            return stateCurrentItemIndex[1](index);
          }
        }, child);
      });
    } else {
      listHtml = _react["default"].createElement("li", {
        className: 'noItem'
      }, noOptionsText ? noOptionsText : 'No options');
    }
  }

  return _react["default"].createElement("div", {
    className: 'selectWrapper',
    ref: selectRef,
    style: {
      width: style && style.width ? style.width : ''
    }
  }, _react["default"].createElement("div", {
    className: "inputWrapper ".concat(stateIsfocus[0] ? 'focus' : ''),
    style: {
      paddingRight: stateInputValue[0] ? '60px' : ''
    },
    onClick: function onClick() {
      stateIsShowList[1](true);
      stateIsfocus[1](true);
      inputRef.current.focus();
    }
  }, _react["default"].createElement("input", {
    className: 'myInput',
    type: "text",
    value: stateInputValue[0],
    ref: inputRef,
    style: {
      width: "".concat(stateInputWidth[0], "px")
    },
    onChange: function onChange(e) {
      return stateInputValue[1](e.currentTarget.value.trim());
    },
    onFocus: function onFocus() {
      return stateIsfocus[1](true);
    },
    onKeyDown: function onKeyDown(e) {
      return handleKeyDown(e);
    }
  }), _react["default"].createElement("div", {
    ref: fakeInputRef,
    className: 'fakeInput'
  }, stateInputValue[0]), !stateInputValue[0] && select ? _react["default"].createElement("div", {
    className: 'selectValue'
  }, select) : '', !stateInputValue[0] && !select ? _react["default"].createElement("div", {
    className: 'placeholder'
  }, placeholder ? placeholder : 'Select...') : '', stateInputValue[0] && _react["default"].createElement("svg", {
    "aria-hidden": "true",
    width: "16px",
    height: "16px",
    className: 'clearAllIcon',
    onMouseUp: function onMouseUp() {
      inputRef.current.focus();
      stateInputValue[1]('');
    }
  }, _react["default"].createElement("use", {
    xlinkHref: "#icon-close-circle"
  })), _react["default"].createElement("svg", {
    "aria-hidden": "true",
    width: "16px",
    height: "16px",
    className: 'dropdownIcon',
    onClick: function onClick(e) {
      e.stopPropagation();
      inputRef.current.focus();
      stateInputValue[1]('');
      stateIsShowList[1](!stateIsShowList[0]);
    }
  }, _react["default"].createElement("use", {
    xlinkHref: "#icon-down"
  }))), stateIsShowList[0] ? _react["default"].createElement("div", {
    className: 'selectListWrapper',
    ref: listWrapRef,
    style: {
      maxHeight: style && style.maxHeight ? style.maxHeight : ''
    }
  }, _react["default"].createElement("ul", {
    className: 'selectList'
  }, listHtml)) : '');
}, "useState{stateInputValue('')}\nuseState{stateInputWidth(2)}\nuseState{stateIsShowList(false)}\nuseState{stateSelectList(null)}\nuseState{stateIsfocus(false)}\nuseRef{selectRef}\nuseRef{inputRef}\nuseRef{fakeInputRef}\nuseState{stateCurrentItemIndex(0)}\nuseRef{listWrapRef}\nuseRef{listRef}\nuseEffect{}\nuseCallback{outSideClick}\nuseEffect{}\nuseEffect{}\nuseCallback{handleKeyDown}"));
var _default = component;
var _default2 = _default;
exports["default"] = _default2;
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(myGlobalSetTimeOut, "myGlobalSetTimeOut", "/Users/linzhixing/linzhixing/repository/react-select/src/select/select.js");
  reactHotLoader.register(debounce, "debounce", "/Users/linzhixing/linzhixing/repository/react-select/src/select/select.js");
  reactHotLoader.register(component, "component", "/Users/linzhixing/linzhixing/repository/react-select/src/select/select.js");
  reactHotLoader.register(_default, "default", "/Users/linzhixing/linzhixing/repository/react-select/src/select/select.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
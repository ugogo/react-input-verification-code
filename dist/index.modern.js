import { useState, createRef, useMemo, useEffect, createElement, Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var GlobalStyle = createGlobalStyle(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n  :root {\n    --ReactInputVerificationCode-itemWidth: 4.5rem;\n    --ReactInputVerificationCode-itemHeight: 5rem;\n    --ReactInputVerificationCode-itemSpacing: 1rem;\n  }\n"])));
var Container = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["\n  display: flex;\n  position: relative;\n  justify-content: space-between;\n  width: ", ";\n"])), function (_ref) {
  var itemscount = _ref.itemscount;
  return "calc(\n      var(--ReactInputVerificationCode-itemWidth) * " + itemscount + "\n      + var(--ReactInputVerificationCode-itemSpacing) * (" + itemscount + " - 1)\n    )";
});
var Input = styled.input(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["\n  position: absolute;\n  top: 0;\n  left: ", ";\n  opacity: 0;\n  width: var(--ReactInputVerificationCode-itemWidth);\n  height: var(--ReactInputVerificationCode-itemHeight);\n"])), function (_ref2) {
  var activeindex = _ref2.activeindex;
  return "calc(\n      var(--ReactInputVerificationCode-itemWidth) * " + activeindex + "\n      + var(--ReactInputVerificationCode-itemSpacing) * " + activeindex + "\n    )";
});
var Item = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteralLoose(["\n  width: var(--ReactInputVerificationCode-itemWidth);\n  height: var(--ReactInputVerificationCode-itemHeight);\n  padding: 0;\n  border-radius: 4px;\n  font-size: 1.5rem;\n  font-weight: 800;\n  line-height: var(--ReactInputVerificationCode-itemHeight);\n  text-align: center;\n  border: 0;\n  box-shadow: inset 0 0 0 1px #ccc;\n  transition: box-shadow 0.2s ease-out;\n\n  &.is-active {\n    box-shadow: inset 0 0 0 2px #888;\n  }\n"])));

var KEY_CODE = {
  BACKSPACE: 8,
  ARROW_LEFT: 37,
  ARROW_RIGHT: 39,
  DELETE: 46
};

var ReactInputVerificationCode = function ReactInputVerificationCode(_ref) {
  var _ref$autoFocus = _ref.autoFocus,
      autoFocus = _ref$autoFocus === void 0 ? false : _ref$autoFocus,
      _ref$length = _ref.length,
      length = _ref$length === void 0 ? 4 : _ref$length,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
      _ref$onCompleted = _ref.onCompleted,
      onCompleted = _ref$onCompleted === void 0 ? function () {} : _ref$onCompleted,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? '·' : _ref$placeholder,
      pValue = _ref.value,
      _ref$dataCy = _ref.dataCy,
      dataCy = _ref$dataCy === void 0 ? 'verification-code' : _ref$dataCy,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'text' : _ref$type,
      _ref$passwordMask = _ref.passwordMask,
      passwordMask = _ref$passwordMask === void 0 ? '•' : _ref$passwordMask;
  var emptyValue = new Array(length).fill(placeholder);

  var _React$useState = useState(-1),
      activeIndex = _React$useState[0],
      setActiveIndex = _React$useState[1];

  var _React$useState2 = useState(pValue ? pValue.split('') : emptyValue),
      value = _React$useState2[0],
      setValue = _React$useState2[1];

  var codeInputRef = createRef();
  var itemsRef = useMemo(function () {
    return new Array(length).fill(null).map(function () {
      return createRef();
    });
  }, [length]);
  var isCodeRegex = new RegExp("^[0-9]{" + length + "}$");

  var getItem = function getItem(index) {
    var _itemsRef$index;

    return (_itemsRef$index = itemsRef[index]) === null || _itemsRef$index === void 0 ? void 0 : _itemsRef$index.current;
  };

  var focusItem = function focusItem(index) {
    var _getItem;

    return (_getItem = getItem(index)) === null || _getItem === void 0 ? void 0 : _getItem.focus();
  };

  var blurItem = function blurItem(index) {
    var _getItem2;

    return (_getItem2 = getItem(index)) === null || _getItem2 === void 0 ? void 0 : _getItem2.blur();
  };

  var onItemFocus = function onItemFocus(index) {
    return function () {
      setActiveIndex(index);
      if (codeInputRef.current) codeInputRef.current.focus();
    };
  };

  var onInputKeyUp = function onInputKeyUp(_ref2) {
    var key = _ref2.key,
        keyCode = _ref2.keyCode;
    var newValue = [].concat(value);
    var nextIndex = activeIndex + 1;
    var prevIndex = activeIndex - 1;
    var codeInput = codeInputRef.current;
    var currentItem = getItem(activeIndex);
    var isLast = nextIndex === length;
    var isDeleting = keyCode === KEY_CODE.DELETE || keyCode === KEY_CODE.BACKSPACE;

    if (isDeleting) {
      newValue[activeIndex] = placeholder;
      setValue(newValue);

      if (activeIndex > 0) {
        setActiveIndex(prevIndex);
        focusItem(prevIndex);
      }

      return;
    }

    if (Number.isNaN(+key)) return;
    if (codeInput) codeInput.value = '';
    newValue[activeIndex] = key;
    setValue(newValue);

    if (!isLast) {
      setActiveIndex(nextIndex);
      focusItem(nextIndex);
      return;
    }

    if (codeInput) codeInput.blur();
    if (currentItem) currentItem.blur();
    setActiveIndex(-1);
  };

  var onInputChange = function onInputChange(e) {
    var changeValue = e.target.value;
    var isCode = isCodeRegex.test(changeValue);
    if (!isCode) return;
    setValue(changeValue.split(''));
    blurItem(activeIndex);
  };

  var onInputBlur = function onInputBlur() {
    if (activeIndex === -1) return;
    blurItem(activeIndex);
    setActiveIndex(-1);
  };

  useEffect(function () {
    if (autoFocus && itemsRef[0].current) {
      itemsRef[0].current.focus();
    }
  }, []);
  useEffect(function () {
    var codeInput = codeInputRef.current;
    if (!codeInput) return;

    var onPaste = function onPaste(e) {
      var _e$clipboardData;

      e.preventDefault();
      var pastedString = (_e$clipboardData = e.clipboardData) === null || _e$clipboardData === void 0 ? void 0 : _e$clipboardData.getData('text');
      if (!pastedString) return;
      var isNumber = /^\d+$/.test(pastedString);
      if (isNumber) setValue(pastedString.split('').slice(0, length));
    };

    codeInput.addEventListener('paste', onPaste);
    return function () {
      return codeInput.removeEventListener('paste', onPaste);
    };
  }, []);
  useEffect(function () {
    var stringValue = value.join('');
    var isCompleted = stringValue.length === length;
    if (isCompleted && stringValue !== emptyValue.join('')) onCompleted(stringValue);
    onChange(stringValue);
  }, [value, length]);
  useEffect(function () {
    if (typeof pValue !== 'string') return;
    if (pValue === '' && value.join('') === emptyValue.join('')) return;
    if (pValue !== value.join('')) setValue(pValue.split(''));
  }, [pValue]);

  var renderItemText = function renderItemText(itemValue) {
    if (itemValue === placeholder) return placeholder;
    return type === 'password' ? passwordMask : itemValue;
  };

  return createElement(Fragment, null, createElement(GlobalStyle, null), createElement(Container, {
    className: 'ReactInputVerificationCode__container',
    itemscount: length
  }, createElement(Input, {
    ref: codeInputRef,
    className: 'ReactInputVerificationCode__input',
    autoComplete: 'one-time-code',
    type: 'text',
    inputMode: 'decimal',
    id: 'one-time-code',
    onChange: onInputChange,
    onKeyUp: onInputKeyUp,
    onBlur: onInputBlur,
    activeindex: activeIndex,
    "data-cy": dataCy + "-otc-input"
  }), itemsRef.map(function (ref, i) {
    return createElement(Item, {
      key: i,
      ref: ref,
      role: 'button',
      tabIndex: 0,
      className: "ReactInputVerificationCode__item " + (value[i] !== placeholder ? 'is-filled' : '') + " " + (i === activeIndex ? 'is-active' : ''),
      onFocus: onItemFocus(i),
      "data-cy": dataCy + "-" + i + "-item"
    }, renderItemText(value[i]));
  })));
};

export default ReactInputVerificationCode;
//# sourceMappingURL=index.modern.js.map

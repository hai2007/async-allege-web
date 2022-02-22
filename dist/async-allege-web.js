/*!
     * Async Allege Web - 一个为前端设计的可以编辑异步断言的测试框架。
     * git+https://github.com/hai2007/async-allege-web.git
     *
     * author 你好2007 < https://hai2007.gitee.io/sweethome >
     *
     * version 0.1.0-alpha.0
     *
     * Copyright (c) 2022 hai2007 走一步，再走一步。
     * Released under the MIT license
     *
     * Date:Tue Feb 22 2022 16:35:21 GMT+0800 (GMT+08:00)
     */
(function () {
  'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  var initFrameView = function initFrameView(el) {
    // 添加标记属性
    el.setAttribute('async-allege-web', '');
  };

  // 动态往浏览器追加样式
  function addStylesClient(style) {
    var styleElement = document.createElement('style');
    var head = document.head || document.getElementsByTagName('head')[0];
    styleElement.innerHTML = style;
    styleElement.setAttribute('type', 'text/css');
    head.appendChild(styleElement);
  }

  addStylesClient("");

  var AsyncAllegeWeb = function AsyncAllegeWeb(el) {
    // 初始化测试框架界面
    var frameView = initFrameView(el);
    return {
      test: function test(title, doback) {
        doback({
          // 相等
          equal: function equal(value, expect, mark) {
          },
          // 不相等
          notEqual: function notEqual(value, expect, mark) {
          },
          // 严格相等
          deepEqual: function deepEqual(value, expect, mark) {
          },
          // 不严格相等
          notDeepEqual: function notDeepEqual(value, expect, mark) {
          }
        });
      }
    };
  }; // 导出


  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    module.exports = AsyncAllegeWeb;
  } else {
    // 挂载对象到根
    window.AsyncAllegeWeb = AsyncAllegeWeb;
  }

}());

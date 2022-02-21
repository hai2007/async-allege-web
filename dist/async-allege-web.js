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
 * Date:Mon Feb 21 2022 17:37:42 GMT+0800 (GMT+08:00)
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

  var AsyncAllegeWeb = {}; // 导出

  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    module.exports = AsyncAllegeWeb;
  } else {
    // 挂载对象到根
    window.AsyncAllegeWeb = AsyncAllegeWeb;
  }

}());

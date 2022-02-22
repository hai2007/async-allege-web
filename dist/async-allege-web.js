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
 * Date:Tue Feb 22 2022 14:58:18 GMT+0800 (GMT+08:00)
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

  var AsyncAllegeWeb = function AsyncAllegeWeb(el) {
    // 初始化测试框架界面
    // todo
    return {
      test: function test(title, doback) {
        // 初始化此条测试条目展示位置
        // todo
        doback({
          // 相等
          equal: function equal(value, expect, mark) {// todo
          },
          // 不相等
          notEqual: function notEqual(value, expect, mark) {// todo
          },
          // 严格相等
          deepEqual: function deepEqual(value, expect, mark) {// todo
          },
          // 不严格相等
          notDeepEqual: function notDeepEqual(value, expect, mark) {// todo
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

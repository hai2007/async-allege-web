/*!
 * Async Allege Web - 一个为前端设计的可以编辑异步断言的测试框架。
 * git+https://github.com/hai2007/async-allege-web.git
 *
 * author 你好2007 < https://hai2007.gitee.io/sweethome >
 *
 * version 0.3.0
 *
 * Copyright (c) 2022 hai2007 走一步，再走一步。
 * Released under the MIT license
 *
 * Date:Thu Feb 24 2022 17:09:38 GMT+0800 (GMT+08:00)
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

  /*!
   * 🌐 - 提供常用的DOM操作方法
   * https://github.com/hai2007/browser.js/blob/master/xhtml.js
   *
   * author hai2007 < https://hai2007.gitee.io/sweethome >
   *
   * Copyright (c) 2021-present hai2007 走一步，再走一步。
   * Released under the MIT license
   */
  // 命名空间路径
  var namespace = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };
  /**
   * 结点操作补充
   */

  var xhtml = {
    // 阻止冒泡
    "stopPropagation": function stopPropagation(event) {
      event = event || window.event;

      if (event.stopPropagation) {
        //这是其他非IE浏览器
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
    },
    // 阻止默认事件
    "preventDefault": function preventDefault(event) {
      event = event || window.event;

      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    },
    // 判断是否是结点
    "isNode": function isNode(param) {
      return param && (param.nodeType === 1 || param.nodeType === 9 || param.nodeType === 11);
    },
    // 绑定事件
    "bind": function bind(dom, eventType, callback) {
      if (dom.constructor === Array || dom.constructor === NodeList || dom.constructor === HTMLCollection) {
        for (var i = 0; i < dom.length; i++) {
          this.bind(dom[i], eventType, callback);
        }

        return;
      }

      if (window.attachEvent) dom.attachEvent("on" + eventType, callback);else dom.addEventListener(eventType, callback, false);
    },
    // 去掉绑定事件
    "unbind": function unbind(dom, eventType, handler) {
      if (dom.constructor === Array || dom.constructor === NodeList || dom.constructor === HTMLCollection) {
        for (var i = 0; i < dom.length; i++) {
          this.unbind(dom[i], eventType, handler);
        }

        return;
      }

      if (window.detachEvent) dom.detachEvent('on' + eventType, handler);else dom.removeEventListener(eventType, handler, false);
    },
    // 在当前上下文context上查找结点
    // selectFun可选，返回boolean用以判断当前面对的结点是否保留
    "find": function find(context, selectFun, tagName) {
      if (!this.isNode(context)) return [];
      var nodes = context.getElementsByTagName(tagName || '*');
      var result = [];

      for (var i = 0; i < nodes.length; i++) {
        if (this.isNode(nodes[i]) && (typeof selectFun != "function" || selectFun(nodes[i]))) result.push(nodes[i]);
      }

      return result;
    },
    // 寻找当前结点的孩子结点
    // selectFun可选，返回boolean用以判断当前面对的结点是否保留
    "children": function children(dom, selectFun) {
      var nodes = dom.childNodes;
      var result = [];

      for (var i = 0; i < nodes.length; i++) {
        if (this.isNode(nodes[i]) && (typeof selectFun != "function" || selectFun(nodes[i]))) result.push(nodes[i]);
      }

      return result;
    },
    // 判断结点是否有指定class
    // clazzs可以是字符串或数组字符串
    // notStrict可选，boolean值，默认false表示结点必须包含全部class,true表示至少包含一个即可
    "hasClass": function hasClass(dom, clazzs, notStrict) {
      if (clazzs.constructor !== Array) clazzs = [clazzs];
      var class_str = " " + (dom.getAttribute('class') || "") + " ";

      for (var i = 0; i < clazzs.length; i++) {
        if (class_str.indexOf(" " + clazzs[i] + " ") >= 0) {
          if (notStrict) return true;
        } else {
          if (!notStrict) return false;
        }
      }

      return true;
    },
    // 删除指定class
    "removeClass": function removeClass(dom, clazz) {
      var oldClazz = " " + (dom.getAttribute('class') || "") + " ";
      var newClazz = oldClazz.replace(" " + clazz.trim() + " ", " ");
      dom.setAttribute('class', newClazz.trim());
    },
    // 添加指定class
    "addClass": function addClass(dom, clazz) {
      if (this.hasClass(dom, clazz)) return;
      var oldClazz = dom.getAttribute('class') || "";
      dom.setAttribute('class', oldClazz + " " + clazz);
    },
    // 字符串变成结点
    // isSvg可选，boolean值，默认false表示结点是html，为true表示svg类型
    "toNode": function toNode(template, isSvg) {
      var frame; // html和svg上下文不一样

      if (isSvg) frame = document.createElementNS(namespace.svg, 'svg');else {
        var frameTagName = 'div'; // 大部分的标签可以直接使用div作为容器
        // 部分特殊的需要特殊的容器标签

        if (/^<tr[> ]/.test(template)) {
          frameTagName = "tbody";
        } else if (/^<th[> ]/.test(template) || /^<td[> ]/.test(template)) {
          frameTagName = "tr";
        } else if (/^<thead[> ]/.test(template) || /^<tbody[> ]/.test(template)) {
          frameTagName = "table";
        }

        frame = document.createElement(frameTagName);
      } // 低版本浏览器svg没有innerHTML，考虑是vue框架中，没有补充

      frame.innerHTML = template;
      var childNodes = frame.childNodes;

      for (var i = 0; i < childNodes.length; i++) {
        if (this.isNode(childNodes[i])) return childNodes[i];
      }
    },
    // 主动触发事件
    "trigger": function trigger(dom, eventType) {
      //创建event的对象实例。
      if (document.createEventObject) {
        // IE浏览器支持fireEvent方法
        dom.fireEvent('on' + eventType, document.createEventObject());
      } // 其他标准浏览器使用dispatchEvent方法
      else {
        var _event = document.createEvent('HTMLEvents'); // 3个参数：事件类型，是否冒泡，是否阻止浏览器的默认行为


        _event.initEvent(eventType, true, false);

        dom.dispatchEvent(_event);
      }
    },
    // 获取样式
    "getStyle": function getStyle(dom, name) {
      // 获取结点的全部样式
      var allStyle = document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(dom, null) : dom.currentStyle; // 如果没有指定属性名称，返回全部样式

      return typeof name === 'string' ? allStyle.getPropertyValue(name) : allStyle;
    },
    // 获取元素位置
    "offsetPosition": function offsetPosition(dom) {
      var left = 0;
      var top = 0;
      top = dom.offsetTop;
      left = dom.offsetLeft;
      dom = dom.offsetParent;

      while (dom) {
        top += dom.offsetTop;
        left += dom.offsetLeft;
        dom = dom.offsetParent;
      }

      return {
        "left": left,
        "top": top
      };
    },
    // 获取鼠标相对元素位置
    "mousePosition": function mousePosition(dom, event) {
      var bounding = dom.getBoundingClientRect();
      if (!event || !event.clientX) throw new Error('Event is necessary!');
      return {
        "x": event.clientX - bounding.left,
        "y": event.clientY - bounding.top
      };
    },
    // 删除结点
    "remove": function remove(dom) {
      dom.parentNode.removeChild(dom);
    },
    // 设置多个样式
    "setStyles": function setStyles(dom, styles) {
      for (var key in styles) {
        dom.style[key] = styles[key];
      }
    },
    // 获取元素大小
    "size": function size(dom, type) {
      var elemHeight, elemWidth;

      if (type == 'content') {
        //内容
        elemWidth = dom.clientWidth - (this.getStyle(dom, 'padding-left') + "").replace('px', '') - (this.getStyle(dom, 'padding-right') + "").replace('px', '');
        elemHeight = dom.clientHeight - (this.getStyle(dom, 'padding-top') + "").replace('px', '') - (this.getStyle(dom, 'padding-bottom') + "").replace('px', '');
      } else if (type == 'padding') {
        //内容+内边距
        elemWidth = dom.clientWidth;
        elemHeight = dom.clientHeight;
      } else if (type == 'border') {
        //内容+内边距+边框
        elemWidth = dom.offsetWidth;
        elemHeight = dom.offsetHeight;
      } else if (type == 'scroll') {
        //滚动的宽（不包括border）
        elemWidth = dom.scrollWidth;
        elemHeight = dom.scrollHeight;
      } else {
        elemWidth = dom.offsetWidth;
        elemHeight = dom.offsetHeight;
      }

      return {
        width: elemWidth,
        height: elemHeight
      };
    },
    // 在被选元素内部的结尾插入内容
    "append": function append(el, template) {
      var node = this.isNode(template) ? template : this.toNode(template);
      el.appendChild(node);
      return node;
    },
    // 在被选元素内部的开头插入内容
    "prepend": function prepend(el, template) {
      var node = this.isNode(template) ? template : this.toNode(template);
      el.insertBefore(node, el.childNodes[0]);
      return node;
    },
    // 在被选元素之后插入内容
    "after": function after(el, template) {
      var node = this.isNode(template) ? template : this.toNode(template);
      el.parentNode.insertBefore(node, el.nextSibling);
      return node;
    },
    // 在被选元素之前插入内容
    "before": function before(el, template) {
      var node = this.isNode(template) ? template : this.toNode(template);
      el.parentNode.insertBefore(node, el);
      return node;
    }
  };

  function move (el) {
    //绑定鼠标左键按下事件
    xhtml.bind(el, 'mousedown', function (event) {
      //解决浏览器全选无法拖拽弹框
      el.setCapture && el.setCapture(); // 需要控制的应该是父节点

      var _el = el.parentNode;
      var lf = event.clientX;
      var tp = event.clientY;
      var left = xhtml.getStyle(_el, 'left').replace('px', '');
      var top = xhtml.getStyle(_el, 'top').replace('px', ''); //绑定鼠标移动事件

      function mousemove(event) {
        _el.style.left = left - -event.clientX - lf + 'px';
        _el.style.top = top - -event.clientY - tp + 'px';
      }

      xhtml.bind(document, 'mousemove', mousemove); //绑定鼠标松开事件,清除鼠标移动绑定

      xhtml.bind(document, 'mouseup', function () {
        xhtml.unbind(document, 'mousemove', mousemove);
        _el.releaseCapture && _el.releaseCapture();
        return false;
      });
    });
  }

  var initFrameView = function initFrameView(el) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "[测试] Async Allege Web";
    // 添加标记属性
    el.setAttribute('async-allege-web', ''); // 追加节点

    var h2 = document.createElement('h2');
    h2.innerText = title;
    el.appendChild(h2); // 赋予拖拽移动功能

    move(h2); // 追加用于存放测试结果的地方

    var div = document.createElement('div');
    el.appendChild(div);
    return div;
  };
  var initItemView = function initItemView(el, title) {
    var fieldset = document.createElement('fieldset');
    var legend = document.createElement('legend');
    var ul = document.createElement('ul');
    legend.innerText = title;
    el.appendChild(fieldset);
    fieldset.appendChild(legend);
    fieldset.appendChild(ul);
    return ul;
  };
  var addResult = function addResult(rootEl, el, flag, mark) {
    var li = document.createElement('li');
    li.innerText = mark + "：" + flag;

    if (!flag) {
      li.setAttribute('class', 'error');
      rootEl.setAttribute('class', 'error');
    }

    el.appendChild(li);
  };

  // 动态往浏览器追加样式
  function addStylesClient(style) {
    var styleElement = document.createElement('style');
    var head = document.head || document.getElementsByTagName('head')[0];
    styleElement.innerHTML = style;
    styleElement.setAttribute('type', 'text/css');
    head.appendChild(styleElement);
  }

  addStylesClient("\n [async-allege-web]{\n\nposition: fixed;\n\nbackground-color: #8bc34a;\n\nborder: 4px solid #8bc34a;\n\nbox-shadow: 0 0 10px 3px white;\n\nfont-family: cursive;\n\nz-index: 998;\n\n}\n\n [async-allege-web][active='yes']{\n\nz-index: 999;\n\n}\n\n [async-allege-web].error{\n\nbackground-color: #e40b0b;\n\nborder: 4px solid #e40b0b;\n\n}\n/* 去掉前置索引 */\n [async-allege-web] li{\n\nlist-style-type: none;\n\n}\n/* 去掉不喜欢的间距 */\n [async-allege-web] ul, [async-allege-web] li, [async-allege-web] h2{\n\n-webkit-margin-before: 0;\n\n-webkit-margin-after: 0;\n\n-webkit-padding-start: 0;\n/* 去掉不喜欢的间距，针对火狐浏览器等 */\nmargin-block-end: 0;\n\nmargin-block-start: 0;\n\npadding-inline-start: 0;\n/* 修改IE和其它浏览器不一致问题 */\npadding: 0;\n\nmargin: 0;\n\n}\n\n [async-allege-web]>h2{\n\nuser-select: none;\n\nfont-size: 12px;\n\npadding: 10px;\n\ncursor: move;\n\n}\n\n [async-allege-web]>div{\n\nbackground-color: white;\n\nheight: 300px;\n\nwidth: 240px;\n\noverflow: auto;\n\n}\n\n [async-allege-web]>div>fieldset{\n\nmargin-top: 10px;\n\n}\n\n [async-allege-web]>div>fieldset>legend{\n\nfont-weight: 800;\n\nfont-size: 14px;\n\n}\n\n [async-allege-web]>div>fieldset>ul>li{\n\nfont-size: 12px;\n\nlist-style-type: disclosure-closed;\n\nmargin: 5px 0;\n\nmargin-left: 10px;\n\ncolor: #8bc34a;\n\n}\n\n [async-allege-web]>div>fieldset>ul>li.error{\n\ncolor: red;\n\n}\n");

  /**
   * 判断一个值是不是Object。
   *
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是Object返回true，否则返回false
   */
  function _isObject (value) {
    var type = _typeof(value);

    return value != null && (type === 'object' || type === 'function');
  }

  /*!
   * 💡 - 值类型判断方法
   * https://github.com/hai2007/tool.js/blob/master/type.js
   *
   * author hai2007 < https://hai2007.gitee.io/sweethome >
   *
   * Copyright (c) 2020-present hai2007 走一步，再走一步。
   * Released under the MIT license
   */


  var isObject = _isObject; // 基本类型

  var isEqual = function isEqual(val1, val2) {
    if (isObject(val1) && isObject(val2)) {
      for (var key1 in val1) {
        if (!isEqual(val1[key1], val2[key1])) {
          return false;
        }
      }

      for (var key2 in val2) {
        if (!isEqual(val1[key2], val2[key2])) {
          return false;
        }
      }
    } else {
      return val1 == val2;
    }

    return true;
  };

  function _deepEqual (val1, val2) {
    return isEqual(val1, val2);
  }

  var left = 35,
      top = 35;

  var AsyncAllegeWeb = function AsyncAllegeWeb(_el, title) {
    var el = document.createElement('div');

    _el.appendChild(el);

    el.style.left = (left += 15) + "px";
    el.style.top = (top += 15) + "px"; // 标准当前窗口为活动窗口

    xhtml.bind(el, 'mousedown', function (event) {
      var els = xhtml.children(_el);

      for (var i = 0; i < els.length; i++) {
        els[i].setAttribute('active', 'no');
      }

      el.setAttribute('active', 'yes');
    }); // 初始化测试框架界面

    var frameView = initFrameView(el, title);
    return {
      test: function test(title, doback) {
        // 初始化此条测试条目展示位置
        var itemView = initItemView(frameView, title);
        doback({
          // 自定义规则
          "do": function _do(doback, mark) {
            addResult(el, itemView, doback(), mark);
          },
          // 相等
          equal: function equal(value, expect, mark) {
            addResult(el, itemView, value == expect, mark);
          },
          // 不相等
          notEqual: function notEqual(value, expect, mark) {
            addResult(el, itemView, value != expect, mark);
          },
          // 严格相等
          strictEqual: function strictEqual(value, expect, mark) {
            addResult(el, itemView, value === expect, mark);
          },
          // 不严格相等
          notStrictEqual: function notStrictEqual(value, expect, mark) {
            addResult(el, itemView, value !== expect, mark);
          },
          // 深度相等
          deepEqual: function deepEqual(value, expect, mark) {
            addResult(el, itemView, _deepEqual(value, expect), mark);
          },
          // 不深度相等
          notDeepEqual: function notDeepEqual(value, expect, mark) {
            addResult(el, itemView, !_deepEqual(value, expect), mark);
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

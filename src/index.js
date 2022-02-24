import { initFrameView, initItemView, addResult } from "./bootstrap";
import "../.style.js";
import xhtml from '@hai2007/browser/xhtml';
import deepEqual from './tool/deepEqual';

let left = 35, top = 35;

let AsyncAllegeWeb = (_el, title) => {

    let el = document.createElement('div');
    _el.appendChild(el);

    el.style.left = (left += 15) + "px";
    el.style.top = (top += 15) + "px";

    // 标准当前窗口为活动窗口
    xhtml.bind(el, 'mousedown', function (event) {
        let els = xhtml.children(_el);
        for (let i = 0; i < els.length; i++) {
            els[i].setAttribute('active', 'no');
        }
        el.setAttribute('active', 'yes');
    });

    // 初始化测试框架界面
    let frameView = initFrameView(el, title);

    return {
        test(title, doback) {

            // 初始化此条测试条目展示位置
            let itemView = initItemView(frameView, title);

            doback({

                // 自定义规则
                do: (doback, mark) => {
                    addResult(el, itemView, doback(), mark);
                },

                // 相等
                equal: (value, expect, mark) => {
                    addResult(el, itemView, value == expect, mark);
                },

                // 不相等
                notEqual: (value, expect, mark) => {
                    addResult(el, itemView, value != expect, mark);
                },

                // 严格相等
                strictEqual: (value, expect, mark) => {
                    addResult(el, itemView, value === expect, mark);
                },

                // 不严格相等
                notStrictEqual: (value, expect, mark) => {
                    addResult(el, itemView, value !== expect, mark);
                },

                // 深度相等
                deepEqual: (value, expect, mark) => {
                    addResult(el, itemView, deepEqual(value, expect), mark);
                },

                // 不深度相等
                notDeepEqual: (value, expect, mark) => {
                    addResult(el, itemView, !deepEqual(value, expect), mark);
                }
            });
        }
    };

};

// 导出

if (typeof module === "object" && typeof module.exports === "object") {

    module.exports = AsyncAllegeWeb;

} else {

    // 挂载对象到根
    window.AsyncAllegeWeb = AsyncAllegeWeb;

}
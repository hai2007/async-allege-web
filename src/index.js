import { initFrameView, initItemView, addResult } from "./bootstrap"
import "../.style.js"

let AsyncAllegeWeb = el => {

    // 初始化测试框架界面
    let frameView = initFrameView(el);

    return {
        test(title, doback) {

            // 初始化此条测试条目展示位置
            let itemView = initItemView(frameView, title);

            doback({

                // 自定义规则
                do: (doback, mark) => {
                    addResult(itemView, doback(), mark);
                },

                // 相等
                equal: (value, expect, mark) => {
                    addResult(itemView, value == expect, mark);
                },

                // 不相等
                notEqual: (value, expect, mark) => {
                    addResult(itemView, value != expect, mark);
                },

                // 严格相等
                strictEqual: (value, expect, mark) => {
                    addResult(itemView, value === expect, mark);
                },

                // 不严格相等
                notStrictEqual: (value, expect, mark) => {
                    addResult(itemView, value !== expect, mark);
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
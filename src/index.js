
let AsyncAllegeWeb = el => {

    // 初始化测试框架界面
    // todo

    return {
        test(title, doback) {

            // 初始化此条测试条目展示位置
            // todo

            doback({

                // 相等
                equal: (value, expect, mark) => {
                    // todo
                },

                // 不相等
                notEqual: (value, expect, mark) => {
                    // todo
                },

                // 严格相等
                deepEqual: (value, expect, mark) => {
                    // todo
                },

                // 不严格相等
                notDeepEqual: (value, expect, mark) => {
                    // todo
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

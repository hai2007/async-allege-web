var allege = AsyncAllegeWeb(document.getElementById('async-allege-web'), '基础功能');

allege.test("内置判断", function (handler) {
    handler.equal(1, '1', '数字1和字符串1相等');
    handler.strictEqual(1, '1', '数字1和字符串1严格相等');
});

allege.test("自定义规则", function (handler) {
    handler.do(function () {

        return false;

    }, '自定义规则返回false');

    handler.do(function () {

        return true;

    }, '自定义规则返回true');
});

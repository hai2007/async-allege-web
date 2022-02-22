var allege = AsyncAllegeWeb(document.getElementById('async-allege-web'));

allege.test("第一个测试", function (handler) {
    handler.equal(1, '1', '数字1和字符串1相等');
});

allege.test("第二个测试", function (handler) {
    handler.deepEqual(1, '1', '数字1和字符串1不严格相等');
});
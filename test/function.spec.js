var allege = AsyncAllegeWeb(document.getElementById('async-allege-web'), '一些测试方法');

allege.test("equal", function (handler) {
    handler.equal(1, '1', '数字1和字符串1相等');
});

allege.test("notEqual", function (handler) {
    handler.notEqual(1, '2', '数字1和字符串2不相等');
});

allege.test("strictEqual", function (handler) {
    handler.strictEqual(1, 1, '数字1和数字1严格相等');
});

allege.test("notStrictEqual", function (handler) {
    handler.notStrictEqual(1, '1', '数字1和字符串1不严格相等');
});

allege.test("deepEqual", function (handler) {
    handler.deepEqual(1, '1', '数字1和字符串1深度相等');
    handler.deepEqual([1, 2, 3], [1, 2, 3, 4], '数组');
    handler.deepEqual([1, 2], [1, 2, 3], '数组');
    handler.deepEqual([1, 2, 3], [1, 2, 3], '数组');
});

allege.test("notDeepEqual", function (handler) {
    handler.notDeepEqual(1, '1', '数字1和字符串1深度相等');
    handler.notDeepEqual([1, 2, 3], [1, 2, 3, 4], '数组');
    handler.notDeepEqual([1, 2], [1, 2, 3], '数组');
    handler.notDeepEqual([1, 2, 3], [1, 2, 3], '数组');
});

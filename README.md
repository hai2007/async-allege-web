# async-allege-web
一个为前端设计的可以编辑异步断言的测试框架。

<p>
  <a href="https://hai2007.gitee.io/npm-downloads?interval=7&packages=async-allege-web"><img src="https://img.shields.io/npm/dm/async-allege-web.svg" alt="downloads"></a>
  <a href="https://www.npmjs.com/package/async-allege-web"><img src="https://img.shields.io/npm/v/async-allege-web.svg" alt="Version"></a>
  <a href="https://www.jsdelivr.com/package/npm/async-allege-web"><img src="https://data.jsdelivr.com/v1/package/npm/async-allege-web/badge" alt="CDN"></a>
  <a href="https://github.com/hai2007/async-allege-web/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/async-allege-web.svg" alt="License"></a>
  <a href="https://github.com/hai2007/async-allege-web">
      <img alt="GitHub repo stars" src="https://img.shields.io/github/stars/hai2007/async-allege-web?style=social">
  </a>
</p>

## Issues
使用的时候遇到任何问题或有好的建议，请点击进入[issue](https://github.com/hai2007/async-allege-web/issues)！

## 如何使用？

```
npm install --save async-allege-web
```

然后，引入：

```
import AsyncAllegeWeb from "async-allege-web";
```

或者通过CDN的方式引入：

```html
<script src="https://cdn.jsdelivr.net/npm/async-allege-web"></script>
```

然后，新建一个```index.html```文件，里面内容大概如下：

```html
<!-- 用于展示测试结果 -->
<div id="async-allege-web"></div>

<!-- 编辑测试语句 -->
<script>
  // todo
</script>
```

其中，编辑测试语句内容格式大致如下：

```js
var allege = AsyncAllegeWeb(document.getElementById('async-allege-web'));

allege.test("测试名称",function(handler){
    handler.equal(1, '1', '数字1和字符串1相等');
});
```

其中```handle```上包含了一些可以使用的测试断言，列举如下：

- equal(value, expect, mark)：相等
- notEqual(value, expect, mark)：不相等
- deepEqual(value, expect, mark)：严格相等
- notDeepEqual(value, expect, mark)：不严格相等

开源协议
---------------------------------------
[MIT](https://github.com/hai2007/async-allege-web/blob/master/LICENSE)

Copyright (c) 2022 [hai2007](https://hai2007.gitee.io/sweethome/) 走一步，再走一步。

# async-allege-web
一个为前端设计的可以编辑异步断言的测试框架。

<p>
  <a href="https://hai2007.gitee.io/npm-downloads?interval=7&packages=async-allege-web"><img src="https://img.shields.io/npm/dm/async-allege-web.svg" alt="downloads"></a>
  <a href="https://www.npmjs.com/package/async-allege-web"><img src="https://img.shields.io/npm/v/async-allege-web.svg" alt="Version"></a>
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

然后，新建一个```index.html```文件，里面内容大概如下：

```html
<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="UTF-8">
    <script src=".node_modules/async-allege-web/dist/async-allege-web.js"></script>
</head>

<body>

    <!-- 用于展示测试结果 -->
    <div id="async-allege-web"></div>

    <!-- 引入测试语句 -->
    <script src="./test.spec.js"></script>

</body>

</html>
```

```测试语句```就写在```test.spec.js```中（可以引入多个```测试语句```文件）。

### 断言语句

可以在```测试语句```中使用的推断是否成功等的语句，我们在下面列出：

> 温馨提示：设计开发中，敬请期待！

开源协议
---------------------------------------
[MIT](https://github.com/hai2007/async-allege-web/blob/master/LICENSE)

Copyright (c) 2022 [hai2007](https://hai2007.gitee.io/sweethome/) 走一步，再走一步。

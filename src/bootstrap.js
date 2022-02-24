import move from './tool/move';

export let initFrameView = function (el, title = "[测试] Async Allege Web") {

    // 添加标记属性
    el.setAttribute('async-allege-web', '');

    // 追加节点
    let h2 = document.createElement('h2');
    h2.innerText = title;
    el.appendChild(h2);

    // 赋予拖拽移动功能
    move(h2);

    // 追加用于存放测试结果的地方
    let div = document.createElement('div');
    el.appendChild(div);

    return div;
};

export let initItemView = function (el, title) {

    let fieldset = document.createElement('fieldset');
    let legend = document.createElement('legend');
    let ul = document.createElement('ul');

    legend.innerText = title;

    el.appendChild(fieldset);
    fieldset.appendChild(legend);
    fieldset.appendChild(ul);

    return ul;
};

export let addResult = function (rootEl, el, flag, mark) {

    let li = document.createElement('li');
    li.innerText = mark + "：" + flag;

    if (!flag) {
        li.setAttribute('class', 'error');
        rootEl.setAttribute('class', 'error');
    }

    el.appendChild(li);
};
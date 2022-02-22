
// 动态往浏览器追加样式
export default function addStylesClient(style) {

    let styleElement = document.createElement('style');
    let head = document.head || document.getElementsByTagName('head')[0];

    styleElement.innerHTML = style;
    styleElement.setAttribute('type', 'text/css');
    head.appendChild(styleElement);

};

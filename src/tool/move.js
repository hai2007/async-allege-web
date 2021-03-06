import xhtml from '@hai2007/browser/xhtml';

export default function (el) {
    //绑定鼠标左键按下事件
    xhtml.bind(el, 'mousedown', function (event) {

        //解决浏览器全选无法拖拽弹框
        el.setCapture && el.setCapture();

        // 需要控制的应该是父节点
        let _el = el.parentNode;


        let lf = event.clientX;
        let tp = event.clientY;

        let left = (xhtml.getStyle(_el, 'left')).replace('px', '');
        let top = (xhtml.getStyle(_el, 'top')).replace('px', '');

        //绑定鼠标移动事件
        function mousemove(event) {
            _el.style.left = left - - event.clientX - lf + 'px';
            _el.style.top = top - - event.clientY - tp + 'px';
        }
        xhtml.bind(document, 'mousemove', mousemove);

        //绑定鼠标松开事件,清除鼠标移动绑定
        xhtml.bind(document, 'mouseup', function () {
            xhtml.unbind(document, 'mousemove', mousemove);
            _el.releaseCapture && _el.releaseCapture();
            return false;
        });
    });
};
/**
 * Created by Administrator on 2017/10/10.
 */
//获取元素
function $(selector,context){
    //context相当于一个范围
    context = context || document;

    //群组选择器
    if(selector.indexOf(' ') !== -1){
        return context.querySelectorAll(selector);
        //id获取
    }else if(selector.charAt(0) === '#'){
        return context.getElementById(selector.slice(1));
        //class获取
    }else if(selector.charAt(0) === '.'){
        return getByClass(selector.slice(1),context);
        //标签获取
    }else{
        return context.getElementsByTagName(selector);
    }
}
//通过类样式获取元素
function getByClass(className,context) {
    //context获取某一元素下边的
    //className传递过来的类样式
    context = context || document;
    //如果浏览器支持通过类样式获取元素，执行下边代码
    if(context.getElementsByClassName) {
        return context.getElementsByClassName(className);
    }
    //获取context下的所有节点，ret用来存储获取到的节点
    var nodes = context.getElementsByTagName('*'),
        ret = [];
    for(var i= 0;i < nodes.length;i++) {
        if(hasClass(nodes[i],className)){
            ret.push(nodes[i]);
        }
    }
    return ret;
}
//判断node中是否有类元素className，返回布尔值
function hasClass(node,className){
    var names = node.className.split(/\s+/); //转化为数组
    for(var i = 0;i < names.length;i++){
        if(names[i]==className) return true;
    }
    return false;
}

//事件绑定
function bindEvent(obj,evtname,fn){
    //obj事件对象，evtname事件名，fn事件执行函数
    if(obj.addEventListener){
        return obj.addEventListener(evtname,fn,false);
    }else{
        return obj.attachEvent('on' + evtname,function(){
           fn.call(obj);
        });
    }
}
//事件解绑
function unbindEvent(obj,evtname,fn){
    //obj事件对象，evtname事件名，fn事件执行函数
    if(removeEventListener){
        return obj.removeEventListener(evtname,fn,false);
    }else{
        return obj.detachEvent('on' + evtname,function(){
            fn.call(obj);
        })
    }
}
//拖拽函数
function drag(obj){
    //disX,disY临时存储位置
    var disX = 0;
    var disY = 0;
    //调用事件绑定函数，绑定mousedown事件
    bindEvent(obj,'mousedown',down);

    ////鼠标点下时执行的函数
    function down(evt){
        evt = window.event || evt;
        //全局捕获
        obj.setCapture && obj.setCapture();
        //获取点击位置
        disX = evt.clientX - obj.offsetLeft;
        disY = evt.clientY - obj.offsetTop;
        //调用事件绑定函数，绑定mousemove,mouseup事件
        bindEvent(document,'mousemove',move);
        bindEvent(document,'mouseup',up);
        //鼠标移动时执行的函数
        function move(evt){
            evt = window.event || evt;
            //设置元素位置
            obj.style.left = evt.clientX - disX + 'px';
            obj.style.top = evt.clientY - disY + 'px';
        }
        //鼠标抬起时执行的函数
        function up(){
            //释放捕获
            obj.releaseCapture && obj.releaseCapture();
            //解绑mousemove，mouseup事件
            unbindEvent(document,'mousemove',move);
            unbindEvent(document,'mouseup',up);
        }
        //阻止默认行为
        return false;
    }
}
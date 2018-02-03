/**
 * Created by Administrator on 2017/10/10.
 */
//事件绑定
function bindEvent(obj,events,fn){
    if(obj.addEventListener){
        obj.addEventListener(events,function(evt){
            if(fn() == false){
                evt.stopPropagation();
                evt.preventDefault();
            }
        },false);
    }else{
        obj.attachEvent('on'+ events,function(){
            if(fn() == false){
                window.event.cancelBubble = true;
                return false;
            }
           fn.call(obj);
        });
    }
}
//事件解绑
function unbindEvent(obj,events,fn){
    if(obj.removeEventListener){
        obj.removeEventListener(events,fn,false);
    }else{
        obj.detachEvent('on'+ events,function(){
            fn.call(obj);
        });
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
//转换为数组的方法
function toArray(elements){
    var arr = [];
    for(var i= 0;i < elements.length;i++){
        arr.push(elements[i]);
    }
    return arr;
}
//获取css样式
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}
function  Vquery(vArg){
    this.elements = [];  //存储元素
    switch(typeof vArg){
        case 'function':
            //window.onload = vArg;
            bindEvent(window,'load',vArg);
            break;
        case 'string':
            switch(vArg.charAt(0)){
                case '#':     //id
                    this.elements.push(document.getElementById(vArg.substring(1)));
                    break;
                case '.':    //class
                    this.elements = getByClass(vArg.substring(1));
                    break;
                default:     //tag
                    var ret = toArray(document.getElementsByTagName(vArg));
                    this.elements = ret;
                    break;
            }
            break;
        case 'object':
            if(vArg.constructor == 'Array'){
                this.elements = vArg;
            }
            this.elements.push(vArg);
            break;

    }
}
Vquery.prototype.html = function(str){
    //console.log(this.elements.length);
    if(str){
        for(var i = 0;i < this.elements.length;i++){
            this.elements[i].innerHTML = str;
        }
    }else{
        return this.elements[0].innerHTML;
    }
    return this;
};
Vquery.prototype.click = function(fn){
    /*for(var i = 0;i < this.elements.length;i++){
        bindEvent(this.elements[i],'click',fn);
    }*/
    this.on('click',fn);
    return this;
};
Vquery.prototype.mouseover = function(fn){
    /*for(var i = 0;i < this.elements.length;i++){
        bindEvent(this.elements[i],'mouseover',fn);
    }*/
    this.on('mouseover',fn);
    return this;
};
Vquery.prototype.on = function(events,fn){
    for(var i = 0;i < this.elements.length;i++){
        bindEvent(this.elements[i],events,fn);
    }
    return this;
};
Vquery.prototype.hide = function(){
    for(var i = 0;i < this.elements.length;i++){
        this.elements[i].style.display = 'none';
    }
    return this;
};
Vquery.prototype.show = function(){
    for(var i = 0;i < this.elements.length;i++){
        this.elements[i].style.display = '';
    }
    return this;
};
Vquery.prototype.hover = function(fnOver,fnOut){
    this.on('mouseover',fnOver);
    this.on('mouseout',fnOut);
    return this;
};
Vquery.prototype.css = function(attr,value){
    if(arguments.length == 2){
        for(var i = 0;i < this.elements.length;i++){
            this.elements[i].style[attr] = value;
        }
    }else if(arguments.length == 1){
        if(typeof attr === 'object'){
            for(var j in attr){
                for(var i = 0;i < this.elements.length;i++){
                    this.elements[i].style[j] = attr[j];
                }
            }
        }
        return getStyle(this.elements[0],attr);
    }
};
Vquery.prototype.attr = function(attr,value){
    //如果要考虑class兼容问题，IE7下属性采用className
    if(arguments.length == 2){
        for(var i = 0;i < this.elements.length;i++){
            this.elements[i].setAttribute(attr,value);
        }
    }else if(arguments.length == 1){
        return this.elements[0].getAttribute(attr);
    }
    return this;
};
Vquery.prototype.eq = function(index){
    return $(this.elements[index]);
};
Vquery.prototype.index = function(){
    var eles = this.elements[0].parentNode.children;
    for(var i = 0;i < eles.length;i++){
        if(eles[i] == this.elements[0]){
            return i;
        }
    }
    return this;
};
Vquery.prototype.find = function(ele){
    var arr = [];
    if(ele.charAt(0) === '.'){
        for(var i = 0;i < this.elements.length;i++){
            arr = arr.concat(getByClass(ele.substring(1),this.elements[i]));
        }
    }else{
        for(var i = 0;i < this.elements.length;i++){
            arr = arr.concat(toArray(this.elements[i].getElementsByTagName(ele)));
        }
    }
    return $(arr);
};
function $(vArg){
    return new Vquery(vArg);
}

$.trim = function(str){
    return str.replace(/^\s+|\s+$/g,'');
};

$.extend = function(json){
    for(var attr in json){
        $[attr] = json[attr];
    }
};
$.fn = {};
$.fn.extend = function(json){
    for(var attr in json){
        Vquery.prototype[attr] = json[attr];
    }
};
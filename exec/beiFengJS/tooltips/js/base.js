/**
 * Created by Administrator on 2017/7/27.
 */
/*去除前后的空格*/
String.prototype.trim=function () {
    return this.replace(/^\s+/,'').replace(/\s+$/,'');
};
String.prototype.repeat=function (n) {
    //n表示字符串重得的次数
    return new Array(n+1).join(this);
};
function getByClass(className,context) {
    context = context || document;
    if(context.getElementsByClassName) {
        return context.getElementsByClassName(className);
    }
    var nodes = context.getElementsByTagName('*'),
        ret = [];
    for(var i= 0;i < nodes.length;i++) {
        if(hasClass(nodes[i],className)){
            ret.push(nodes[i]);
        }
    }
    return ret;
}
function hasClass(node,className){
    var names = node.className.split(/\s+/);
    for(var i = 0;i < names.length;i++){
        if(names[i]==className) return true;
    }
    return false;
}
function addClass(obj,classname) {
    //给指定的元素添加一个类名
    var s=obj.className.split(/\s+/);
    for (var i=0;i<s.length;i++) {
        if (s[i]==classname) return;
    }
    s[s.length] = classname;
    obj.className = s.join(" ");
    return obj;
}
function delClass(obj,classname) {
    //删除指定元素的某个类名
    var s=obj.className.split(/\s+/);
    for (var i=0;i<s.length;i++) {
        if (s[i]==classname) s.splice(i,1);
    }
    obj.className=s.join(" ");
    return obj;
}
function Linear(start,alter,curTime,dur) {
    return start+curTime/dur*alter;
}
function easeIn(start,alter,curTime,dur) {
    return start + Math.pow(curTime/dur,2)*alter;
}
function animate(o,start,alter,dur,fx){
    var curTime = 0;
    var t = setInterval(function(){
        if(curTime >= dur) clearInterval(t);
        //o.style[attr] = Linear(start,alter,curTime,dur) + "px";
        for(var i in start) {
            o.style[i] = fx(start[i],alter[i],curTime,dur) + "px";
        }
        curTime += 50;
    },50);
    return function (){
        clearInterval(t);
    };
}
function addEvent(obj,evt,fn) {
    if (obj.addEventListener && !Browser.isOpera) {
        obj.addEventListener(evt,fn,false);
        return obj;
    }


    if (!obj.functions) obj.functions={};
    if (!obj.functions[evt])
        obj.functions[evt]=[];

    //obj.functions["mousedown"]=[]
    var functions=obj.functions[evt];
    for (var i=0;i<functions.length;i++) {
        if (functions[i]===fn) return obj;
    }
    functions.push(fn);
    //fn.index=functions.length-1;


    if (typeof obj["on"+evt]=="function") {
        //alert(obj["on"+evt]);//当这一行执行到时，obj["on"+evt] 就是handler
        //alert(obj["on"+evt]==handler);
        if (obj["on"+evt]!=handler)
            functions.push(obj["on"+evt]);
    }
    obj["on"+evt]=handler;
    return obj;


}

function delEvent(obj,evtype,fn) {
    if (obj.removeEventListener && !Browser.isOpera) {
        obj.removeEventListener(evtype,fn,false);
        return obj;
    }
    var fns=obj.functions || {};
    fns=fns[evtype] || [];
    for (var i=0;i<fns.length;i++) {
        if (fns[i]==fn) {
            fns.splice(i,1);
            return obj;
        }
    }
}

function handler(evt) {//哪个事件发生了?
    //对event对象标准化
    var evt=fixEvt(evt || window.event,this);
    var evtype=evt.type;
    var functions=this.functions[evtype];
    for (var i=0;i<functions.length;i++) {
        if (functions[i]) functions[i].call(this,evt);
    }
}

function fixEvt(evt,o) {
    if (!evt.target) {//IE
        evt.target=evt.srcElement;
        if (evt.type=="mouseover")
            evt.relatedTarget=evt.fromElement;
        else if ("mouseout"==evt.type)
            evt.relatedTarget=evt.toElement;

        evt.pageX=evt.clientX+document.documentElement.scrollLeft;
        evt.pageY=evt.clientY+document.documentElement.scrollTop;
        evt.stopPropagation=function () {
            evt.cancelBubble=true;
        };
        evt.preventDefault=function () {
            evt.returnValue=false;
        };
    }

    //IE与Opera的offsetX,offsetY没有将边框算进之内
    if (o!=window && o.nodeType) {//要求是一个DOM对象
        //evt.layerX=evt.offsetX+o.clientLeft;
        //evt.layerY=evt.offsetY+o.clientTop;
        //如何获取一个DOM元素在页面中的坐标
        var offset=getOffset(o);
        evt.layerX=evt.pageX-offset.x;
        evt.layerY=evt.pageY-offset.y;

    }


    return evt;
}
function getOffset(o) {
    //o.offsetLeft
    //o.offsetTop
    //o.offsetParent
    var x=y=0,de=document.documentElement;
    if (o==de) {
        return {
            x:de.scrollLeft,
            y:de.scrollTop
        };
    }
    while (o) {
        x+=o.offsetLeft;
        y+=o.offsetTop;
        o=o.offsetParent;
        if (o && o!=de && !Browser.isOpera) {
            x+=o.clientLeft;
            y+=o.clientTop;
        }
    }
    return {
        x:x,
        y:y
    };
}
function invoke(methodName,context) {
    var args=arguments;
    return function () {
        context[methodName].apply(context,[].slice.call(args,2));
    };
}
function $(id){
    return document.getElementById(id);
}
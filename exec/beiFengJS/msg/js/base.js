/**
 * Created by Administrator on 2017/7/27.
 */
function $(id){
    return document.getElementById(id);
}
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
function date(s,t){
    t = t || new Date();
    var re = /Y|m|d|H|i|s/g;
    return s.replace(re,function($1){
        switch ($1){
            case 'Y':
                return t.getFullYear();
            case 'm':
                return t.getMonth() + 1;
            case 'd':
                return t.getDate();
            case 'H':
                return t.getHours();
            case 'i':
                return t.getMinutes();
            case 's':
                return t.getSeconds();
        }
        return $1;
    });
}
/*function htmlEncode(demo){
 arguments.callee.textNode.nodeValue = demo;
 return arguments.callee.div.innerHTML;
 }
 htmlEncode.div = document.createElement('div');
 htmlEncode.textNode = document.createTextNode('');
 htmlEncode.div.appendChild(htmlEncode.textNode);*/

var htmlEncode = (function (){
    var div = document.createElement('div');
    var t = document.createTextNode('');
    div.appendChild(t);
    return function (html){
        t.nodeValue = html;
        return div.innerHTML;
    };
})();
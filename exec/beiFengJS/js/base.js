/**
 * Created by Administrator on 2017/7/27.
 */
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
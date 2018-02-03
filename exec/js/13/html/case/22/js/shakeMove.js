/**
 * Created by Administrator on 2017/8/22.
 */
function getCss(obj,attr){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[attr];
    }else{
        return obj.currentStyle[attr];
    }
}
/*
*思想: 抖动原理：只做点对点的闪动，不需要考虑动画效果
*
*
* obj: 要抖动的元素
* target: 要抖动的最远距离
* attr: 要改变的样式
* dir: 抖动的方向
* stepValue: 声明每次抖动的幅度
* fn: 回调函数
* */
function shakeMove(json){
    var obj = json.obj;

    var target = json.target;
    target = Number(target) || 20;

    var attr = json.attr;
    attr = attr || 'left';

    var dir = json.dir;
    dir = Number(dir) || '1';

    var stepValue = json.stepValue;
    stepValue = Number(stepValue) || 2;

    var fn = json.fn;

    var step = 0;
    var attrValue = parseFloat(getCss(obj,attr));

    var value;
    if(obj.timer) return;

    obj.timer = setInterval(function(){
        value = dir * (target - step);
        if(step >= target){
            step = target;
        }
        obj.style[attr] = attrValue + value + 'px';
        if(step == target){
            clearInterval(obj.timer);
            obj.timer = 0;

            fn && fn.call(obj);
        }

        if(dir === -1){
            step += stepValue;
        }

        dir = -dir;
    },50);
}
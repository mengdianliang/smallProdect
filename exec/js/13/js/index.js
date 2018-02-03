window.onload = function(){
    //获取节点
    var banner_list = $('.banner_list')[0]; //获取.banner_list元素
    var banner_oper_list = $('.banner_oper_list');     //获取获取.banner_oper_list元素
    var banner = $('.banner_list li'); //获取.banner_list li元素
    var banner_oper = $('.banner_oper_list li');     //获取获取.banner_oper_list li元素
    var outer_line = $('.outer_line')[0]; //获取。outer_line元素
    var t = "";
    var flag = true;
    var num = 0;
    var bf = 0;

    init();
    //代码去重
    function commons(){

    }
    //初始化页面
    function init(){
        autoPlay();
        mouseEvt();
    }
    //元素获取方法的重写
    function $(element,obj){
        if(obj == null){
            return document.querySelectorAll(element);
        }else{
            return obj.querySelectorAll(element);
        }
    }
    /*大图区域鼠标移入移出事件*/
    banner_list.onmouseover = function(){
        clearInterval(t);
    };
    banner_list.onmouseout = function(){
        autoPlay();
    };
    /*小图区域鼠标移入移出事件*/
    function mouseEvt(){
        for(var i = 0;i < banner_oper.length;i++){
            banner_oper[i].index = i;
            banner_oper[i].onmouseover = function(){
                clearInterval(t);
                //outer_line.style.top = this.index * 60 + "px";
                if(this.index < num){
                    flag = false;
                }else{
                    flag = true;
                }
                animate(outer_line,{top: num * 60},{top: (this.index - num) * 60},500,easeIn,"px");
                banner[num].style.opacity = 0;
                opacityAnimate(banner[this.index],0,100,500,easeIn);
                num = this.index;
            };
            banner_oper[i].onmouseout = function(){
                autoPlay();
            };
        }
    }

    /*自动播放*/
    function autoPlay(){
        clearInterval(t);
        t = setInterval(function(){
            if(flag){
                num++;
                if(num > banner_oper.length -1){
                    num = 0;
                }
                animate(outer_line,{top: (num - 1) * 60},{top: 60},500,easeIn,"px");
            }else{
                num--;
                if(num < 0){
                    num = banner_oper.length - 1;
                }
                animate(outer_line,{top: (num + 1) * 60},{top: -60},500,easeIn,"px");
            }
            banner[bf].style.opacity = 0;
            opacityAnimate(banner[num],0,100,500,easeIn);
            bf = num;
        },3000);
    }
    /*执行动画的函数*/
    function Linear(start,alter,curTime,dur) {
        return start+curTime/dur*alter;
    }
    function easeIn(start,alter,curTime,dur) {
        return start + Math.pow(curTime/dur,2)*alter;
    }
    function animate(o,start,alter,dur,fx,unit){
        unit = unit || "";
        var curTime = 0;
        console.log(o ,start,alter);
        var t = setInterval(function(){
            if(curTime >= dur) clearInterval(t);
            //o.style[attr] = Linear(start,alter,curTime,dur) + "px";
            for(var i in start) {
                o.style[i] = fx(start[i],alter[i],curTime,dur) + unit;
            }
            curTime += 50;
        },50);
    }
    function opacityAnimate(o,start,alter,dur,fx){
        var curTime = 0;
        var t = setInterval(function(){
            if(curTime >= dur) clearInterval(t);
            setOpacity(o,fx(start,alter,curTime,dur));
            curTime += 50;
        },50);
    }
    var setOpacity = (document.documentElement.filters)?function(obj,val) {
        obj.style.filter = "alpha(opacity=" + val + ")";
    }:function(obj,val) {
        obj.style.opacity = val/100 + "";
    };
};
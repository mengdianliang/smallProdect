/**
 * Created by Administrator on 2017/7/16.
 */
/*
*  步骤：
*   1.获取节点；.pics img,.points li,.prev,.next
*   2.picArr存储图片数据；
*   3.初始化页面；
*   4.添加按钮切换事件；
*   5.添加图片轮播事件；
*   6.添加鼠标悬停时事件；
*   7.优化代码(去重)；
* */
window.onload = function(){
    //获取节点
    var wrapper = $('.wrapper')[0]; //获取.wrapper元素
    var pics = $('.pics img')[0]; //图片区域
    var points = $('.points li');     //获取获取点区域元素
    var prev = $('.prev')[0];    //左切换按钮
    var next = $('.next')[0];    //右切换按钮
    var picArr = ['./img/1.jpg','./img/2.jpg','./img/3.jpg','./img/4.jpg'];
    var t = "";
    var flag = true;
    var num = 0;


    init();
    //代码去重
    function commons(){
        for(var i = 0;i < picArr.length;i++){
            $('a',points[i])[0].className = "fl";
        }
        pics.src = picArr[num];
        pics.style.opacity = 0.2;
        opacityAnimate(pics,20,80,500,easeIn);
        $('a',points[num])[0].className = "active fl";
    }
    //初始化页面
    function init(){
        commons();
        autoPlay();
        pointEvt();
    }
    //元素获取方法的重写
    function $(element,obj){
        if(obj == null){
            return document.querySelectorAll(element);
        }else{
            return obj.querySelectorAll(element);
        }
    }

    /*按钮点击事件*/
    prev.onclick = function (){
       flag = true;
       num--;
       if(num < 0){
           num = picArr.length - 1;
       }
       commons();
    };
    next.onclick = function (){
        flag = false;
        num++;
        if(num > picArr.length - 1){
            num = 0;
        }
        commons();
    };
    /*鼠标悬停事件*/
    wrapper.onmouseover = function(){
        clearInterval(t);
    };
    wrapper.onmouseout = function(){
        autoPlay();
    };
    /*鼠标移入停止定时器*/
    function pointEvt(){
        for(var i = 0;i < picArr.length;i++){
            points[i].index = i;
            points[i].onmouseover = function(){
                $('img',this)[0].style.display = 'block';
            };
            points[i].onmouseout = function(){
                $('img',this)[0].style.display = '';
            };
            points[i].onclick = function(){
                if(num > this.index){
                    flag = true;
                }
                if(num < this.index){
                    flag = false;
                }
                num = this.index;
                commons();
            };
        }
    }

    /*自动播放*/
    function autoPlay(){
        clearInterval(t);
        t = setInterval(function(){
            if(flag){
                num--;
                if(num < 0){
                    num = picArr.length - 1;
                }
            }else{
                num++;
                if(num > picArr.length -1){
                    num = 0;
                }
            }
            commons();
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
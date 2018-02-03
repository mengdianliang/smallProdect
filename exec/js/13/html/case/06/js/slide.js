/**
 * Created by Administrator on 2017/7/16.
 */
/*
*  步骤：
*   1.获取节点；.slide a,item,pic,pager,desc_txt
*   2.picObj存储图片数据；
*   3.初始化页面；
*   4.添加按钮切换事件；
*   5.添加图片轮播事件；
*   6.添加图片轮播函数；
*   7.添加鼠标悬停时事件；
*   8.优化代码(去重)；
* */
window.onload = function(){
    //获取节点
    var nav_tops = $('.nav_top a'); //右侧nav导航
    var goods = $('.goods_center')[0]; //盒子区域
    var goods_pics = $('.goods_pic li');     //获取.goods_pic li元素
    var points = $('.point li');     //获取pic_box元素
    var prev = $('.prev')[0];
    var next = $('.next')[0];
    var t = "";
    var flag = true;
    var num = 0;
    var bf = goods_pics.length - 1;
    var af = 1;

    init();
    //代码去重
    function commons(){

    }
    //初始化页面
    function init(){
        for(var i = 0;i < goods_pics.length;i++){
            goods_pics[i].style.left = '0';
            goods_pics[i].style.zIndex = '1';
            goods_pics[i].style.opacity = 0.2;
            points[i].className = 'fl';
        }
        goods_pics[bf].style.left = '100px';
        goods_pics[bf].style.zIndex = '1';
        goods_pics[num].style.left = '0';
        goods_pics[num].style.zIndex = '2';
        goods_pics[num].style.opacity = '1';
        goods_pics[af].style.left = '-100px';
        goods_pics[af].style.zIndex = '1';
        points[num].className = 'active fl';

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
    /*nav_top a鼠标移入和移出事件*/
    for(var i = 0; i <  nav_tops.length;i++){
        nav_tops[i].onmouseover = function() {
            if($('.nav_con',this)[0]){
                animate($('.nav_con',this)[0],{height: 0},{height: 200},200,Linear,'px');
                $('.nav_con',this)[0].style.zIndex = 9;
            }
        };
        nav_tops[i].onmouseout = function() {
            var _this = this;
            if($('.nav_con',this)[0]){
                $('.nav_con',this)[0].style.zIndex = 0;
               animate($('.nav_con',_this)[0],{height: 200},{height: 0},200,Linear,'px');
            }
        };
    }
    /*按钮点击事件*/
    function mouseEvt(){
        prev.onclick = function (){
            flag = true;
            af = num;
            num = bf;
            bf--;
            if(bf < 0){
                bf = goods_pics.length - 1;
            }
            for(var i = 0;i < goods_pics.length;i++){
                goods_pics[i].style.left = '0';
                goods_pics[i].style.zIndex = '1';
                points[i].className = 'fl';
            }
            animate(goods_pics[bf],{left: 0},{left: -100},500,Linear,'px');
            animate(goods_pics[num],{left: 100},{left: -100},500,Linear,'px');
            opacityAnimate(goods_pics[num],20,80,500,easeIn);
            goods_pics[num].style.zIndex = '2';
            animate(goods_pics[af],{left: -100},{left: -100},500,Linear,'px');
            goods_pics[af].style.zIndex = '3';
            opacityAnimate(goods_pics[af],100,-100,500,easeIn);
            points[num].className = 'active fl';
        };
        next.onclick = function (){
            flag = false;
            bf = num;
            num = af;
            af++;
            if(af > goods_pics.length - 1){
                af = 0;
            }
            for(var i = 0;i < goods_pics.length;i++) {
                goods_pics[i].style.left = '0';
                goods_pics[i].style.zIndex = '0';
                points[i].className = 'fl';
            }
            animate(goods_pics[bf],{left: 0},{left: 100},500,Linear,'px');
            goods_pics[bf].style.zIndex = '2';
            opacityAnimate(goods_pics[bf],100,-100,300,easeIn);
            opacityAnimate(goods_pics[num],20,80,500,easeIn);
            animate(goods_pics[num],{left: -100},{left: 100},500,Linear,'px');
            goods_pics[num].style.zIndex = '1';
            animate(goods_pics[af],{left: 0},{left: 100},500,Linear,'px');
            points[num].className = 'active fl';
        };
    }

    /*自动播放*/
    function autoPlay(){
        clearInterval(t);
        t = setInterval(function(){
            if(flag){

            }else{

            }
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
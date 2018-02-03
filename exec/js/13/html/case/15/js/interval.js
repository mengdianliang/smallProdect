/**
 * Created by Administrator on 2017/7/16.
 */
/*
*  步骤：
*   1.获取节点；.pics img,.points li,.prev,.next
*   2.evlArr存储评价内容；
*   3.初始化页面；
*   4.添加按钮切换事件；
*   5.添加图片轮播事件；
*   6.添加鼠标悬停时事件；
*   7.优化代码(去重)；
* */
window.onload = function(){
    //获取节点
    var pic_list = $('.pic_list')[0]; //图片显示区域
    var desc = $('.desc')[0];     //获取文字描述元素
    var picArr = ['./img/1.jpg','./img/2.jpg','./img/3.jpg','./img/4.jpg'];
    var txtArr= ['一片艳阳天','沙漠里也有火花','应该是轮船吧','大约在冬季'];
    var len = txtArr.length;
    var str = '';
    var num = 0;
    var bf = 0;

    init();
    //代码去重
    function commons(){

    }

    //初始化页面
    function init(){
        addLi();
        initVal();
        autoPlayTxt();
    }
    /*添加li元素*/
    function addLi(){
        for(var i = 0;i < len;i++){
            str += '<li>' +
                '<a href="javascript:void(0);" class="clearfix">' +
                '<span class="fl pic_l">' +
                '<img src="' + picArr[i] + '"/>' +
                '</span>' +
                '<span class="fr pic_r">' +
                '<img src="' + picArr[i] + '"/>' +
                '</span>' +
                '</a>' +
                '</li>';
        }
        pic_list.innerHTML = str;
    }
    //设置元素初始值
    function initVal(){
        for(var i = 0;i < len;i++){
            $('li',pic_list)[i].style.zIndex = 1;
        }
        $('li',pic_list)[bf].style.zIndex = 3;
        desc.innerHTML = txtArr[num];
    }
    //元素获取方法的重写
    function $(element,obj){
        if(obj == null){
            return document.querySelectorAll(element);
        }else{
            return obj.querySelectorAll(element);
        }
    }

    function autoPlayPic(){
        clearInterval(pic_list.t);
        pic_list.t = setInterval(function(){

            $('li',pic_list)[bf].style.zIndex = 3;
            $('li',pic_list)[num].style.zIndex = 2;

            $('.pic_l',($('li',pic_list)[num]))[0].style.width = '395px';
            $('.pic_r',($('li',pic_list)[num]))[0].style.width = '395px';

            animate( $('.pic_l',($('li',pic_list)[bf]))[0],{width: 395},{width: -395},1000,Linear,'px');
            animate( $('.pic_r',($('li',pic_list)[bf]))[0],{width: 395},{width: -395},1000,Linear,'px');
            setTimeout(function(){
                $('li',pic_list)[num].style.zIndex = 3;
                $('li',pic_list)[bf].style.zIndex = 1;
                bf = num;
                if(bf == num){     //如果图片动画走完
                    clearInterval(pic_list.t);
                    autoPlayTxt();
                }
            },1000);
        },3000);

    }
    function autoPlayTxt(){
       clearInterval(desc.t);
        desc.t = setInterval(function() {
            desc.innerHTML = txtArr[num];
            animate(desc, {bottom: -60}, {bottom: 60}, 500, Linear, 'px');
            setTimeout(function () {
                animate(desc, {bottom: 0}, {bottom: -60}, 500, Linear, 'px');
            }, 800);
            if (bf == num) {  //如果
                num++;
                if(num > len - 1){
                    num = 0;
                }
                clearInterval(desc.t);
                autoPlayPic();
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
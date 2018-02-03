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
    var slides = $('.slide a'); //获取左右切换按钮组
    var pic_wrapper = $('.pic_wrapper');     //获取pic_wrapper元素
    var pic_box = $('.pic_box');     //获取pic_box元素
    var pager = $('.pager');  //获取页码元素
    var desc_txt = $('.desc_txt'); //获取文字描述元素
    var picObj = [
        {
            num: 0,
            picArr: ['./img/1.png','./img/2.png','./img/3.png','./img/4.png','./img/next.png'],
            txt: '第一组'
        },
        {
            num: 0,
            picArr: ['./img/2.png','./img/3.png','./img/4.png'],
            txt: '第二组'
        }
    ];
    var t = "";
    var flag = true;

    init();
    slide();
    //代码去重
    function commons(){
        for(var i = 0;i < pic_box.length;i++){
            pager[i].innerHTML = (picObj[i].num + 1) + '/' + picObj[i].picArr.length;
            desc_txt[i].innerHTML = picObj[i].txt + "第" + (picObj[i].num + 1) + "张";
        }
    }
    //初始化页面
    function init(){
        for(var i = 0;i < pic_box.length;i++) {
            for (var j = 0; j < picObj[i].picArr.length; j++) {
                pic_box[i].innerHTML += '<a href="javascript: void(0);"><img src="' + picObj[i].picArr[j] + '" class="pic"/></a>';
            }
            pic_box[i].style.left = -picObj[i].num * 225 + "px";
        }
        commons();
        autoPlay();

    }
    //元素获取方法的重写
    function $(element,obj){
        if(obj == null){
            return document.querySelectorAll(element);
        }else{
            return obj.querySelectorAll(element);
        }
    }
    /*自动播放*/
    function autoPlay(){
        t = setInterval(function(){
            for(var i = 0;i < pic_box.length;i++) {
                var left = parseInt(pic_box[i].style.left) || 0;
                if(flag){
                    picObj[i].num--;
                    if(picObj[i].num < 0){
                        picObj[i].num = picObj[i].picArr.length - 1;
                    }

                }else{
                    picObj[i].num++;
                    if(picObj[i].num > picObj[i].picArr.length - 1){
                        picObj[i].num = 0;
                    }
                }
                console.log(picObj[i].num);
                animate(pic_box[i],{left: left},{left: (-(picObj[i].num * 225)) - left},500,Linear);
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
    function animate(o,start,alter,dur,fx){
        var curTime = 0;
        //console.log(o ,start,alter);
        var t = setInterval(function(){
            if(curTime >= dur) clearInterval(t);
            //o.style[attr] = Linear(start,alter,curTime,dur) + "px";
            for(var i in start) {
                o.style[i] = fx(start[i],alter[i],curTime,dur) + "px";
            }
            curTime += 50;
        },50);
    }
    /*左按钮轮播切换*/
    slides[0].onclick = function (){
        flag = true;
        for(var i = 0;i < pic_box.length;i++){
            picObj[i].num--;
            if(picObj[i].num < 0){
                picObj[i].num = picObj[i].picArr.length - 1;
            }
            pic_box[i].style.left = -picObj[i].num * 225 + "px";
        }
        commons();
    };
    /*右按钮轮播切换*/
    slides[1].onclick = function (){
        flag = false;
        for(var i = 0;i < pic_box.length;i++){
            picObj[i].num++;
            if(picObj[i].num > picObj[i].picArr.length - 1){
                picObj[i].num = 0;
            }
            pic_box[i].style.left = -picObj[i].num * 225 + "px";
        }
        commons();
    };
    /*图片切换*/
    function slide(){
        for(var i = 0;i < pic_box.length;i++){
            pic_box[i].index = i;
            pic_box[i].onclick = function(){
                if(flag) {
                    picObj[this.index].num--;
                    if(picObj[this.index].num < 0){
                        picObj[this.index].num = picObj[this.index].picArr.length - 1;
                    }
                }else{
                    picObj[this.index].num++;
                    if(picObj[this.index].num > picObj[this.index].picArr.length - 1){
                        picObj[this.index].num = 0;
                    }
                }
               this.style.left = -picObj[this.index].num * 225 + "px";
                commons();
            };
        }
    }
    /*鼠标移入停止定时器*/
    for(var i = 0;i < pic_wrapper.length;i++){
        pic_wrapper[i].onmouseover = slides[i].onmouseover = function(){
            clearInterval(t);
        };
        pic_wrapper[i].onmouseout = slides[i].onmouseout = function(){
            autoPlay();
        };
    }
};
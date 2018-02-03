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
    var point = $('.point')[0];  //获取点
    var prev = $('.prev')[0];
    var next = $('.next')[0];
    var picArr = ['./img/1.jpg','./img/2.jpg','./img/3.jpg','./img/4.jpg'];
    var len = picArr.length;
    var str = '';
    var temp = '';
    var num = 0;
    var bf = 0;
    var timer = '';

    init();
    //代码去重
    function commons(){

    }

    //初始化页面
    function init(){
        addLi();
        initVal();
        playPic();
        autoPlay();
        mouseEvt();
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
            temp += '<li></li>';
        }
        pic_list.innerHTML = str;
        point.innerHTML = temp;
    }
    //设置元素初始值
    function initVal(){
        for(var i = 0;i < len;i++){
            $('li',pic_list)[i].style.display = 'none';
        }
        $('li',pic_list)[bf].style.display = 'block';
        $('li',point)[bf].style.top = '0';
    }
    //元素获取方法的重写
    function $(element,obj){
        if(obj == null){
            return document.querySelectorAll(element);
        }else{
            return obj.querySelectorAll(element);
        }
    }
    /*鼠标移入移出事件*/
    function mouseEvt(){
        next.onmouseover = prev.onmouseover = pic_list.onmouseover = function(){
            clearInterval(timer);
        };
        next.onmouseout = prev.onmouseout = pic_list.onmouseout = function(){
            autoPlay();
        };
    }
    /*自动轮播*/
    function autoPlay(){
        clearInterval(timer);
        timer = setInterval(function(){
            num++;
            if(num > len - 1){
                num = 0;
            }
            $('li',pic_list)[num].style.display = 'block';
            $('li',pic_list)[num].style.left = '-789px';
            $('li',point)[num].style.top = '20px';
            MTween($('li',pic_list)[bf],789,500,'left','linear');
            MTween($('li',pic_list)[num],789,500,'left','linear');
            MTween($('li',point)[bf],20,500,'top','linear');
            MTween($('li',point)[num],-20,500,'top','linear',function(){
                $('li',pic_list)[bf].style.display = 'none';
                bf = num;
            });
        },2000);
    }
    /*左右按钮点击动画*/
    function playPic(){
       prev.isClick = true;
       prev.onclick =  function(){
           if(!prev.isClick) return;
           num--;
           if(num < 0){
               num = len - 1;
           }
           prev.isClick = false;
           $('li',pic_list)[num].style.display = 'block';
           $('li',pic_list)[num].style.left = '789px';
           $('li',point)[num].style.top = '20px';
           MTween($('li',pic_list)[bf],-789,500,'left','linear');
           MTween($('li',pic_list)[num],-789,500,'left','linear');
           MTween($('li',point)[bf],20,500,'top','linear');
           MTween($('li',point)[num],-20,500,'top','linear',function(){
               console.log($('li',pic_list)[bf].style.left,$('li',pic_list)[num].style.left,$('li',point)[bf].style.top);
               if($('li',pic_list)[bf].style.left == '-789px' && $('li',pic_list)[num].style.left == '0px' && $('li',point)[bf].style.top == '20px'){
                   $('li',pic_list)[bf].style.display = 'none';
                   bf = num;
                   prev.isClick = true;
               }
           });
       };
        next.isClick = true;
        next.onclick =  function(){
            if(!next.isClick) return;
            num++;
            if(num > len - 1){
                num = 0;
            }
            next.isClick = false;
            $('li',pic_list)[num].style.display = 'block';
            $('li',pic_list)[num].style.left = '-789px';
            $('li',point)[num].style.top = '20px';
            MTween($('li',pic_list)[bf],789,500,'left','linear');
            MTween($('li',pic_list)[num],789,500,'left','linear');
            MTween($('li',point)[bf],20,500,'top','linear');
            MTween($('li',point)[num],-20,500,'top','linear',function(){
                console.log($('li',pic_list)[bf].style.left,$('li',pic_list)[num].style.left,$('li',point)[bf].style.top);
                if($('li',pic_list)[bf].style.left == '789px' && $('li',pic_list)[num].style.left == '0px' && $('li',point)[bf].style.top == '20px'){
                    $('li',pic_list)[bf].style.display = 'none';
                    bf = num;
                    next.isClick = true;
                }
            });
        };

    }
};
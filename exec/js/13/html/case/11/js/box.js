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
    var box = $('.box')[0]; //获取最外层的盒子元素
    var wid = box.offsetWidth; //获取盒子的宽度
    var hgt = box.offsetHeight; //获取盒子的高度
    var picArr = ['img/1.jpg'];
    var str = "";
    var top = '';
    var left = '';

    init();
    //代码去重
    function commons(){

    }
    //初始化页面
    function init(){
        for(var i = 0;i  < 10;i++){
            for(var j = 0;j  < 10;j++){
                str += '<div class="item"></div>';
            }
        }
        box.innerHTML += str;
        //console.log(box.innerHTML);
        for(var i = 0;i < $('.item',box).length;i++){
            $('.item',box)[i].style.width =  (wid/10-1) + "px";
            $('.item',box)[i].style.height =  (hgt/10-1) + "px";
            $('.item',box)[i].style.backgroundColor = '#ffff00';
            top = $('.item',box)[i].style.top = ((parseInt(i/10)* parseInt($('.item',box)[i].style.height))+i/10+1) + 'px';
            left = $('.item',box)[i].style.left = ((i%10* parseInt($('.item',box)[i].style.width))+i%10+1) + 'px';
        }
        mouseEvt();
    }
    function mouseEvt(){
        for(var j = 0;j < $('.item',box).length;j++){
            /*$('.item',box)[j].onmouseover = function(){
                var pic = $('.pic')[0]; //图片区域
               if(!$('img',pic)[0]){
                  console.log(pic);
                    pic.innerHTML = "<img src=" + picArr[0] +  ">";
                   console.log(pic);
                }
                this.style.display = 'none';
            };*/
            $('.item',box)[j].index = j;
            $('.item',box)[j].onmouseover = function(){
                if(!$('img',this)[0]){
                    this.style.backgroundImage = 'url(./img/1.jpg)';
                    this.style.backgroundPosition = (-left) + 'px '+(-top) + 'px';
                }
            };
        }
    }
    //元素获取方法的重写
    function $(element,obj){
        if(obj == null){
            return document.querySelectorAll(element);
        }else{
            return obj.querySelectorAll(element);
        }
    }
};
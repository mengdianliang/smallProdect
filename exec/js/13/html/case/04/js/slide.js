/**
 * Created by Administrator on 2017/7/16.
 */
/*
*  步骤：
*   1.获取节点；.slide a,item,item img,btn,warn_info,pager,desc_txt
*   2.初始化页面；
*   2.添加显示，隐藏函数；
*   3.添加按钮切换事件；
*   4.添加确认按钮轮播事件；
*   5.添加弹出信息事件；
*   6.优化代码(去重)；
* */
window.onload = function(){
    //获取节点
    var slides = $('.slide a'); //获取左右切换按钮组
    var item = $('.item');     //获取ul元素
    var pic = $('.pic');       //获取img元素
    var pager = $('.pager');  //获取页码元素
    var desc_txt = $('.desc_txt'); //获取文字描述元素
    var picArr1 = ['./img/1.png','./img/2.png','./img/3.png','./img/4.png','./img/next.png'];
    var picArr2 = ['./img/2.png','./img/3.png','./img/4.png'];
    var txtArr = ['第一组','第二组'];
    var num1 = num2 = 0;   //图片序号
    var len1 = picArr1.length; //第一组图片总数
    var len2 = picArr2.length; //第二组图片总数
    var flag = true;

    init();

    //代码去重
    function commons(){
        pager[0].innerHTML = (num1 + 1) + '/' + len1;
        pager[1].innerHTML = (num2 + 1) + '/' + len2;
        desc_txt[0].innerHTML = txtArr[0] + "第" + (num1 + 1) + "张";
        desc_txt[1].innerHTML = txtArr[1] + "第" + (num2 + 1) + "张";
        pic[0].src= picArr1[num1];
        pic[1].src= picArr2[num2];
    }
    //初始化页面
    function init(){
        commons();
    }
    //元素获取方法的重写
    function $(element,obj){
        if(obj == null){
            return document.querySelectorAll(element);
        }else{
            return obj.querySelectorAll(element);
        }
    }
    /*左按钮轮播切换*/
    slides[0].onclick = function (){
        flag = true;
        num1--;
        num2--;
        if(num1 < 0){
            num1 = len1 - 1;
        }
        if(num2 < 0){
            num2 = len2 - 1;
        }
        commons();
    };
    /*右按钮轮播切换*/
    slides[1].onclick = function (){
        flag = false;
        num1++;
        num2++;
        if(num1 > len1 - 1){
            num1 = 0;
        }
        if(num2 > len2 - 1){
            num2 = 0;
        }
        commons();
    };
    /*第一组图片切换*/
    pic[0].onclick = function(){
        if(flag) {
            num1--;
            if(num1 < 0){
                num1 = len1 - 1;
            }
        }else{
            num1++;
            if(num1 > len1 - 1){
                num1 = 0;
            }
        }
        commons();
    };
    /*第二组图片切换*/
    pic[1].onclick = function(){
        if(flag) {
            num2--;
            if(num2 < 0){
                num2 = len2 - 1;
            }
        }else{
            num2++;
            if(num2 > len2 - 1){
                num2 = 0;
            }
        }
        commons();
    };
};
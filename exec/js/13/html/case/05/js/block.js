/**
 * Created by Administrator on 2017/7/27.
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
window.onload = function() {
    //获取节点
    var box = $('box'); //获取box节点
    var len = 5;
    var s = '';
    init();
    //代码去重
    function commons() {
        for (var i = 0;i < len;i++) {
            s += '<div class="item"></div>';
        }
        box.innerHTML = s;
        /*for(var i = 0,j=Math.floor(len/2);i < len;i++){
            if(i <= j){
                $('.item')[i].style.top = (i * 80) + 'px';
                $('.item')[i].style.left = (i * 10) + 'px';
            }

        }*/
    }

    //初始化页面
    function init() {

        commons();
        autoPlay();

    }

    //元素获取方法的重写
    function $(element, obj) {
        if (obj == null) {
            return document.querySelectorAll(element);
        } else {
            return obj.querySelectorAll(element);
        }
    }
    function autoPlay(){

    }
};

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
    var slides = $(".slide a");
    var item = $(".item")[0]; //ul元素
    var s ="" //ul元素内添加的内容
    init();

    //代码去重
    function commons(){

    }
    //初始化页面
    function init(){
        nine(true,slides[0]);
        item.innerHTML = s;
        s = "";
    }
    //元素获取方法的重写
    function $(element,obj){
        if(obj == null){
            return document.querySelectorAll(element);
        }else{
            return obj.querySelectorAll(element);
        }
    }
    function nine(flag,obj){
        for(var i = 1;i < 10;i++) {
            s += '<li class="clearfix">';
            if(flag){
                for(var j = 1;j <=i;j++) {
                    s += '<a href="javascript:void(0);">'+ j + '*'+ i +'='+ (i * j) +'</a>';
                }
            }else{
                for(var j = i;j < 10;j++){
                    s += '<a href="javascript:void(0);">'+ i + '*'+ j +'='+ (i * j) +'</a>';
                }
            }
            s+= '</li>';
        }
        for(var i = 0;i < slides.length;i++ ){
            slides[i].className = "";
        }
        obj.className = 'active';
    }
    //顺序乘法表
    slides[0].onclick = function (){
        nine(true,this);
        item.innerHTML = s;
        s = "";
    };
    //逆序乘法表
    slides[1].onclick = function (){
        nine(false,this);
        item.innerHTML = s;
        s = "";
    };

};
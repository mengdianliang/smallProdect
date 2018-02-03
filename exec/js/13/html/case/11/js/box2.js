/**
 * Created by Administrator on 2017/8/2.
 */
window.onload = function(){
    //获取节点
    var box = $('.box')[0]; //获取最外层的盒子元素
    var wid = 680;
    var hgt = 420;
    var str = '';
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
        box.innerHTML = str;
        for(var i = 0;i < $('.item',box).length;i++){
            $('.item',box)[i].style.width =  wid/10 + "px";
            $('.item',box)[i].style.height = hgt/10 + "px";
            $('.item',box)[i].style.backgroundColor = '#ffff00';
            $('.item',box)[i].style.top = ((parseInt(i/10)* parseInt($('.item',box)[i].style.height))+i/10) + 'px';
            $('.item',box)[i].style.left = ((i%10* parseInt($('.item',box)[i].style.width))+i%10) + 'px';
            $('.item',box)[i].style.margin = parseInt(i/10)*10 + "px 0 0 " + i%10*10 + "px";
        }
        mouseEvt();
    }
    function mouseEvt(){
        for(var j = 0;j < $('.item',box).length;j++){
            $('.item',box)[j].index = j;
            $('.item',box)[j].onmouseover = function(){
                if(!$('img',this)[0]){
                    this.style.backgroundImage = 'url(./img/1.jpg)';
                    this.style.backgroundPosition = (-((this.index%10* parseInt($('.item',box)[this.index].style.width))+this.index%10)) + 'px '+(-((parseInt(this.index/10)* parseInt($('.item',box)[this.index].style.height))+this.index/10)) + 'px';
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
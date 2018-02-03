/**
 * Created by Administrator on 2017/7/16.
 */
/*
*  步骤：
*   1.获取节点；.pics img,.points li,.prev,.next
*   2.evlArr存储评价内容；
*   3.初始化页面；
*   4.添加鼠标移入移出事件；
*   5.添加鼠标点击事件；
*   6.完善鼠标移入移除事件；
*   7.优化代码(去重)；
* */
window.onload = function(){
    //获取节点
   /* var wrapper = $('.wrapper')[0]; //获取最外层的盒子元素
    var star_list = $('.star_list')[0]; //星星显示区域
    var score_val = $('.score_val')[0];     //获取评价元素
    var evlArr = ['极差','差评','一般','好评','极好']; //评价内容
    var len = evlArr.length;
    var num = -1;
    var cliNum = 0;*/

    var star_list = $('.star_list')[0];
    var score_val = $('.score_val')[0];
    var evlArr = ['极差','差评','一般','好评','极好'];
    var len = evlArr.length;
    var num = -1;
    init();
    //代码去重
    function commons(no){
        /*for(var j = 0; j < len;j++){
            if(j <= no){
                if(no <= 1){
                    $('li',star_list)[j].style.color = "#eeeeee";
                }else{
                    $('li',star_list)[j].style.color = "#ff0000";
                }
            }else{
                $('li',star_list)[j].style.color = "";
            }
        }
        score_val.innerHTML = evlArr[no];*/
    }
    //初始化页面
    function init(){
        addLi();
        mouseEvt();
    }
    /*添加li元素*/
    function addLi(){
        /*for(var i = 0;i < len;i++){
            star_list.innerHTML += '<li class="fl">★</li>';
        }*/
        for(var i = 0;i < len;i++){
            star_list.innerHTML += '<li class="fl">★</li>';
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

    function mouseEvt(){
        /*for(var i = 0;i < len;i++){
            $('li',star_list)[i].index = i;
            $('li',star_list)[i].onmouseover = function(){
                commons(this.index);
                score_val.style.opacity = 1;
            };
            $('li',star_list)[i].onmouseout = function(){
                commons(num);
                if(num == -1){
                    score_val.style.opacity = 0;
                }
            };
            $('li',star_list)[i].onclick = function(){
                //cliNum++;
                if(num == -1){
                    num = this.index;
                }else{
                    num = -1;
                }
            };
        }*/
        for(var i = 0;i < len;i++){
            $('li',star_list)[i].index  = i;
            $('li',star_list)[i].onmouseover = function(){
               for(var j = 0;j < len;j++){
                   if(j <= this.index){
                       if(this.index <= 1){
                           $('li',star_list)[j].style.color = "#dddddd";
                       }else{
                           $('li',star_list)[j].style.color = "#ff0000";
                       }
                   }else{
                       $('li',star_list)[j].style.color = "";
                   }
               }
                score_val.innerHTML = evlArr[this.index];
                score_val.style.opacity = 1;
            };
            $('li',star_list)[i].onmouseout = function(){
                for(var j = 0;j < len;j++){
                    if(j <= num){
                        if( num <= 1){
                            $('li',star_list)[j].style.color = "#dddddd";
                        }else{
                            $('li',star_list)[j].style.color = "#ff0000";
                        }
                    }else{
                        $('li',star_list)[j].style.color = "";
                    }
                }
                score_val.innerHTML = evlArr[num];
                if(num == -1){
                    score_val.style.opacity = 0;
                }
            };
            $('li',star_list)[i].onclick = function(){
                if(num == -1|| num != this.index){  //这里可以做修改评价的效果
                    num = this.index;
                }else{
                    num = -1;
                }
            };
        }
        /*wrapper.onclick = function(){
            cliNum++;
            if(cliNum == 1){
                num = -1;
                for(var j = 0; j < len;j++){
                    $('li',star_list)[j].style.color = "";
                }
                score_val.style.opacity = 0;
            }
            cliNum = 0;
        }*/
    }
};
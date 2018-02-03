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
    var slides = $('.slide a');
    var item = $('.item')[0];
    var pic = $('img',item)[0];
    var btns = $('.btn');
    var warn_info = $('.warn_info')[0];
    var pager = $('.pager')[0];
    var desc_txt = $('.desc_txt')[0];
    var picArr = ['./img/1.png','./img/2.png','./img/3.png','./img/4.png','./img/next.png'];
    var txtArr = ['文本一','文本二','文本三','文本四','文本五'];
    var warnArr = ['已经到了最左边','已经到了最右边'];
    var num = 0;
    var len = picArr.length;
    var flag = true;

    init();
    slide();

    //代码去重
    function commons(){
        pager.innerHTML = (num+1) + "/" + len;
        desc_txt.innerHTML = txtArr[num];
        pic.src = picArr[num];
    }
    //初始化页面
    function init(){
        warn_info.innerHTML = warnArr[0] + "<span class='confirm'>确定</span>";
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
    //元素显示
    function showInfo(obj){
        obj.style.display = 'block';
    }
    //元素隐藏
    function hideInfo(obj){
        obj.style.display = 'none';
    }
    //按钮切换
    function slide(){
        for(var i = 0; i<slides.length;i++){
            slides[i].index = i;
            slides[i].onclick = function () {
                for(var i = 0; i<slides.length;i++){
                    slides[i].className = "";
                }
                if(this.index == 0){
                    flag = true;
                }else{
                    flag = false;
                }
                this.className = 'active';
                warn_info.innerHTML = warnArr[this.index] + "<span class='confirm'>确定</span>";
            }
        }
    }
    /*左按钮轮播切换*/
    btns[0].onclick  = function (){
        num--;
        if(num < 0){
            if(flag){
                num = 0;
                showInfo( warn_info);
                return;
            }else{
                num = len - 1;
            }

        }
        commons();
    };
    /*右按钮轮播切换*/
    btns[1].onclick  = function (){
        num++;
        if(num > len - 1){
            if(flag){
                num = len - 1;
                showInfo( warn_info);
                return;
            }else{
                num = 0;
            }
        }
        commons();
    };
    /*弹出信息隐藏*/
    warn_info.onclick = function(){
        hideInfo(this);
    };
};
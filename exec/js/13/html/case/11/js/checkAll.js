/**
 * Created by Administrator on 2017/8/2.
 */
/*
* 步骤：
* */

window.onload = function(){

    /*获取元素*/
    /*var cons = $('.cons li');
    var checkAll = $('#checkAll')[0];
    var num = 0;*/

    var cons = $('.cons li'); //获取列表
    var checkAll = $('#checkAll')[0];  //获取全选按钮
    var checkNum = 0; //选中列表的数量
    init();  //效果初始化
    /*代码去重*/
    function commons(){

    }

    /*页面初始化*/
    function init(){
       /* for(var i = 1;i < cons.length;i+=2){
            cons[i].className = "odd clearfix";
        }
        mouseEvt();*/
        addColor();
        mouseEvt();

    }
    /*给偶数行元素添加背景色*/
    function addColor(){
        for(var i = 0;i < cons.length;i+=2){
            cons[i].className  = 'odd clearfix';
        }
    }
    function mouseEvt(){
        /*全选按钮点击事件*/
        checkAll.onclick = function(){
            if(!this.isClick){
                this.isClick = true;
                $('.ckd',this)[0].style.display = 'block';
                for(var i = 0;i < cons.length;i++){
                    $('.ckd',cons[i])[0].style.display = 'block';
                    cons[i].style.backgroundColor = '#ff4040';
                    cons[i].isClick = true;
                }
                checkNum = cons.length;
            }else{
                this.isClick = false;
                $('.ckd',this)[0].style.display = '';
                for(var i = 0;i < cons.length;i++){
                    $('.ckd',cons[i])[0].style.display = '';
                    cons[i].style.backgroundColor = '';
                    cons[i].isClick = false;
                }
                checkNum = 0;

            }
        };
        for(var i = 0;i < cons.length;i++){
            cons[i].isClick = false;   //默认不是选中状态
            /*列表鼠标移入事件*/
            cons[i].onmouseover = function(){
                if(!this.isClick){
                    this.style.backgroundColor = "#ff4040";
                }
            };
            /*列表鼠标移出事件*/
            cons[i].onmouseout = function(){
                if(!this.isClick){
                    this.style.backgroundColor = "";
                }
            };
            /*列表鼠标点击事件*/
            cons[i].onclick = function(){
                if(this.isClick){
                    checkNum--;
                    $('.ckd',this)[0].style.display = '';
                    this.isClick = false;
                }else{
                    checkNum++;
                    $('.ckd',this)[0].style.display = 'block';
                    this.isClick = true;
                }
                /*如果列表全部选中，全选按钮选中*/
                if(checkNum == cons.length){
                    $('.ckd',checkAll)[0].style.display = 'block';
                    checkAll.isClick = true;
                }else{
                    $('.ckd',checkAll)[0].style.display = '';
                    checkAll.isClick = false;
                }
            };
        }
        /*checkAll.onclick = function(){
            if($('.ckd',this)[0].style.display == "block"){
                $('.ckd',this)[0].style.display = '';
                for(var i = 0;i < cons.length;i++){
                    $('.ckd',cons[i])[0].style.display = '';
                    cons[i].style.backgroundColor= "";
                }
                num = 0;
            }else{
                $('.ckd',this)[0].style.display = 'block';
                for(var i = 0;i < cons.length;i++){
                    $('.ckd',cons[i])[0].style.display = 'block';
                    cons[i].style.backgroundColor= "#ff4040";
                }
                num = cons.length;
            }
        };
        for(var i = 0;i < cons.length;i++){
            cons[i].onmouseover = function(){
                this.style.backgroundColor= "#ff4040";
            };
            cons[i].onmouseout = function(){
                if(!$('.ckd',this)[0].style.display){
                    this.style.backgroundColor= "";
                }
            };
            cons[i].onclick = function(){
                console.log(num);
                if($('.ckd',this)[0].style.display == "block"){
                    num--;
                    $('.ckd',this)[0].style.display = '';
                }else{
                    num++;
                    $('.ckd',this)[0].style.display = 'block';
                }
                if(num == cons.length){
                    $('.ckd',checkAll)[0].style.display = 'block';
                }else{
                    $('.ckd',checkAll)[0].style.display = '';
                }
            };
        }*/
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
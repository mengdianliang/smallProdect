/**
 * Created by Administrator on 2017/7/16.
 */
/*
*  步骤：
*   1.获取节点；.slide a,item,pic,pager,desc_txt
*   2.picObj春初图片数据；
*   3.初始化页面；
*   4.添加按钮切换事件；
*   5.添加图片轮播事件；
*   6.优化代码(去重)；
* */
window.onload = function(){
    //获取节点
    var slides = $('.slide a'); //获取左右切换按钮组
    var item = $('.item');     //获取ul元素
    var pic = $('.pic');       //获取img元素
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
    var flag = true;

    init();
    slide();
    //代码去重
    function commons(){
        for(var i = 0;i < pic.length;i++){
            pager[i].innerHTML = (picObj[i].num + 1) + '/' + picObj[i].picArr.length;
            desc_txt[i].innerHTML = picObj[i].txt + "第" + (picObj[i].num + 1) + "张";
            pic[i].src = picObj[i].picArr[picObj[i].num];
        }
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
        for(var i = 0;i < pic.length;i++){
            picObj[i].num--;
            if(picObj[i].num < 0){
                picObj[i].num = picObj[i].picArr.length - 1;
            }
        }
        commons();
    };
    /*右按钮轮播切换*/
    slides[1].onclick = function (){
        flag = false;
        for(var i = 0;i < pic.length;i++){
            picObj[i].num++;
            if(picObj[i].num > picObj[i].picArr.length - 1){
                picObj[i].num = 0;
            }
        }
        commons();
    };
    /*图片切换*/
    function slide(){
        for(var i = 0;i < pic.length;i++){
            pic[i].index = i;
            pic[i].onclick = function(){
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
                commons();
            };
        }
    }
};
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
    var goods_list = $('.goods_list')[0]; //星星显示区域
    var allNums = $('.allNum')[0];     //获取总购物数元素
    var allPrice = $('.allPrice')[0];     //获取总购物数元素
    var bester = $('.best')[0];     //获取总购物数元素
    var item = ''; //获取每一种商品信息
    var goods = [
        {
            num: 0,
            price: 12.5
        },
        {
            num: 0,
            price: 10.5
        },
        {
            num: 0,
            price: 8.5
        },{
            num: 0,
            price: 8
        },
        {
            num: 0,
            price: 14.5
        }
    ];
    var len = goods.length;

    init();
    //代码去重
    function commons(){
        var calcNum = 0;
        var calcPrice = 0;
        var max = 0;
        for(var i = 0;i < len;i++){
            calcNum += parseInt(goods[i].num);
            calcPrice += parseFloat(goods[i].price) * parseInt(goods[i].num);
            if(parseInt(goods[i].num) > 0 && parseFloat(goods[i].price) > max){
                max = parseFloat(goods[i].price);
            }
        }
        allNums.innerHTML = calcNum;
        allPrice.innerHTML = calcPrice;
        bester.innerHTML = max;
    }
    function commonSingle(index){
        $(".goodNum", item[index])[0].innerHTML = goods[index].num;
        $(".pays", item[index])[0].innerHTML = '小计：' + goods[index].num * goods[index].price + ' 元';
    }
    //单件商品变化
    function singleGood(){
        item = $('.item'); //获取每一种商品信息
        for(var i = 0;i < len;i++) {
            commonSingle(i);
        }
    }
    //初始化页面
    function init(){
        addLi();
        singleGood();
        commons();
        mouseEvt();
    }
    /*添加li元素*/
    function addLi(){
        for(var i = 0;i < len;i++){
            goods_list.innerHTML += '<li class="item clearfix">' +
                '<span class="fl"><span class="minusBtn fl">-</span><span class="goodNum fl">' + goods[i].num + '</span><span class="addBtn fl">+</span></span>' +
                '<span class="bg fr"><span class="sPrice">单价：' + goods[i].price + '元</span><span class="pays">小计：' + goods[i].num * goods[i].price + ' 元</span></span></li>';
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

        for(var i = 0;i < len;i++){
            $('.minusBtn',item[i])[0].index = i;
            $('.minusBtn',item[i])[0].onclick = function(){
                goods[this.index].num--;
                if(goods[this.index].num < 0){
                    goods[this.index].num = 0;
                }
                commonSingle(this.index);
                commons();
            };
            $('.addBtn',item[i])[0]._index = i;
            $('.addBtn',item[i])[0].onclick = function(){
                goods[this._index].num++;
                commonSingle(this._index);
                commons();
            }
        }
    }
};
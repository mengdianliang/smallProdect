/**
 * Created by Administrator on 2017/7/31.
 */

window.onload = function(){
    /*
    *
    * */
    var tits = $('.tit');
    var menus = $('.menu');
    var menus_li = $('.menu li');
    /*代码去重*/
    function commons(){

    }
    for(var i = 0;i < menus.length;i++){
        menus[i].style.height = 0;
        for(var j = 0;j < $('li',menus[i]).length;j++){
            $('li',menus[i])[j].style.height = "28px";
        }
    }
    slide();
    menu();
    function slide(){
        for(var i = 0;i < tits.length;i++){
            tits[i].index = i;
            tits[i].onclick = function(){
                for(var i = 0;i < menus.length;i++){
                    if(i == this.index){
                        if(parseInt(menus[this.index].style.height)== '0') {
                            this.style.backgroundColor = '#aaaaaa';
                            $('.txt', this)[0].style.color = '#ffffff';
                            $('.trangle', this)[0].className = 'trangle trangle_hov fr';
                            //menus[this.index].style.display = 'block';
                            var menu_lis = $('li',menus[this.index]);
                            var hgt = parseInt(menus[this.index].style.height);
                            for(var h = 0;h < menu_lis.length;h++) {
                                console.log(parseInt(menu_lis[h].style.height) + 1);
                                hgt += (parseInt(menu_lis[h].style.height) + 1);
                                menu_lis[h].style.backgroundColor="";
                                menu_lis[h].isClick = 0;

                            }
                            animate(menus[this.index],{height: 0},{height: hgt},500,easeIn,'px');

                        }else{
                            this.style.backgroundColor = '';
                            $('.txt',this)[0].style.color = '';
                            $('.trangle',this)[0].className = 'trangle fr';
                            //menus[this.index].style.display = '';
                            console.log(menus[this.index].style.height);
                            animate(menus[this.index],{height: parseInt(menus[this.index].style.height)},{height: -parseInt(menus[this.index].style.height)},500,easeIn,'px');

                        }
                    }else{
                        tits[i].style.backgroundColor = '';
                        $('.txt',tits[i])[0].style.color = '';
                        $('.trangle',tits[i])[0].className = 'trangle fr';
                        //menus[i].style.display = '';
                        animate(menus[i],{height: parseInt(menus[i].style.height)},{height: -parseInt(menus[i].style.height)},500,easeIn,'px');

                    }

                }
            }
        }
    }
    function menu(){
        for(var i = 0;i < menus_li.length;i++){
            menus_li[i].isClick = 0;
            menus_li[i].onmouseover = function(){
                if(this.isClick == 0){
                    this.style.backgroundColor = "#00ff00";
                }
            };
            menus_li[i].onmouseout = function(){
                if(this.isClick == 0) {
                    this.style.backgroundColor = "";
                }
            };
            menus_li[i].onclick = function () {
                for(var m = 0;m < menus_li.length;m++) {
                    menus_li[m].style.backgroundColor = "";
                    menus_li[m].isClick = 0;
                }
                this.style.backgroundColor = '#ffff00';
                this.isClick = 1;
            };
        }
    }
 };


 //元素获取方法的重写
function $(element,obj){
    if(obj == null){
        return document.querySelectorAll(element);
    }else{
        return obj.querySelectorAll(element);
    }
}
/*执行动画的函数*/
function Linear(start,alter,curTime,dur) {
    return start+curTime/dur*alter;
}
function easeIn(start,alter,curTime,dur) {
    return start + Math.pow(curTime/dur,2)*alter;
}
function animate(o,start,alter,dur,fx,unit){
    unit = unit || "";
    var curTime = 0;
    console.log(o ,start,alter);
    var t = setInterval(function(){
        if(curTime >= dur) clearInterval(t);
        //o.style[attr] = Linear(start,alter,curTime,dur) + "px";
        for(var i in start) {
            o.style[i] = fx(start[i],alter[i],curTime,dur) + unit;
        }
        curTime += 50;
    },50);
}
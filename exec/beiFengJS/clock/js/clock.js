/**
 * Created by Administrator on 2017/8/1.
 */
//匿名函数自执行，相当于在函数内部执行了，可以避免函数重名的问题
(function(){
    window.onload = function(){
        new DigitClock($('digitClock'));
    };
    DigitClock.clocks = [];

    //图片预加载
    function preloadIamge(src){
        var img = document.createElement('img');
        img.src = src;
        preloadIamge.images.push(img);
    }
    preloadIamge.images = [];
    for (var i=0;i<10;i++) {
        preloadIamge("./images/"+i+".gif");
    }
    function DigitClock(container){
        this.images = getByClass('clockImage',container);
        this.container = container;
        DigitClock.clocks.push(this);
        DigitClock.redraw();
    }
    DigitClock.redraw = function(){
        //重绘所有的时钟实例
        var d = new Date();
        for(var i = 0;i < this.clocks.length;i++){
            this.clocks[i].setTime(d.getHours(), d.getMinutes(), d.getSeconds());
        }
    };
    DigitClock.preZero = function(n,pos){
        //n  接受的数字
        //pos 表示当数字少于pos位的时候，加前导0
        n = "" + n;
        if(n.length < pos){
            n = "0".repeat(pos - n.length) + n;
        }
        return n;
    };
    setInterval(function(){
        DigitClock.redraw();
    },1000);
    DigitClock.prototype.setTime = function(h,i,s){
        //h: 时
        //i: 分
        //s: 秒
        h = DigitClock.preZero(h,2);
        i = DigitClock.preZero(i,2);
        s = DigitClock.preZero(s,2);

       var str = ( h + i + s).split("");
        for(var i = 0;i < str.length;i++){
            this.images[i].src = './images/'+ str[i] +'.gif';
        }
    };


})();
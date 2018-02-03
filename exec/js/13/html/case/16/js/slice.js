/**
 * Created by Administrator on 2017/7/16.
 */

window.onload = function(){
    //获取节点
    var pic_list = $('.pic_list')[0];
    var points = $('.points li');
    var picHtml = '';
    var _zIndex = 0;

    init();  //初始化
    function init(){
        initVal(100);
        mouseEvt();
    }
    //初始化值
    function initVal(len){
        var wid = getRealStyle($('.pics')[0],'width');
        var singleWid = parseFloat(wid)/len;
        for(var i = 0;i < len;i++){
            if(i > len/2){
                _zIndex--;
            }else{
                _zIndex++;
            }
            picHtml += '<li style="z-index:' + _zIndex + ';"><a href="javascript:void(0);"></a><a href="javascript:void(0);"></a><a href="javascript:void(0);"></a><a href="javascript:void(0);"></a></li>';
        }
        pic_list.innerHTML = picHtml;
        for(var i = 0;i < len;i++){
            $('li',pic_list)[i].style.width = singleWid + 'px';
            $('li',pic_list)[i].style.transition = '1s ' + (i * 0.08) + 's';
            for(var j = 0;j < $('a',$('li',pic_list)[i]).length;j++) {
                $('a', $('li', pic_list)[i])[j].style.backgroundPosition = +(-i * singleWid) + 'px';
                $('a', $('li', pic_list)[i])[j].style.width = singleWid + 'px';
            }
        }
    }
    //鼠标点击事件
    function mouseEvt(){
        for(var i = 0;i < points.length;i++){
            points[i].index = i;
            points[i].onclick = function(){
                for(var i = 0;i < $('li',pic_list).length;i++){
                    //oDiv.style.cssText="width:150px; height:150px; background:red;color:#FFF;"  可以尝试使用cssText
                    $('li',pic_list)[i].style.transform = "translateZ(-180px) rotateX("+(this.index * 90) + "deg)";
                }

            };
        }
    }
    //代码去重
    function commons(){

    }
    //元素获取方法的重写
    function $(element,obj){
        if(obj == null){
            return document.querySelectorAll(element);
        }else{
            return obj.querySelectorAll(element);
        }
    }

    function autoPlayPic(){


    }
    //获取样式
    function getRealStyle(o,name) {
        if (window.getComputedStyle) {
            var style=window.getComputedStyle(o,null);
            return style.getPropertyValue(name);
        } else {
            var style=o.currentStyle;
            if (name=="float")
                name="styleFloat";
            return style[name];
        }

    }

};
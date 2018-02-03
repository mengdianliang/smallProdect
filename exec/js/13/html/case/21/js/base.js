/**
 * Created by Administrator on 2017/8/21.
 */

/******************************************/
//获取css样式
function getRealStyle(o,name) {
    if (window.getComputedStyle) {
        var style = window.getComputedStyle(o,null);
        return style[name];
    } else {
        var style = o.currentStyle;
        if (name=="float"){
            name="styleFloat";   //IE下
        }else if(name == 'opacity'){
            name = 'filter';    //IE9以下
        }
        return style[name];
    }
}
/*****************************************/
// 随机获取颜色rgba()值
/*
 * 这里 flag是一个布尔值； 为true,我就是获取随机透明度
 * 因为 rgba有四个值rgba(color1,color2,color3,透明度);
 *
 * 我这里通过arr.push()方法来往一个空数组里添加元素，来获取添加了三个颜色，一个透明度的数组，
 * 然后通过toString()方法做字符创拼接，返回一个rgba()值；
 *
 * Math.random()是获取了0到1之间的随机数，但这个随机数是包括0不包括1的，即[0,1)的取值范围
 *
 * */
function getRandomColorRgba(flag){
    var arr = [];
    var opcyVal = flag ? Math.random() : 1;
    for(var i = 0; i < 3;i++){
        arr.push(parseInt(Math.random()*256));
    }
    arr.push(opcyVal);
    return 'rgba(' + arr.toString() + ')';
}
// 随机获取颜色值
function getRandomColor(){
    return '#' + (function(h) {
        return new Array(7 - h.length).join("0") + h
    })((parseInt(Math.random() * 0x1000000)).toString(16))
}
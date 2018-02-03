/**
 * Created by Administrator on 2017/7/31.
 */

window.onload = function(){
    /*
    *
    * */
    var inputs = $('input');
    var showInfos = $('.showInfo');
    /*代码去重*/
    function commons(){

    }
    //初始化代码
    function init(){

    }
    slide();
    //元素获取方法的重写
    function $(element,obj){
        if(obj == null){
            return document.querySelectorAll(element);
        }else{
            return obj.querySelectorAll(element);
        }
    }

    function slide() {
        for (var i = 0; i < inputs.length; i++) {

            /*inputs[i].onclick = function(){
                 for(var j = 0; j < inputs.length;i++){
                     showInfos[j].style.backgroundColor = "";
                     showInfos[j].style.border = "";
                     $('label',showInfos[j])[0].style.color = "";
                     $('.angle',showInfos[j])[0].style.display = "";
                 }

                 showInfos[this.index].style.backgroundColor = "#ff0000";
                 showInfos[this.index].style.border = "2px solid #333333";
                 $('label',showInfos[this.index])[0].style.color = "#ffffff";
                 $('.angle',showInfos[this.index])[0].style.display = "block";
             };*/
            inputs[i].index = i;
            inputs[i].onclick = function () {
                if ($('.angle', showInfos[this.index])[0].style.display == "block") {
                    showInfos[this.index].style.backgroundColor = "";
                    showInfos[this.index].style.border = "";
                    $('label', showInfos[this.index])[0].style.color = "";
                    $('.angle',showInfos[this.index])[0].style.display = "";
                } else {
                    showInfos[this.index].style.backgroundColor = "#ff0000";
                    showInfos[this.index].style.border = "2px solid #333333";
                    $('label', showInfos[this.index])[0].style.color = "#ffffff";
                    $('.angle', showInfos[this.index])[0].style.display = "block";
                }
            };
        }
    }

};
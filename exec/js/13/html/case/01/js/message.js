/**
 * Created by Administrator on 2017/7/16.
 */
window.onload = function(){
    var list =$(".list")[0];
    var info_img = $(".img_info")[0];
    var msg = $(".msg")[0];
    var btn = $(".btn")[0];
    var addInfo = list.innerHTML;
    var flag= true;
    function $(element){
        return document.querySelectorAll(element);
    }
    function trim(str){
        return str.replace(/^\s+|\s+$/g,"");
    }
    function changeImg(obj){
        if(obj.title=="张三"){
            obj.title="李四";
            obj.alt="李四";
            obj.src= "../01/img/b.png";
            flag = false;
        }else{
            obj.title="张三";
            obj.alt="张三";
            obj.src= "../01/img/a.png";
            flag = true;
        }
    }
    function leaveMsg(){
        var trimInfo = trim(msg.value);
        if(trimInfo == "") return;
        var toAdd = '';
        if(flag){
            toAdd = '<li class="clearfix">'
                +'<div class="showInfo fl">'
                +'<a href="#" class="lft">'
                +'<img src="img/a.png" title="张三" alt="张三"/>'
                +'</a>'
                +'<span class="showTxt ltxt">' + trimInfo + '</span>'
                +'</div>'
                +'</li>';
        }else{
            toAdd = '<li class="clearfix">'
                +'<div class="showInfo fr">'
                +'<a href="#" class="rft">'
                +'<img src="img/b.png" title="李四" alt="李四"/>'
                +'</a>'
                +'<span class="showTxt rtxt">' + trimInfo + '</span>'
                +'</div>'
                +'</li>';
        }
        addInfo += toAdd;
    }
    info_img.onclick = function(){
        changeImg($('.img_info img')[0]);
    };
    btn.onclick = function(){
       leaveMsg();
        msg.value = "";
       list.innerHTML = addInfo;
    }
};
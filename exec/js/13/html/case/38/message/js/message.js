/**
 * Created by Administrator on 2017/7/16.
 */
window.onload = function(){
    var list =$(".list")[0];
    var info_img = $(".img_info")[0];
    var msg = $(".msg")[0];
    var btn = $(".btn")[0];

    var keySend = $('.key_send')[0];
    var keyList = $('.key_list')[0];
    console.log(keySend,keyList);

    var addInfo = list.innerHTML;
    var picArr = {
        "zhangsan": {
            "id": "1",
            "title": "张三",
            "alt": "张三",
            "src": "./img/a.png"
        },
        "lisi": {
            "id": "2",
            "title": "李四",
            "alt": "李四",
            "src": "./img/b.png"
        }
    };
    var flag = true;
    function $(element){
        return document.querySelectorAll(element);
    }
    function trim(str){
        return str.replace(/^\s+|\s+$/g,"");
    }
    function changeImg(obj,el){
        if(el){
            el.innerHTML = "<img src=" + obj.src + " title=" + obj.title + " alt=" + obj.alt + ">";
        }else{
            return "<img src=" + obj.src + " title=" + obj.title + " alt=" + obj.alt + ">";
        }

    }
    function leaveMsg(){
        var trimInfo = trim(msg.value);
        if(trimInfo == "") return;
        var toAdd = '';
        if(flag){
            toAdd = '<li class="clearfix">'
                +'<div class="showInfo to_l">'
                +'<a href="#" class="lft fl">' + changeImg(picArr["zhangsan"]) + '</a>'
                +'<span class="showTxt ltxt">' + trimInfo + '</span>'
                +'</div>'
                +'</li>';
        }else{
            toAdd = '<li class="clearfix">'
                +'<div class="showInfo to_r">'
                +'<a href="#" class="rft fr">' + changeImg(picArr["lisi"]) + '</a>'
                +'<span class="showTxt rtxt">' + trimInfo + '</span>'
                +'</div>'
                +'</li>';
        }
        addInfo += toAdd;
    }
    info_img.onclick = function(){
        if(flag){
            changeImg(picArr["lisi"],info_img);
        }else{
            changeImg(picArr["zhangsan"],info_img);
        }
        flag = !flag;
    };
    btn.onclick = function(){
       leaveMsg();
        msg.value = "";
       list.innerHTML = addInfo;
    };
    keySend.onclick = function(){
        keyList.style.display = 'block';
    };
    for(var i = 0;i < $('.key_list a').length;i++){
        $('.key_list a')[i].onclick = function(){
            keyList.style.display = '';
            keySend.innerHTML = this.innerHTML;
        };
    }

    msg.onkeydown = function(evt){
        evt = window.event || evt;
        if(keySend.innerHTML == 'ctrl'){
            if(evt.ctrlKey && evt.keyCode != 13){
                leaveMsg();
                msg.value = "";
                list.innerHTML = addInfo;
            }
        }else if(keySend.innerHTML == 'ctrl+13'){
            if(evt.keyCode == 13 && evt.ctrlKey){
                leaveMsg();
                msg.value = "";
                list.innerHTML = addInfo;
            }
        }
    };

};
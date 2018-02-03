/**
 * Created by Administrator on 2017/7/31.
 */

window.onload = function () {
    var contentList = $('contentList');
    var li = contentList.getElementsByTagName('li')[0];
    contentList.removeChild(li);
    var fm = $('fm1');
    var msgTitle = $('msgTitle');
    var userName = $('userName');
    var msgContent = $('msgContent');
    fm.onsubmit = function(evt){
        if(evt){
            evt.preventDefault();
        }else{
            window.event.returnValue = false;
        }
        var title = msgTitle.value;
        var user = userName.value;
        var content = msgContent.value;
        if(title && user && content){
            var newLi = li.cloneNode(true); //连子节点一起克隆
            var msgTitleSpan = getByClass('msgTitle',newLi)[0];
            var userNameSpan = getByClass('userName',newLi)[0];
            var msgDateSpan = getByClass('msgDate',newLi)[0];
            var msgContentSpan = getByClass('msgContent',newLi)[0];
            msgTitleSpan.innerHTML = title;
            userNameSpan.innerHTML = user;
            msgDateSpan.innerHTML = date('Y年m月d日 H:i:s',new Date());
            msgContentSpan.innerHTML = htmlEncode(content);
            console.log(title,user,content);

            contentList.appendChild(newLi);
        }else{
            alert('请将表单填写完整！');
        }

     };

    $('sortASC').onclick = function(){
        sortBBS(1);
    };
    $('sortDESC').onclick = function(){
        sortBBS(-1);
    };
    function sortBBS(dir){
        var list = contentList.getElementsByTagName('li');
        if(!list){
            return;
        }
        var a = [],dateSpan,tuple,d,re=/(\d{4})年(\d{1,2})月(\d{1,2})日 (\d{1,2}):(\d{1,2}):(\d{1,2})/;
        for(var i =0;i < list.length;i++){
            dateSpan = getByClass('msgDate',list[i])[0];
            tuple = re.exec(dateSpan.innerHTML);
            d = new Date();
            d.setFullYear(tuple[1]);
            d.setMonth(tuple[2] - 1);
            d.setDate(tuple[3]);
            d.setHours(tuple[4]);
            d.setMinutes(tuple[5]);
            d.setSeconds(tuple[6]);
            a.push({
                node: list[i],
                date: d.getTime()
            });
        }

        a.sort(function($1,$2){
            if($1.date > $2.date) return dir;
            else if($1.date < $2.date) return -dir;
            else return 0;
        });
        contentList.innerHTML = '';  //会存在内存泄漏的问题
        var frag = document.createDocumentFragment();  //文档片段
        for(var j = 0;j < a.length;j++){
           frag.appendChild(a[j].node);
        }
        contentList.appendChild(frag);
    }
};



/**
 * Created by Administrator on 2017/9/28.
 */
(function(){
    //主体内容的自适应
    var header = tools.$(".header")[0];
    var weiyunContent = tools.$(".weiyun-content")[0];

    var headerH = header.offsetHeight;

    changeHeight();
    function changeHeight(){
        var viewHeight = document.documentElement.clientHeight;
        weiyunContent.style.height = viewHeight - headerH + "px";
    }
    window.onresize = changeHeight;

    //要准备的数据
    var datas = data.files;
    var renderId = 0;  //默认一上来就渲染这个id下的所有的子数据
    //文件区域容器
    var fileList = tools.$('.file-list')[0];
    //文件导航区域的容器
    var pathNav = tools.$('.path-nav')[0];
    //没有文件提醒的结构
    var empty = tools.$(".g-empty")[0];
    var childs = dataControl.getChildById(datas,renderId);
    var html = '';
    childs.forEach(function(item){
        html += filesHtml(item);
    });
    fileList.innerHTML = html;


    //渲染菜单区域
    var treeMenu = tools.$('.tree-menu')[0];
    var getPidInput = tools.$("#getPidInput");
    treeMenu.innerHTML = treeHtml(datas,-1);


    //定位到指定的树形菜单上
    positionTree(tools.$('.tree-menu')[0],0);

    //渲染文件导航
    pathNav.innerHTML = createPathNavHtml(datas,0);

    //利用事件委托，点击树形菜单区域，找到事件源
    tools.addEvent(treeMenu,'click',function(evt){
        evt = window.event || evt;
        var target = evt.target;
        if(tools.parents(target,'.tree-title')){
            target = tools.parents(target,'.tree-title');
            //找到.tree-title 对应的fileId

            var fileId = target.dataset.fileId;
            renderNavFilesTree(fileId);

        }
    });
    //利用事件委托，点击面包屑导航，找事件源
    tools.addEvent(pathNav,'click',function(evt){
        evt = window.event || evt;
        var target = evt.target;
        console.log(pathNav,target);
        console.log(tools.parents(target,"a"));
        if(tools.parents(target,'a')){
            var fileId = target.dataset.fileId;
            console.log(fileId);
            renderNavFilesTree(fileId);
        }

    });
    //利用事件委托，点击每一个文件夹，找事件源
    tools.addEvent(fileList,'click',function(evt){
        evt = window.event || evt;
        var target = evt.target;
        if(tools.parents(target,'.item')){
            target = tools.parents(target,'.item');
            var fileId = target.dataset.fileId;
            renderNavFilesTree(fileId);
        }
    });

    var fileItem = tools.$('.file-item',fileList);  //获取所有的文件
    var checkboxs = tools.$('.checkbox',fileList);  //获取所有选中框
    var checkedAll = tools.$(".checked-all")[0];    //获取到全选按钮
    var contentMenu = tools.$('.content-menu')[0];  //获取右键菜单
    //文件夹移入移出，多选框选中,添加，删除，重命名，移动到事件
    function fileEvent(item){
        var check = tools.$('.checkbox',item)[0];
        tools.addEvent(item,'mouseenter',function(){
            if(!tools.hasClass(check,"checked")){
                tools.addClass(this,'file-checked');
            }
        });
        tools.addEvent(item,'mouseleave',function(){
            if(!tools.hasClass(check,"checked")){
                tools.removeClass(this,'file-checked');
            }
        });
        //右键点击事件
        tools.addEvent(item,'contextmenu',function(evt){
            evt = window.event || evt;
            tools.each(fileItem,function(_item,index){
                if(_item == item){
                    tools.addClass(_item,'file-checked');
                    tools.addClass(checkboxs[index],'checked');
                }else{
                    tools.removeClass(_item,'file-checked');
                    tools.removeClass(checkboxs[index],'checked');
                    tools.removeClass(checkedAll,'checked');
                }
            });
            var disX = evt.clientX;
            var disY = evt.clientY;
            contentMenu.style.left = disX + 'px';
            contentMenu.style.top = disY + 'px';
            contentMenu.style.display = 'block';

        });
        //单个多选框的点击事件
        tools.addEvent(check,'click',function(evt){
            evt = window.event || evt;
            var isClick = tools.toggleClass(this,'checked');
            if(isClick){
                if(whoSelect().length == checkboxs.length){
                    tools.addClass(checkedAll,'checked');
                }else{
                    tools.removeClass(checkedAll,'checked');
                }
            }
            evt.cancelBubble = true || evt.stopPropagation();
        });
        tools.addEvent(check,'mousedown',function(evt){
            evt = window.event || evt;
            evt.cancelBubble = true || evt.stopPropagation();
        });
    }

    tools.each(fileItem,function(item,index){
        fileEvent(item);
    });

    tools.addEvent(checkedAll,'click',function(){
        var isClick = tools.toggleClass(this,'checked');
        if(isClick){
            tools.each(fileItem,function(item,index){
                tools.addClass(item,'file-checked');
                tools.addClass(checkboxs[index],'checked');
            });
        }else{
            tools.each(fileItem,function(item,index){
                tools.removeClass(item,'file-checked');
                tools.removeClass(checkboxs[index],'checked');
            });
        }
    });
    //存储选中的多选框
    function whoSelect(){
        var arr = [];
        tools.each(checkboxs,function(item,index){
            if(tools.hasClass(item,'checked')){
                arr.push(fileItem[index]);
            }
        });
        return arr;
    }


    //创建文件夹
    var create = tools.$('.create')[0];
    tools.addEvent(create,'mousedown',function(evt){
        evt = window.event || evt;
        empty.style.display = 'none';
        var newEle = createFileEle({
            title: '',
            id: new Date().getTime()
        });
        fileList.insertBefore(newEle,fileList.firstElementChild);

        //获取标题，及其输入框
        var fileTit = tools.$('.file-title',newEle)[0];
        var fileEdit = tools.$('.file-edtor',newEle)[0];
        var editor = tools.$('.edtor',newEle)[0];
        fileTit.style.display = 'none';
        fileEdit.style.display = 'block';
        //editor.select();  //自动选中状态
        editor.onclick = editor.onmousedown = function(evt){
            evt.cancelBubble = true || evt.stopPropagation();
            this.select();
        };
        create.isCreateFile = true;  //添加一个状态，表示正在创建文件
        evt.cancelBubble = true || evt.stopPropagation();
    });

    //给document绑定一个mousedown，名字输入成功
    tools.addEvent(document,'mousedown',function(){
        if(contentMenu.style.display == 'block'){
            contentMenu.style.display = '';
        }
        if(create.isCreateFile){
            var firstEle = fileList.firstElementChild;
            var editor = tools.$('.edtor',firstEle)[0];
            var val = editor.value.trim();

            if(val === ''){
                fileList.removeChild(firstEle);
                //需要判断创建失败时，文件列表是否为空
                if( fileList.innerHTML === "" ){
                    empty.style.display = "block";
                }
                tips('err','新建文件名不能为空！');
            }else{
                var fileTit = tools.$('.file-title',firstEle)[0];
                var fileEdit = tools.$('.file-edtor',firstEle)[0];

                fileTit.style.display = "block";
                fileEdit.style.display = "none";

                fileTit.innerHTML = val;

                //给新创建的文件添加事件处理
                fileEvent(firstEle);

                var pid = getPidInput.value;  //获取临时存储的pid

                //获取当前元素的id
                var fileId = tools.$('.item',firstEle)[0].dataset.fileId;

                //新建元素的数据结构，并存储数据
                var newFileData = {
                    id:fileId,
                    pid:pid,
                    title:val,
                    type:"file"
                };
                //放在数据中
                datas.unshift(newFileData);
                //datas.splice(0,0,newFileData);

                //获取创建文件的父级ul
                var ele = document.querySelector('.tree-title[data-file-id="'+ pid + '"]');
                var nextUl = ele.nextElementSibling;

                var level  = dataControl.getLevelById(datas,fileId);
                //调用创建菜单的函数
                nextUl.appendChild(createTreeHtml({
                    id: fileId,
                    title: val,
                    level: level
                }));
                if(nextUl.innerHTML !== ''){
                    tools.addClass(ele,'tree-contro');
                    tools.removeClass(ele,'tree-contro-none');
                }
                tools.each(fileItem,function(item,index){
                    tools.removeClass(item,'file-checked');
                    tools.removeClass(checkboxs[index],'checked');
                });
                tools.removeClass(checkedAll,'checked');
                //提醒框
                tips('ok','新建文件成功！');
            }
            create.isCreateFile = false;
        }else if(rename.isRenameFile){
            var arr = whoSelect();//存储选中的文件
            if(arr.length){
                var num = 0;
                tools.each(arr,function(item,index){
                    //获取标题，及其输入框
                    var editor = tools.$('.edtor',item)[0];
                    var val = editor.value.trim();
                    if(val !== '') {
                        num++;
                    }
                });

                if(num < arr.length){
                    tips('err','文件名不能为空！');
                }else{
                    var treeTitle = tools.$('.tree-title',treeMenu);
                    tools.each(arr,function(item,index){
                        var fileTit = tools.$('.file-title',item)[0];
                        var fileEdit = tools.$('.file-edtor',item)[0];
                        var editor = tools.$('.edtor',item)[0];
                        var val = editor.value.trim();

                        fileTit.style.display = "block";
                        fileEdit.style.display = "none";
                        console.log(fileEdit,fileTit,editor);
                        fileTit.innerHTML = val;
                        for(var i = 0;i < treeTitle.length;i++){
                            if(treeTitle[i].dataset.fileId == dataArr[index]){
                                tools.$('.ellipsis',treeTitle[i])[0].innerHTML = val;
                                break;
                            }
                        }
                        datas.forEach(function(item,indx){
                            console.log();
                            if(item.id == dataArr[index]){
                                item.title = val;
                            }
                        });
                    });
                    tools.each(fileItem,function(item,index){
                        tools.removeClass(item,'file-checked');
                        tools.removeClass(checkboxs[index],'checked');
                    });
                    tools.removeClass(checkedAll,'checked');
                    tips('ok','文件重命名成功！');
                    arr = [];
                    dataArr = [];
                }
            }
            rename.isRenameFile = false;
        }else{
            tools.each(fileItem,function(item,index){
                tools.removeClass(item,'file-checked');
                tools.removeClass(checkboxs[index],'checked');
            });
            tools.removeClass(checkedAll,'checked');
        }
    });

    //封装的提醒信息
    var fullTip = tools.$('.full-tip-box')[0];
    var tipText = tools.$('.text',fullTip)[0];

    function tips(cls,title){
        fullTip.style.top = 0;
        fullTip.className = 'full-tip-box';
        fullTip.style.transition = '0.3s';
        tools.addClass(fullTip,cls);
        tipText.innerHTML = title;

        clearTimeout(fullTip.timer);
        fullTip.timer = setTimeout(function(){
            fullTip.style.top = '-32px';
        },2000);
    }

    //框选文件
    /*
    * 1.生成一个框选框
    * 2.碰撞检测
    * */

    var newSel = null;
    var disX = 0;
    var disY = 0;
    tools.addEvent(document,'mousedown',function(evt){
        evt = window.event || evt;
        var target = evt.target;

        disX = evt.clientX;
        disY = evt.clientY;

        //如果框选在选中框上边，则取消框选
        if(tools.parents(target,'.nav-a')){
            return;
        }
        //鼠标移动
        tools.addEvent(document,'mousemove',moveFn);
        tools.addEvent(document,'mouseup',upFn);
        evt.preventDefault();
        return false;
    });
    function moveFn(evt){
        evt = window.event || evt;
        //框选框大于一定范围时，才做框选操作
        if( Math.abs(evt.clientX - disX) > 10 || Math.abs(evt.clientY - disY) > 10 ){
            if(!newSel) {
                newSel = document.createElement('div');
                newSel.className = 'selectTab';
                document.body.appendChild(newSel);

            }
            newSel.style.display = 'block';
            newSel.style.left = disX + 'px';
            newSel.style.top = disY + 'px';

            var wid = evt.clientX - disX;
            var hgt = evt.clientY - disY;

            newSel.style.left = Math.min(evt.clientX,disX) + 'px';
            newSel.style.top = Math.min(evt.clientY,disY) + 'px';

            newSel.style.width = Math.abs(wid) + 'px';
            newSel.style.height = Math.abs(hgt) + 'px';



            //检测碰撞，遍历文件区域所有的文件

            tools.each(fileItem,function(item,index){
                if(tools.collisionRect(item,newSel)){
                    tools.addClass(item,'file-checked');
                    tools.addClass(checkboxs[index],'checked');
                }else{
                    tools.removeClass(item,'file-checked');
                    tools.removeClass(checkboxs[index],'checked');
                }
            });
            if( whoSelect().length === checkboxs.length ){
                tools.addClass(checkedAll,"checked");
            }else{
                tools.removeClass(checkedAll,"checked");
            }
        }

    }
    function upFn(){
        tools.removeEvent(document,'mousemove',moveFn);
        tools.removeEvent(document,'mouseup',upFn);
        if(newSel) {
            newSel.style.display = 'none';
            newSel.style.width = '0px';
            newSel.style.height = '0px';
        }
    }
    delection();
    //删除文件
    var dataArr = [];   //存储选中文件的id
    function delection(){
        var del = tools.$('.delect');  //删除按钮
        //console.log(del.length);

        for(var i = 0;i < del.length;i++){
            tools.addEvent(del[i],'mousedown',function(evt){
                evt = window.event || evt;
                var target = evt.target;
                if(target.getAttribute('frag') == 'true'){
                    var item = tools.parents(target,'.file-item');
                    tools.each(fileItem,function(_item,index){
                        if(_item == item){
                            tools.addClass(_item,'file-checked');
                            tools.addClass(checkboxs[index],'checked');
                        }else{
                            tools.removeClass(_item,'file-checked');
                            tools.removeClass(checkboxs[index],'checked');
                            tools.removeClass(checkedAll,'checked');
                        }
                    });
                    evt.cancelBubble = true || evt.stopPropagation();
                }
                operDel();
                if(contentMenu.style.display == 'block'){
                    contentMenu.style.display = '';
                }
                console.log(datas);
            });
        }
    }

    function operDel(){
        var arr = whoSelect();//存储选中的文件
        if(arr.length){
            var treeTitle = tools.$('.tree-title',treeMenu);

            tools.each(arr,function(item,index){
                var fileId = tools.$('.item',item)[0].dataset.fileId;
                delData(fileId);
                for(var i = 0;i < treeTitle.length;i++){
                    if(treeTitle[i].dataset.fileId == fileId){
                        treeTitle[i].parentNode.parentNode.removeChild(treeTitle[i].parentNode);
                        break;
                    }
                }
            });
            tools.each(arr,function(item,index){
                fileList.removeChild(item);
            });
            //console.log(dataArr,datas);
            dataArr.forEach(function(val){
                datas.forEach(function(item,index){
                    if(item.id == val){
                        datas.splice(index,1);
                    }
                });
            });
            var pid = getPidInput.value;
            renderNavFilesTree(pid);
            //判断当前树形菜单是否有子元素
            var ele = document.querySelector('.tree-title[data-file-id="'+ pid + '"]');
            var nextUl = ele.nextElementSibling;
            if(nextUl.innerHTML == ''){
                tools.removeClass(ele,'tree-contro');
                tools.addClass(ele,'tree-contro-none');
            }
            tips('ok','文件删除成功！');
        }else{
            tips('err','请选择要删除的文件！');
        }
        arr = [];
        dataArr = [];
        movtion();
        delection();
        reName();
    }
    function delData(fileId){
        dataArr.push(fileId);
        if(dataControl.hasChilds(datas,fileId)){
            var childs = dataControl.getChildById(datas,fileId);
            childs.forEach(function(item){
                delData(item.id);
            });
        }
    }
    var rename = tools.$('.rename');  //重命名按钮
    reName();
    //文件重命名
    function reName(){
        //文件重命名
        rename = tools.$('.rename');  //重命名按钮
        //console.log(rename.length);
        for(var i = 0;i < rename.length;i++){
            tools.addEvent(rename[i],'mousedown',function(evt){
                evt = window.event || evt;
                var target = evt.target;
                //需要阻止文件的点击事件冒泡
                if(target.getAttribute('frag') == 'true'){
                    tools.addEvent(this,'click',function(evt){
                        evt = window.event || evt;
                        evt.cancelBubble = true || evt.stopPropagation();
                    });
                    var item = tools.parents(target,'.file-item');
                    tools.each(fileItem,function(_item,index){
                        if(_item == item){
                            tools.addClass(_item,'file-checked');
                            tools.addClass(checkboxs[index],'checked');
                        }else{
                            tools.removeClass(_item,'file-checked');
                            tools.removeClass(checkboxs[index],'checked');
                            tools.removeClass(checkedAll,'checked');
                        }
                    });
                }
                var arr = whoSelect();//存储选中的文件
                if(arr.length){

                    tools.each(arr,function(item,index){
                        var fileId = tools.$('.item',item)[0].dataset.fileId;
                        dataArr.push(fileId);
                        //获取标题，及其输入框
                        var fileTit = tools.$('.file-title',item)[0];
                        var fileEdit = tools.$('.file-edtor',item)[0];
                        var editor = tools.$('.edtor',item)[0];

                        editor.onclick = editor.onmousedown = function(evt){
                            evt.cancelBubble = true || evt.stopPropagation();
                            this.select();
                        };
                        fileTit.style.display = 'none';
                        fileEdit.style.display = 'block';
                        rename.isRenameFile = true;  //添加一个状态，表示正在创建文件
                    });
                    tools.$('.edtor',arr[0])[0].select();  //自动选中状态
                }else{
                    tips('err','请选择要重命名的文件！');
                }
                arr = [];
                if(contentMenu.style.display == 'block'){
                    contentMenu.style.display = '';
                }
                evt.cancelBubble = true || evt.stopPropagation();
            });
            tools.addEvent(rename[i],'click',function(evt) {
                evt = window.event || evt;
                evt.cancelBubble = true || evt.stopPropagation();
            });
        }
    }


     movtion();
    //文件夹移动
    function movtion(){
        var move = tools.$('.move');  //重命名按钮
        var popup = new  PopUp();
        for(var i = 0;i < move.length;i++){
            tools.addEvent(move[i],'mousedown',function(evt){
                evt = window.event || evt;
                var target = evt.target;
                if(target.getAttribute('frag') == 'true'){
                    tools.addEvent(this,'click',function(evt){
                        evt = window.event || evt;
                        evt.cancelBubble = true || evt.stopPropagation();
                    });
                    var item = tools.parents(target,'.file-item');
                    tools.each(fileItem,function(_item,index){
                        if(_item == item){
                            tools.addClass(_item,'file-checked');
                            tools.addClass(checkboxs[index],'checked');
                        }else{
                            tools.removeClass(_item,'file-checked');
                            tools.removeClass(checkboxs[index],'checked');
                            tools.removeClass(checkedAll,'checked');
                        }
                    });
                    evt.cancelBubble = true || evt.stopPropagation();
                }
                var str = treeHtml(datas,-1);
                var arr = whoSelect();//存储选中的文件
                if(arr.length){
                    popup.total.innerHTML = arr.length + '个文件';
                    datas.forEach(function(item,index){
                        if(item.id == 0){
                            popup.fileMovePathTo.innerHTML = item.title;
                        }
                    });
                    popup.open({
                        content: str
                    });
                    tools.each(arr,function(item,index) {
                        var fileId = tools.$('.item', item)[0].dataset.fileId;
                        delData(fileId);
                    });
                    //定位到指定的弹框树形菜单上
                    positionTree(popup.dirTree,0);

                    console.log(popup);
                    //确定按钮
                    popup.onconfirm = function(){
                        var pid = getPidInput.value.trim();
                        tools.each(arr,function(itm,indx) {
                            var fileId = tools.$('.item', itm)[0].dataset.fileId;
                            //console.log(fileId);
                            datas.forEach(function(item,index){
                                if(item.id == fileId){
                                    item.pid = pid;
                                }
                            });

                        });
                        tools.each(fileItem,function(item,index){
                            tools.removeClass(item,'file-checked');
                            tools.removeClass(checkboxs[index],'checked');
                        });
                        tools.removeClass(checkedAll,'checked');
                        treeMenu.innerHTML = treeHtml(datas,-1);
                        treeMenu = tools.$('.tree-menu')[0];
                        renderNavFilesTree(pid);
                        arr = [];
                        dataArr = [];
                        tips('ok','文件移动成功！');
                        movtion();
                        delection();
                        reName();
                    };
                    //关闭和取消按钮
                    popup.onclose = function(){

                    };
                }else{
                    tips('err','请选择要移动的文件！');
                }
            });

        }
        //利用事件委托，点击树形菜单区域，找到事件源
        tools.addEvent(popup.dirTree,'click',function(evt){
            evt = window.event || evt;
            var target = evt.target;
            if(tools.parents(target,'.tree-title')){
                target = tools.parents(target,'.tree-title');
                //找到.tree-title 对应的fileId

                var fileId = target.dataset.fileId;
                var num = 0;
                dataArr.forEach(function(val){
                    if(val !== fileId){
                        num++;
                    }
                });
                //console.log(num);
                if(num == dataArr.length){
                    var treeNav = tools.$('.tree-nav',popup.dirTree)[0];
                    tools.removeClass(treeNav,'tree-nav');
                    positionTree(popup.dirTree,fileId);
                    datas.forEach(function(item,index){
                        if(item.id == fileId){
                            popup.fileMovePathTo.innerHTML = item.title;
                        }
                    });
                    getPidInput.value = fileId;
                    popup.error.innerHTML = '';
                }else{
                    popup.error.innerHTML = '不能移动到自身及其子集里';
                }
            }
        });
    }

    //列表切换
    var changeList = tools.$('.list_change a');  //获取列表切换的元素
    for(var i = 0;i < changeList.length;i++){
        changeList[i].index = i;
        tools.addEvent(changeList[i],'click',function(){
            for(var j = 0;j < changeList.length;j++){
                tools.removeClass(changeList[j],'active');
            }
            if(!tools.hasClass(this,'active')){
                tools.addClass(this,'active');
                //切换列表
                if(this.index == 1){
                    tools.addClass(fileList,'file-line');

                }else{
                    tools.removeClass(fileList,'file-line');
                }

            }
        });
    }

    function renderNavFilesTree(fileId){
        //渲染导航区域
        pathNav.innerHTML = createPathNavHtml(datas,fileId);

        var hasChilds = dataControl.hasChilds(datas,fileId);
        //判断是否有子元素，来渲染文件区域
        if(hasChilds){
            empty.style.display = 'none';
            fileList.innerHTML = createFileHtml(datas,fileId);
        }else{
            empty.style.display = 'block';
            fileList.innerHTML = '';
        }
        //需要给当前div添加样式，其余的div没有样式
        var treeNav = tools.$('.tree-nav',treeMenu)[0];
        if(treeNav){
            tools.removeClass(treeNav,'tree-nav');
        }
        positionTree(tools.$('.tree-menu')[0],fileId);

        //通过隐藏域记录一下当前操作的父id
        getPidInput.value = fileId;

        //每次重新再fileList中生成文件，那么需要给这些文件绑定事件
        tools.each(fileItem,function(item,index){
            fileEvent(item);
        });

        tools.removeClass(checkedAll,"checked");
    }
    //阻止右键默认行为
    tools.addEvent(document,'contextmenu',function(evt){
        evt = window.event || evt;
        evt.preventDefault();
        return false;
    });

    function reGet(){
        del = tools.$('.delect');  //删除按钮
    }
})();
/**
 * Created by Administrator on 2017/9/11.
 */
(function(){

    //让内容区域高度自适应
    var header = tools.$('.header')[0];
    var weiyunContent = tools.$('.weiyun-content')[0];
    var pathNav = tools.$('.path-nav')[0];   //文件导航的容器
    var fileList = tools.$('.file-list')[0];
    var treeMenu = tools.$('.tree-menu')[0];
    var empty = tools.$('.g-empty')[0];   //没有文件时，提醒的结构

    var headerH = header.offsetHeight;
    changeHeight();
    function changeHeight(){
        var viewHeight = document.documentElement.clientHeight;
        weiyunContent.style.height = viewHeight - headerH + 'px';
    }
    window.onresize = function(){
        changeHeight();
    };

    //渲染文件区域
    var renderId = 0;    //默认渲染这个id下的所有的子数据

    //准备的数据
    var datas = data.files;

    //渲染文件区域
    fileList.innerHTML = createFilesHtml(datas,renderId);

    //渲染菜单区域
    treeMenu.innerHTML = treeHtml(datas,-1);

    //定位到指定的树形菜单上
    positionTreeById(0);

    //渲染文件导航
    pathNav.innerHTML = createPathNavHtml(datas,0);

    //利用事件委托，点击每一个文件夹
    tools.addEvent(fileList,'click',function(evt){
        evt = window.event || evt;
        var target = evt.target;
        if(tools.parents(target,'.item')){
            target = tools.parents(target,'.item');
            //console.log(target);
            //找到div身上的id
            var titleId = target.dataset.titleId;
            renderNavFilesTree(titleId);
            positionTreeById(titleId);
        }
    });
    //利用事件委托，点击文件导航的区域，找到事件源
    tools.addEvent(pathNav,'click',function(evt){
        evt = window.event || evt;
        var target = evt.target;
        if(tools.parents(target,'a')){
            target = tools.parents(target,'a');
            //console.log(target);
            //找到div身上的id
            var fileId = target.dataset.fileId;
            renderNavFilesTree(fileId);
            positionTreeById(fileId);
        }
    });
    //利用事件委托，点击树形菜单的区域，找到事件源
    tools.addEvent(treeMenu,'click',function(evt){
        var target = evt.target;
        if(tools.parents(target,'.tree-title')){
            target = tools.parents(target,'.tree-title');

            //找到div身上的id
            var fileId = target.dataset.fileId;

            renderNavFilesTree(fileId);
            tools.addClass(target,'tree-nav');
        }
    });

    //通过指定的id渲染文件区域，文件导航区域，树形菜单
    function renderNavFilesTree(fileId){
        //找到指定id所有的父数据
        pathNav.innerHTML = createPathNavHtml(datas,fileId);

        //如果指定的id没有子数据，需要提醒
        var hasChild = dataControl.hasChilds(datas,fileId);
        if(hasChild){  //如果有子数据
            //找到当前id下的所有子数据，渲染在文件区域中
            fileList.innerHTML = createFilesHtml(datas,fileId);
            empty.style.display = '';
        }else{
            empty.style.display = 'block';
        }

        //需要给点击的div添加样式，其余的去掉样式
        var treeNav = tools.$('.tree-nav',treeMenu)[0];
        tools.removeClass(treeNav,'tree-nav');
    }


    //找到文件区域下的所有文件
    var fileItem = tools.$('.file-item',fileList);

    tools.each(fileItem,function(item,index){
        //给每一个文件绑定鼠标移入移出事件
        tools.addEvent(item,'mouseenter',function(){
            tools.addClass(this,'file-checked');
        });
        tools.addEvent(item,'mouseleave',function(){
            tools.removeClass(this,'file-checked');
        });
    });

})();
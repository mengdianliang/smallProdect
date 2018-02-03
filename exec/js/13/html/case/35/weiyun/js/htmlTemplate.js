/**
 * Created by Administrator on 2017/9/11.
 */

/*文件区域html结构*/
function filesHtml(fileData){
    var fileHtml = `<div class="file-item">
                    <div class="item" data-title-id="${fileData.id}">
                        <lable class="checkbox"></lable>
                        <div class="file-img">
                            <i></i>
                        </div>
                        <p class="file-title-box">
                            <span class="file-title">${fileData.title}</span>
                            <span class="file-edtor">
                                <input class="edtor" value="${fileData.title}" type="text"/>
                            </span>
                        </p>
                    </div>
                </div>`;
     return fileHtml;
}

//树形菜单的html结构
function treeHtml(data,treeId){
    var childs = dataControl.getChildById(data,treeId);
    var html = '<ul>';
    childs.forEach(function(item){
        //获取到当前数据的层级，通过id获取
        var level = dataControl.getLevelById(data,item.id);

        //判断当前的数据有没有子数据
        var hasChild = dataControl.hasChilds(data,item.id);
        var classNames = hasChild ? 'tree-contro' : 'tree-contro-none';
        html += `<li>
                <div class="tree-title ${classNames}" data-file-id="${item.id}" style="padding-left:${level*14}px;">
                    <span>
                        <strong class="ellipsis">${item.title}</strong>
                        <i class="ico"></i>
                    </span>
                </div>
                ${treeHtml(data,item.id)}
            </li>`;
    });

     html += "</ul>";
     return html;
}

//通过id定位到树形菜单，添加class
function positionTreeById(positionId){
    var ele = document.querySelector('.tree-title[data-file-id="' + positionId + '"]');
    tools.addClass(ele,'tree-nav');
}

//返回指定id下所有子数据的结构
function createFilesHtml(datas,renderId){
    var childs = dataControl.getChildById(datas,renderId);
    //文件区域的容器
    var html = '';
    childs.forEach(function(item){
        html += filesHtml(item);
    });
    return html;
}

//通过id得到当前这个id所有的父数据
function createPathNavHtml(datas,fileId){
    var parents = dataControl.getParents(datas,fileId).reverse();
    var pathNavHtml = '';
    var len  = parents.length;
    parents.forEach(function(item,index){
        if(index === parents.length - 1){
            return;
        }
        pathNavHtml += `<a href="javascript:;" style="z-index:${len--}" data-file-id="${item.id}">${item.title}</a>`;
    });
    //当前层的导航内容
    pathNavHtml += `<span class="current-path" style="z-index:${len--}">${parents[parents.length - 1].title}</span>`;
    return pathNavHtml;
}
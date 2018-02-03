/**
 * Created by Administrator on 2017/9/28.
 */
function commonFileStruct(fileData){
    var common = `<div class="item" data-file-id='${fileData.id}'>
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
                    <div class="file-oper fr">
                        <span class="rename fl" frag="true">重命名</span>
                        <span class="move fl" frag="true">移动到</span>
                        <span class="delect fl" frag="true">删除</span>
                    </div>
                </div>`;
     return common;
}
//准备文件区域的html结构
function filesHtml(fileData){
    var fileHtml = `<div class="file-item">
                ${commonFileStruct(fileData)}
            </div>`;
     return fileHtml;
}
//点击新建文件夹，返回一个元素对象
function createFileEle(fileData){
    var newDiv = document.createElement('div');
    newDiv.className = 'file-item';
    newDiv.innerHTML = commonFileStruct(fileData);
    return newDiv;
}

//通过id来获取下边的子文件html结构
function createFileHtml(datas,fileId){
    var childs = dataControl.getChildById(datas,fileId);
    var html = '';
    childs.forEach(function(item){
        html += filesHtml(item);
    });
    return html;
}
//创建文件夹时，创建树形菜单
function createTreeHtml(options){
    var newLi = document.createElement('li');
    newLi.innerHTML = `<div class="tree-title tree-contro-none" data-file-id='${options.id}' style='padding-left: ${options.level * 14}px'>
                    <span>
                        <strong class="ellipsis">${options.title}</strong>
                        <i class="ico"></i>
                    </span>
                </div>
                <ul></ul>`;
     return newLi;
}
//准备树形菜单的结构
function treeHtml(data,treeId){
    var childs = dataControl.getChildById(data,treeId);
    //console.log(childs);
    //通过id获取当前数据的层级
    var html = '<ul>';
    childs.forEach(function(item){
        var level = dataControl.getLevelById(data,item.id);
        // tree-nav tree-contro
        var hasChilds = dataControl.hasChilds(data,item.id);
        var classNames = hasChilds ? 'tree-contro' : 'tree-contro-none';
        html += `<li>
                <div class="tree-title ${classNames}" data-file-id='${item.id}' style='padding-left: ${level * 14}px'>
                    <span>
                        <strong class="ellipsis">${item.title}</strong>
                        <i class="ico"></i>
                    </span>
                </div>
                ${treeHtml(data,item.id)}
            </li>`;
    });
    html += '</ul>';

     return html;
}
//定位到指定的树形菜单上
function positionTree(obj,positionId){
    //console.log(obj);
    var ele = obj.querySelector('.tree-title[data-file-id="' + positionId + '"]');
    tools.addClass(ele,'tree-nav');
}

//通过指定的id创建菜单目录
function createPathNavHtml(datas,fileId){
    //找到指定id所有的父数据
    var parents = dataControl.getParents(datas,fileId).reverse();
    //console.log(parents);

    var pathNavHtml = '';
    var len = parents.length;
    parents.forEach(function(item,index){
        if(index < parents.length - 1){
            pathNavHtml += `<a href="javascript:;" style="z-index:${len--}" data-file-id="${item.id}">${item.title}</a>`;
        }
    });
    pathNavHtml += `<span class="current-path" style="z-index:${len--}">${parents[parents.length - 1].title}</span>`;
    return pathNavHtml;
}
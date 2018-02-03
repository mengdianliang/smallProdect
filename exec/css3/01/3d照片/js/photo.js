/**
 * Created by Administrator on 2017/9/5.
 */
(function(){
    //用来声明变量和初始化数据
    var data = dataList;
    var len = data.length;

    createPhotos(data);

    var n = 0;
    sortImage(n);


    //实现交互效果
    M('.item').forEach((single,i)=>{
        single.onclick = function(){
            turnImg(M(`#pic_${i}`));
        };
    });

    //需求函数化

    //生成HTML结构
    function createPhotos(data){
        var pic_html = M('.photo').innerHTML.split('{{split}}')[0].trim();
        var nav_html = M('.nav').innerHTML;

        var photos = [];
        var navs = [];

        data.forEach((item,i)=>{
            var template = pic_html.replace(/{{id}}/,i).replace(/{{src}}/,'src').replace(/{{img}}/,item.img).replace(/{{caption}}/,item.caption).replace(/{{desc}}/,item.desc);
            var tempNav = nav_html.replace(/{{id}}/,i);
            photos.push(template);
            navs.push(tempNav);
        });

        photos.push(`<div class="nav">${navs.join('')}</div>`);
        M('.photo').innerHTML = photos.join('');
        //console.log(M('.photo').innerHTML );
    }
    //对照片进行排序

    function sortImage(n){
        var photos = M('.singlePic');
        initPhotos(photos);
        var center = photos.splice(n,1)[0]; //获取居中的图片

        addClass(center,'center');
        center.onclick = function(){
            turnImg(this);
        };

        addClass(center,'center');
        addClass(M(`#item_${n}`),'active');

        photos.sort(() =>{
            return 0.5 - Math.random();
        });

        var left = photos.splice(0,Math.ceil((len - 1)/2));
        var right = photos;

        var range = scope();
        left.forEach((item,i)=>{
            item.style.left = rn(range.L.x) + 'px';
            item.style.top = rn(range.L.y) + 'px';
            item.style.transform = `translate(0px,0px) scale(1) rotate(${rn([-2160,2160])}deg)`;
        });
        right.forEach((item,i)=>{
            item.style.left = rn(range.R.x) + 'px';
            item.style.top = rn(range.R.y) + 'px';
            item.style.transform = `translate(0px,0px) scale(1) rotate(${rn([-2160,2160])}deg)`;
        });
    }
    //返回两个数值之间的随机整数
    function rn(arr){
        var max = Math.max.apply(null,arr);
        var min = Math.min.apply(null,arr);

        return Math.round(Math.random() * (max - min) + min);
    }

    //设定左右两侧照片的随机范围
    function scope(){
        var outer = M('.photo_wall');
        var oneImg = M('#pic_' + rn([0,len - 1]));
        var outWid = outer.clientWidth;
        var outHgt = outer.clientHeight;
        var imgWid = oneImg.offsetWidth;
        var imgHgt = oneImg.offsetHeight;
        console.log(outWid,outHgt,imgWid,imgHgt);
        var data = {
            L: {
                x: [-imgWid/3,outWid/2 - imgWid/2 - imgWid],
                y: [-imgHgt/3,outHgt -imgHgt*2/3]
            },
            R: {
                x: [outWid/2 + imgWid/2,outWid - imgWid*2/3],
                y: [-imgHgt/3,outHgt -imgHgt*2/3]
            }
        };
        return data;

    }

    //控制照片和导航栏按钮的反转

    function turnImg(ele){
        var cur = ele.id.split('_')[1];
        var nav = M(`#item_${cur}`);
        if(!hasClass(ele,'center')){
            return sortImage(cur);
        }
        if(hasClass(ele,'front')){
            rmClass(ele,'front');
            addClass(ele,'back');
            addClass(nav,'back');
        }else{
            rmClass(ele,'back');
            addClass(ele,'front');
            rmClass(nav,'back');
        }
    }

    //初始化所有样式
    function initPhotos(eles){
        eles.forEach((item,i)=>{
            if(hasClass(item,'center')){
                var nav = M(`#item_${i}`);
                rmClass(item,'center');
                rmClass(item,'back');-
                addClass(item,'back');
                rmClass(nav,'active');
                rmClass(nav,'back');
                item.onclick = null;
            }
            item.style.left = '';
            item.style.top = '';
            item.style.zIndex = '';
            item.style.transform = `translate(-50%,-50%) scale(1.1) rotate(0deg)`;
        });
    }
})();
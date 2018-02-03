/**
 * Created by Administrator on 2017/9/28.
 */
var tools = (function(){
    var toolsObj = {
        $:function(selector,context){
            /*
            * #id
            * .class
            * 标签
            * '#id li'
            * '.class a'
            * */
            context = context || document;
            if(selector.indexOf(' ') != -1){
                return context.querySelectorAll(selector);
            }else if(selector.charAt(0) === '#'){
                return context.getElementById(selector.slice(1));
            }else if(selector.charAt(0) === '.'){
                return context.getElementsByClassName(selector.slice(1));
            }else{
                return context.getElementsByTagName(selector);
            }
         },
        addEvent: function(ele,eventName,eventFn){
            ele.addEventListener(eventName,eventFn,false);
        },
        removeEvent: function(ele,eventName,eventFn){
            ele.removeEventListener(eventName,eventFn,false);
        },
        addClass: function(element,classNames){
            if(typeof classNames === 'string'){
                if(!tools.hasClass(element,classNames)){
                    element.className += ' ' + classNames;
                }
            }
        },
        removeClass: function(element,classNames){
            var classNameArr = element.className.split(' ');
            for(var i = 0;i < classNameArr.length;i++){
                if(classNameArr[i] === classNames){
                    classNameArr.splice(i,1);
                    i--;
                }
            }
            element.className = classNameArr.join(' ');
        },
        hasClass: function(element,classNames){
            var classNameArr = element.className.split(' ');
            for(var i = 0;i < classNameArr.length;i++){
                if(classNameArr[i] === classNames){
                    return true;
                }
            }
            return false;
        },
        toggleClass: function(element,classNames){
            if(tools.hasClass(element,classNames)){
                tools.removeClass(element,classNames);
                return false;
            }else{
                tools.addClass(element,classNames);
                return true;
            }
        },
        parents: function(obj,selector){
            /*
            * selector
            * id
            * class
            * 标签
            *
            * */
            if(selector.charAt(0) === '#'){
                while(obj.id !== selector.slice(1)){
                    obj = obj.parentNode;
                }
            }else if(selector.charAt(0) === '.'){
                while(obj && obj.nodeType !== 9 && !tools.hasClass(obj,selector.slice(1))){
                    obj = obj.parentNode;
                }
            }else{
                while(obj && obj.nodeType !== 9 && obj.nodeName.toLowerCase() !== selector){
                    obj = obj.parentNode;
                }
            }
            return obj && obj.nodeType === 9 ? null : obj;
         },
        each:function(obj,callBack){
            for( var i = 0; i < obj.length; i++ ){
                callBack(obj[i],i);
            }
        },
        getEleRect: function(obj){
            return obj.getBoundingClientRect();
        },
        collisionRect: function(obj1,obj2){
            var objRect1 = tools.getEleRect(obj1);
            var objRect2= tools.getEleRect(obj2);

            var rectWid1 = objRect1.width;
            var rectHgt1 = objRect1.height;
            var rectTp1 = objRect1.top;
            var rectLft1 = objRect1.left;

            var rectWid2 = objRect2.width;
            var rectHgt2 = objRect2.height;
            var rectTp2 = objRect2.top;
            var rectLft2 = objRect2.left;

            if(rectLft1 > rectLft2 + rectWid2 || rectLft1 + rectWid1 < rectLft2 || rectTp1 > rectTp2 + rectHgt2 || rectTp1 + rectHgt1 < rectTp2){
                return false;
            }else{
                return true;
            }
        },
        /*collisionRect:function(obj1,obj2){
            var obj1Rect = tools.getEleRect(obj1);
            var obj2Rect = tools.getEleRect(obj2);

            var obj1W = obj1Rect.width;
            var obj1H = obj1Rect.height;
            var obj1L = obj1Rect.left;
            var obj1T = obj1Rect.top;

            var obj2W = obj2Rect.width;
            var obj2H = obj2Rect.height;
            var obj2L = obj2Rect.left;
            var obj2T = obj2Rect.top;
            //碰上返回true 否则返回false
            if( obj1W+obj1L>obj2L && obj1T+obj1H > obj2T && obj1L < obj2L+obj2W && obj1T<obj2T+obj2H ){
                return true
            }else{
                return false;
            }
        },*/
        store: function(namespace,data){
            if(data){
                return localStorage.setItem(namespace,JSON.stringify(data));
            }
            var store = localStorage.getItem(namespace);
            return (store && JSON.parse(store) || []);
        },
        extend:function (obj){  //深拷贝
            var newArr = obj.constructor === Array ? [] : {};
            for( var attr in obj ){
                if( typeof obj[attr] === "object"){
                    newArr[attr] = tools.extend(obj[attr]);
                }else{
                    newArr[attr] = obj[attr];
                }
            }
            return newArr;
        },
        hide:function (element){
            return element.style.display = "none";
        },
        show:function (element){
            return element.style.display = "block";
        },
        getOffset:function (obj){
            return {
                width:obj.offsetWidth,
                height:obj.offsetHeight
            }
        }
    };
    return toolsObj;
}());
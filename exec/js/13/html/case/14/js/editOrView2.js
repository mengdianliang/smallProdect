window.onload = function(){
    /*获取元素*/
    var oper1 = $('.oper1 li');
    var oper2 = $('.oper2 li');
    var modal = $('.modal')[0];
    var btn = $('.btn')[0];

    init();

    //代码初始化
    function init(){
        mouseEvt(oper1,true);
        mouseEvt(oper2,false);
    }
    //代码去重
    function commons(obj1,obj2){
        obj1.style.display = 'none';
        obj2.style.display = 'block';
    }
    //查找数据点击事件
    function mouseEvt(obj,flag){
        for(var i = 0;i < obj.length;i++){
            //确定输入信息按钮点击事件
            $('.confirm',obj[i])[0].index = i;
            $('.confirm',obj[i])[0].onclick = function(){
                var val = trim($('input[type="text"]',obj[this.index])[0].value);
                if(flag && val == ''){
                    modal.style.display = 'block';
                }else{
                    $('.view_txt',obj[this.index])[0].innerHTML = val;
                    commons($('.edit',obj[this.index])[0],$('.view',obj[this.index])[0]);
                }

            };
            if(flag){
                $('.cancel',obj[i])[0].index = i;
                $('.cancel',obj[i])[0].onclick = function(){
                    /* if($('.view_txt',oper_list[this.index])[0].innerHTML == ''){
                     modal.style.display = 'block';
                     }else{*/
                    commons($('.edit',obj[this.index])[0],$('.view',obj[this.index])[0]);
                    /*}*/
                };
                //弹出层确定按钮点击事件
                btn.onclick = function(){
                    modal.style.display = "none";
                };
            }
            //编辑按钮点击事件
            $('.edit_icon',obj[i])[0].index = i;
            $('.edit_icon',obj[i])[0].onclick = function(){
                $('input[type="text"]',obj[this.index])[0].value = $('.view_txt',obj[this.index])[0].innerHTML;
                commons($('.view',obj[this.index])[0],$('.edit',obj[this.index])[0]);
            };
        }
    }
    function trim(str){    //这里多个空格会在页面里的渲染成一个空格
        return str.replace(/^\s+|\s+$/,'');
    }
    //元素获取方法的重写
    function $(element,obj){
        if(obj == null){
            return document.querySelectorAll(element);
        }else{
            return obj.querySelectorAll(element);
        }
    }
};
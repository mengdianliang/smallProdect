window.onload = function(){
    /*获取元素*/
    var oper_list = $('.oper_list li');
    var modal = $('.modal')[0];
    var btn = $('.btn')[0];

    init();

    //代码初始化
    function init(){
        mouseEvt();
    }
    //代码去重
    function commons(obj1,obj2){
        obj1.style.display = 'none';
        obj2.style.display = 'block';
    }
    //查找数据点击事件
    function mouseEvt(){
        for(var i = 0;i < oper_list.length;i++){
            $('.confirm',oper_list[i])[0].index = i;
            $('.confirm',oper_list[i])[0].onclick = function(){
                var val = trim($('input[type="text"]',oper_list[this.index])[0].value);
                if(val == ''){
                    modal.style.display = 'block';
                }else{
                    $('.view_txt',oper_list[this.index])[0].innerHTML = val;
                    commons($('.edit',oper_list[this.index])[0],$('.view',oper_list[this.index])[0]);
                }

            };
            $('.cancel',oper_list[i])[0].index = i;
            $('.cancel',oper_list[i])[0].onclick = function(){
               /* if($('.view_txt',oper_list[this.index])[0].innerHTML == ''){
                    modal.style.display = 'block';
                }else{*/
                commons($('.edit',oper_list[this.index])[0],$('.view',oper_list[this.index])[0]);
                /*}*/
            };
            $('.edit_icon',oper_list[i])[0].index = i;
            $('.edit_icon',oper_list[i])[0].onclick = function(){
                $('input[type="text"]',oper_list[this.index])[0].value = $('.view_txt',oper_list[this.index])[0].innerHTML;
                commons($('.view',oper_list[this.index])[0],$('.edit',oper_list[this.index])[0]);
            };
        }
        btn.onclick = function(){
            modal.style.display = "none";
        };
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
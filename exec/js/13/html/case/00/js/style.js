/**
 * Created by Administrator on 2017/7/16.
 */
/*
*  步骤：
*   1.获取节点；box,to_set,modal,btn_reset,btn_confirm,myForm,ckd
*   2.添加设置样式按钮事件；
*   3.添加样式重置按钮事件并对所有input单选按钮取消选中；
*   4.添加确认按钮事件；
*   5.分别获取设置颜色，宽，高的节点；colors,wid,hgt
*   6.添加并遍历单选按钮的点击事件；
*   7.优化代码(去重)；
* */
window.onload = function(){
    //获取元素
    var box =$("#box")[0];
    var sets = $("#to_set")[0];
    var modal = $("#modal")[0];
    var resets = $("#btn_reset")[0];
    var confirms = $("#btn_confirm")[0];
    var myForm = $("#myForm")[0];
    var inputs = $(".ckd",myForm);
    var color = $(".colors");
    var wid = $(".wid");
    var hgt = $(".hgt");
    //数组存储数据
    var colorArr = ['#ff0000','#ffff00','#0000ff'];
    var widArr = hgtArr = ['200px','300px','400px'];

    //函数调用
    sets.onclick = showInfo;
    confirms.onclick = hideInfo;
    resets.onclick = resetInfo;
    setAttributes(color,'backgroundColor',colorArr);
    setAttributes(wid,'width',widArr);
    setAttributes(hgt,'height',hgtArr);

    //元素获取方法的重写
    function $(element,obj){
        if(obj == null){
            return document.querySelectorAll(element);
        }else{
            return obj.querySelectorAll(element);
        }
    }
    //元素显示
    function showInfo(){
        modal.style.display = 'block';
    }
    //元素隐藏
    function hideInfo(){
        modal.style.display = 'none';
    }
    //元素重置
    function resetInfo() {
        box.style.width = "";
        box.style.height = "";
        box.style.background = "";
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].checked = false;
        }
    }
    //设置元素样式
    function setAttributes(obj,styl,objArr){
        for(var i = 0;i < obj.length;i++){
            obj[i].index = i;
            obj[i].onclick = function(){
                box.style[styl] = objArr[this.index];
            }
        }
    }
};
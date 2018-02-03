/**
 * Created by Administrator on 2017/8/26.
 */
window.onload = function(){
    var timeArea = $('.timeArea')[0];   //时间点击区域
    var timePocket = $('.time_pocket')[0];  //时间插件
    var timePrev = $('.time_prev')[0];  //时间左按钮
    var timeNext = $('.time_next')[0];  //时间右按钮
    var timeTit = $('.time_tit')[0];    //时间主题
    var weekHeader = $('.week_header')[0]; //显示星期的头部
    var timeFooter = $('.time_footer')[0]; //当前时间元素
    var dTime = $('.dTime')[0]; //显示时间的地方
    var pic = $('.pic')[0]; //图片


    var val = 0;

    var yrNum = 0;
    var monNum = 0;
    var dateNum = 0;
    var hourNum = 0;
    var minuteNum = 0;

    var currYear = 0;
    var currMon = 0;
    var currDate = 0;
    var currHour = 0;
    var currMinute = 0;

    var attrIndex = 0;

    var progress = 2;  //显示序号

    init();

    //初始化代码
    function init(){
        initVal();
        mouseEvt();
    }
    //初始化内容
    function initVal(){
        cal();
        btnEvt()
    }

    function btnEvt(){
        timePrev.onclick = function(){
            switch(progress){
                case 0:
                    yrNum -= 10;
                    reportYear();
                    break;
                case 1:
                    yrNum--;
                    reportMon();
                    break;
                case 2:
                    monNum--;
                    cal();
                    break;
                case 3:
                    dateNum--;
                    reportHour();
                    break;
                case 4:
                    hourNum--;
                    reportHour();
                    break;
            }
        };
        timeNext.onclick = function(){
            switch(progress){
                case 0:
                    yrNum += 10;
                    reportYear();
                    break;
                case 1:
                    yrNum++;
                    reportMon();
                    break;
                case 2:
                    monNum++;
                    cal();
                    break;
                case 3:
                    dateNum++;
                    reportHour();
                    break;
                case 4:
                    hourNum++;
                    reportHour();
                    break;
            }
        };
    }

    //获取时间管理者
    function manager(){
        switch(progress){
            case 0:
                reportYear();
                break;
            case 1:
                reportMon();
                break;
            case 2:
                cal();
                break;
            case 3:
                reportHour();
                break;
            case 4:
                reportMinute();
                break;
        }
    }
    //设置时间管理者
    function manager1(){
        switch(progress){
            case 0:
                //reportYear1();
                break;
            case 1:
                reportMon1();
                break;
            case 2:
                cal1();
                break;
            case 3:
                reportHour1();
                break;
            case 4:
                reportMinute1();
                break;
        }
    }

    function showCon(){
        //内容列表点击切换
        var dayCons = $('.day_con li');
        for(var i= 0;i < dayCons.length;i++){
            dayCons[i].onclick = function(){
                if(Number(this.getAttribute('index'))){
                    attrIndex = Number(this.getAttribute('index'));
                }
                val = parseInt($('a',this)[0].innerHTML);
                progress++;
                if(progress > 4){
                    val = $('a',this)[0].innerHTML;
                    getDate(dTime,val);
                    reset();
                    progress = 2;
                    return;
                }
                console.log(progress);
                manager1();
            };
        }
    }

    //记录年份
    function reportYear(){
        weekHeader.style.display = "";
        var dayCon = $('.day_con')[0];  //日历元素
        var num = Number(currYear.toString().charAt(currYear.toString().length-1));
        timeTit.innerHTML = (currYear + yrNum - num) + "-" +(currYear + yrNum - num + 9);
        dayCon.innerHTML = '';
        for(var i = -1;i < 11;i++){
            dayCon.innerHTML += '<li class="yr fl"><a href="javascript:void(0);">'+ (currYear + yrNum + i - num) +  '</a></li>';
        }
        showCon();
    }

    //记录月份
    function reportMon(){
        weekHeader.style.display = "";
        var dayCon = $('.day_con')[0];  //日历元素
        var dt = new Date();
        dt.setFullYear(dt.getFullYear() + yrNum);
        currYear = dt.getFullYear();
        timeTit.innerHTML = currYear + "年";
        dayCon.innerHTML = '';
        for(var i = 1;i < 13;i++){
            dayCon.innerHTML += '<li class="mon fl"><a href="javascript:void(0);">'+ i +  '月</a></li>';
        }
        showCon();
    }
    //记录
    //
    // 设置月份
    function reportMon1(){
        var dayCon = $('.day_con')[0];  //日历元素
        var dt = new Date();
        currYear = val;
        yrNum = val - dt.getFullYear();
        timeTit.innerHTML = currYear + "年";
        dayCon.innerHTML = '';
        for(var i = 1;i < 13;i++){
            dayCon.innerHTML += '<li class="mon fl"><a href="javascript:void(0);">'+ i +  '月</a></li>';
        }
        showCon();
    }

    //记录日历
    function cal(){
        var dayCon = $('.day_con')[0];  //日历元素
        dayCon.innerHTML = '';   //清空之前的内容
        weekHeader.style.display = "block";
        var dt = new Date();
        //显示当前年月
        dt.setMonth(dt.getMonth() + monNum);
        currYear = dt.getFullYear() + yrNum;
        currMon = dt.getMonth() + 1 + attrIndex;
        timeTit.innerHTML = currYear + "年" + currMon + "月";

        //设置当前月的前一个
        dt.setDate(1);
        var preDay = dt.getDay();  //获取当月第一天星期几

        dt.setDate(0);
        var last = dt.getDate();
        for(var i = preDay;i > 0;i--){
            dayCon.innerHTML = '<li class="fl" index="-1"><a href="javascript:void(0);" class="gray">'+ last-- +  '</a></li>' + dayCon.innerHTML;
        }

        //设置当前月
        dt = new Date();
        dt.setMonth(dt.getMonth() + monNum + 1);
        dt.setDate(0);
        var nowDay = dt.getDate();
        for(var i = 0;i < nowDay;i++){
            dayCon.innerHTML += '<li class="fl" index="0"><a href="javascript:void(0);">'+ (i+1) +  '</a></li>';
        }

        var len = $('li',dayCon).length;
        for(var i = 0;i < 42 - len;i++){
            dayCon.innerHTML += '<li class="fl" index="1"><a href="javascript:void(0);" class="gray">'+ (i+1) +  '</a></li>';
        }
        showCon();
    }

    //设置日历
    function cal1(){
        var dayCon = $('.day_con')[0];  //日历元素
        weekHeader.style.display = "block";
        dayCon.innerHTML = '';   //清空之前的内容
        var dt = new Date(new Date().getFullYear(),0,1,8,0,0);  //清空日历 日getDate()超出问题

        //显示当前年月
        monNum = val - dt.getMonth() - 1;

        dt.setMonth(val - 1);
        currMon = dt.getMonth() + 1;

        timeTit.innerHTML += currMon + "月";

        //设置当前月的前一个
        dt.setDate(1);
        var preDay = dt.getDay();  //获取当月第一天星期几

        dt.setDate(0);
        var last = dt.getDate();
        for(var i = preDay;i > 0;i--){
            dayCon.innerHTML = '<li class="fl" index="-1"><a href="javascript:void(0);" class="gray">'+ last-- +  '</a></li>' + dayCon.innerHTML;
        }

        //设置当前月
        dt = new Date();
        dt.setMonth(val);
        dt.setDate(0);
        var nowDay = dt.getDate();
        for(var i = 0;i < nowDay;i++){
            dayCon.innerHTML += '<li class="fl" index="0"><a href="javascript:void(0);">'+ (i+1) +  '</a></li>';
        }

        var len = $('li',dayCon).length;
        for(var i = 0;i < 42 - len;i++){
            dayCon.innerHTML += '<li class="fl" index="1"><a href="javascript:void(0);" class="gray">'+ (i+1) +  '</a></li>';
        }
        showCon();
    }

    //获取小时
    function reportHour(){
        var dayCon = $('.day_con')[0];  //日历元素
        dayCon.innerHTML = '';   //清空之前的内容
        var dt = new Date();
        //显示当前年月
        dt.setMonth(dt.getMonth() + monNum);
        currYear = dt.getFullYear() + yrNum;
        currMon = dt.getMonth() + 1 + attrIndex;
        currDate = dt.getDate() + dateNum;
        timeTit.innerHTML = currYear + "年" + currMon + "月" + currDate +"日";

        for(var i = 0;i < 24;i++){
            dayCon.innerHTML += '<li class="date fl"><a href="javascript:void(0);">'+ i +  '</a></li>';
        }
        showCon();
    }
    //设置小时
    function reportHour1(){
        var dayCon = $('.day_con')[0];  //日历元素
        weekHeader.style.display = "";
        dayCon.innerHTML = '';   //清空之前的内容
        var dt = new Date();
        //显示当前年月
        currYear = dt.getFullYear() + yrNum;
        currMon = dt.getMonth() + 1 + monNum + attrIndex;
        currDate = val;
        dateNum = val - dt.getDate();
        timeTit.innerHTML = currYear +"年" + currMon +"月" + currDate +"日";

        for(var i = 0;i < 24;i++){
            dayCon.innerHTML += '<li class="date fl"><a href="javascript:void(0);">'+ i +  '</a></li>';
        }
        showCon();
    }
    //获取分钟
    function reportMinute(){
        var dayCon = $('.day_con')[0];  //日历元素
        dayCon.innerHTML = '';   //清空之前的内容
        var dt = new Date();
        //显示当前年月
        currHour = dt.getHours() + hourNum;
        timeTit.innerHTML += currHour +"时";

        for(var i = 0;i < 60;i+=5){
            dayCon.innerHTML += '<li class="date fl"><a href="javascript:void(0);">' + currHour + ':' + i + '</a></li>';
        }
        showCon();
    }
    //设置分钟
    function reportMinute1(){
        var dayCon = $('.day_con')[0];  //日历元素
        dayCon.innerHTML = '';   //清空之前的内容

        var dt = new Date();
        currHour = val;
        hourNum = val - dt.getHours();
        timeTit.innerHTML += currHour + '时';

        for(var i = 0;i < 24;i++){
            dayCon.innerHTML += '<li class="date fl"><a href="javascript:void(0);">' + currHour + ':' + i +'</a></li>';
        }
        showCon();
    }

    //获取设置时间
    function getDate(obj,minute){
        var dt = new Date();
        var weekArr = ['星期日','星期-','星期二','星期三','星期四','星期五','星期六'];
        var y = dt.getFullYear() + yrNum;
        var m = preZero(dt.getMonth() + 1 + monNum,2);
        var d = preZero(dt.getDate() + dateNum,2);
        var h = preZero(dt.getHours() + hourNum,2);
        var i = preZero(minute.substring(minute.indexOf(':')+1),2);
        obj.innerHTML = y + ' ' + m + ' ' + d + ' ' + h + ':' + i + ':00';
    }

    //获取当前时间
    function nowDate(obj){
        var dt = new Date();
        var weekArr = ['星期日','星期-','星期二','星期三','星期四','星期五','星期六'];
        var y = dt.getFullYear();
        var m = dt.getMonth() + 1;
        var d = dt.getDate();
        var w = weekArr[dt.getDay()];
        var h = preZero(dt.getHours(),2);
        var i = preZero(dt.getMinutes(),2);
        var s = preZero(dt.getSeconds(),2);
        obj.innerHTML = y + ' ' + m + ' ' + d + ' ' + h + ':' + i + ':' + s;
    }
    //补零位
    function preZero(num,len){
        var str = "" + num;
        while(len - str.length){
            str = 0 + str;
        }
        return str;
    }
    //鼠标点击事件
    function mouseEvt(){
        //时间输入框的点击按钮
        pic.onclick = dTime.onclick = function(){
            weekHeader.style.display = 'block';
            monNum = 0;
            cal();
            timePocket.style.display = 'block';
        };
        //时间主题切换
        timeTit.onclick = function(){
            progress--;
            if(progress < 0){
                progress = 0;
                return;
            }
            console.log(progress);
            manager();
        };

        //当前时间按钮点击
        timeFooter.onclick = function(){
            nowDate(dTime);
            reset()
        };

    }
    //重置
    function reset(){
        timePocket.style.display = 'none';
        val = 0;

        yrNum = 0;
        monNum = 0;
        dateNum = 0;
        hourNum = 0;
        minuteNum = 0;


        currYear = 0;
        currMon = 0;
        currDate = 0;
        currHour = 0;
        currMinute = 0;

        attrIndex = 0;
        progress = 2;
    }
    /*
     * 元素获取方法的重写
     * element是obj下的子元素
     * */
    function $(element,obj){
        if(obj == null){
            return document.querySelectorAll(element);
        }else{
            return obj.querySelectorAll(element);
        }
    }
};
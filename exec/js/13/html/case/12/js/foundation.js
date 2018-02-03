window.onload = function(){
    /*获取元素*/
    var allNum = $('.all_number')[0];
    var toNumber = $('.turnto_number')[0];
    var maxNumber = $('.max_value')[0];
    var allNaNIndex = $('.NaN_index')[0];
    var startBtn = $('.start_btn')[0];
    //声明数组
    var arr = ['100px', 'abd'-6, [], -98765, 34, -2, 0, '300', ,
        function(){ alert(1);}, null, document, [], true,
            '200px'-30, '23.45元', 5, Number('abc'), function(){alert(3);},
            'xyz'-90,undefined];
    var numbers = allNum.innerHTML;
    var ableNumbers = toNumber.innerHTML;
    var unableNum = allNaNIndex.innerHTML;
    var max = maxNumber.innerHTML;
    var maxNum =0;
    var flag = true;

    //查找数据点击事件
    startBtn.onclick = function () {
        if(flag){
            for(var i = 0; i < arr.length; i ++){
                findAllNumber(arr[i]);
                canTurnToNumber(arr[i]);
                findMax(arr[i]);
                findNaNIndex(arr[i],i);
            }
            allNum.innerHTML = numbers.substring(0,numbers.length - 1);
            toNumber.innerHTML = ableNumbers.substring(0,ableNumbers.length - 1);
            allNaNIndex.innerHTML = unableNum.substring(0,unableNum.length - 1);
            maxNumber.innerHTML = max +maxNum;
        }
        flag = false;

    };
    function findAllNumber(num){
        if(typeof num === 'number'&& !isNaN(num)){
                numbers += num + ',';
        }

    }
    function canTurnToNumber(num){
        if(typeof parseFloat(num) === 'number' && !isNaN(parseFloat(num))){
                ableNumbers += num + ',';
        }

    }
    function findMax(num) {
        if(typeof parseFloat(num) === 'number'&& !isNaN(parseFloat(num)) && maxNum < num){
            maxNum =num;
        }
    }
    function findNaNIndex(num,i) {
        if(typeof num === 'number'&& isNaN(num)){
            unableNum += i + ",";
        }
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
/**
 * Created by Administrator on 2017/8/1.
 */
//匿名函数自执行，相当于在函数内部执行了，可以避免函数重名的问题
(function(){
    window.onload = function(){
        var c = new Calc($('keyboard'));

    };

    function Calc(container) {
        this.numBtns = getByClass('num', container);
        this.exp  = []; //保存用户输入的表达式
        this.replaceFlag = true; //新的输入是否替换文本框的值
        var map = {
            clearBtn: "clear",
            bsBtn: 'backspace',
            sqrtBtn: "sqrt",
            divideBtn: "divide",
            muitiplyBtn: 'multiply',
            MCBtn: "MC",
            minusBtn: "minus",
            MRBtn: 'MR',
            addBtn: "add",
            MSBtn: "MS",
            evalBtn: 'eval',
            MAddBtn: "MAdd",
            output: 'output'
        };
        for (var i in map) {
            this[i] = getByClass(map[i], container)[0];
        }
        var buttons = container.getElementsByTagName('span');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.backgroundPosition = -buttons[i].offsetLeft + "px -" + buttons[i].offsetTop + "px";
        }
        for (var i = 0; i < buttons.length; i++){
            buttons[i].onmouseover = function () {
                addClass(this,"hover");
            };
            buttons[i].onmousedown = function () {
                addClass(this,"down");
            };
            buttons[i].onmouseout = buttons[i].onmouseup = function () {
                delClass(this,'down');
                delClass(this,'hover');
            };
        }
        var _this = this;
        for(var i = 0;i < this.numBtns.length;i++){
            this.numBtns[i].onclick = function(){
                _this.input(this.innerHTML);
            };
        }
        this.divideBtn.onclick = function(){
            _this.addExp('/');
        };
        this.muitiplyBtn.onclick = function(){
            _this.addExp('*');
        };
        this.minusBtn.onclick = function(){
            _this.addExp('-');
        };
        this.addBtn.onclick = function(){
            _this.addExp('+');
        };
        this.clearBtn.onclick = function(){
            _this.clear();
        };
        this.evalBtn.onclick = function(){
            _this.evalValue();
        };
    }
    Calc.prototype.pushExp = function(n){ //添加数据
        if(this.exp.length == 3){
            var result = this.evalValue();
            this.exp = [];
            this.exp[0] = result;
            this.exp[1] = n;
        }else{
            this.exp.push(n);
        }
    };
    Calc.prototype.clear = function(){ //清空内容
        this.output.value = "0";
        this.exp = [];
        this.mem;
        this.replaceFlag = true;
    };
    Calc.prototype.input = function(num){  //输入数字
        if(this.replaceFlag){
            this.output.value = num;
        }else{
            this.output.value += num;
        }
        if(!this.exp.length || this.exp.length == 1){
            this.exp[0] = this.output.value;
        }else{
            this.exp[2] = this.output.value;
        }
        this.replaceFlag = false;
    };
    Calc.prototype.sqrt = function(){

    };
    Calc.prototype.addExp = function(op){   //添加一个运算符 + - * /
        if(!this.exp.length){
            return;
        }else if(this.exp.length == 1 || this.exp.length == 2){
            this.exp[1] = op;
        }else if(this.exp.length == 3){
            this.evalValue();
            this.exp[1] = op;
        }
        this.replaceFlag = true;
    };
    Calc.prototype.evalValue = function(){   // =

        var result = eval(this.exp.join(""));
        this.exp = [result];
        this.output.value = result;
        return result;
    };
    Calc.prototype.isValid = function(){   // 验证数据

    };
    Calc.prototype.formatOutput = function(){ //(过滤输入)将输出进行格式化

    };

})();
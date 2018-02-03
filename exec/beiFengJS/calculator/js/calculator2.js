/**
 * Created by Administrator on 2017/8/1.
 */
//匿名函数自执行，相当于在函数内部执行了，可以避免函数重名的问题
(function(){
    window.onload = function(){
        //var c = new Calc($('keyboard'));
        var container = $('keyboard');
        var numberBtns = getByClass('num',container);
        var exp = [];
        var replaceFlag = true; //新的输入是否替换文本框的值
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
        for(var i = 0;i < numberBtns.length;i++){
            numberBtns[i].onclick = function(){
                input(this.innerHTML);
            };
        }

        this.divideBtn.onclick = function(){
            addExp('/');
        };
        this.muitiplyBtn.onclick = function(){
            addExp('*');
        };
        this.minusBtn.onclick = function(){
            addExp('-');
        };
        this.addBtn.onclick = function(){
            addExp('+');
        };
        this.sqrtBtn.onclick = function(){
            addExp('~');
        };
        this.clearBtn.onclick = function(){
            clear();
        };
        this.evalBtn.onclick = function(){
            evalValue();
        };
        function input(num) {
            if (replaceFlag) {
                this.output.value = num;
            } else {
                this.output.value += num;
            }
            if (!exp.length || exp.length == 1){
                exp[0] = this.output.value;
            }else {
                exp[2] = this.output.value;
            }
            replaceFlag = false;
        }

        function addExp(op){   //添加一个运算符 + - * /
            if(!exp.length){
                if(op == '-'){
                    this.output.value = op;
                    replaceFlag = false;
                }
                return;
            }else if(exp.length == 1){
                exp[1] = op;
            }else if(exp.length == 2){
                if(op == '-'){
                    this.output.value = op;
                    replaceFlag = false;
                    return;
                }else{
                    exp[1] = op;
                }
            }else if(exp.length == 3){
                evalValue();
                exp[1] = op;
            }
            replaceFlag = true;
            console.log(exp);
        }
        /*清空数据*/
        function clear(){
            exp = [];
            this.output.value = '0';
            replaceFlag = true;
        }
        function evalValue(){
            if(exp.length == 3){
                var result = '';
                if(exp[1] == '+'){
                    result = add();
                }else if(exp[1] == '-'){
                    result = minus();
                }
                else if(exp[1] == '*'){
                   result = multiply();
                }else if(exp[1] == '/'){
                   result = divided()
                }else if(exp[1] == '~'){
                   result = formatSqrt();
                }else if(exp[1] == ''){}
                exp = [result];
                this.output.value = result;
                return result;
            }
        }
        function add(){
           return Number(exp[0]) + Number(exp[2]);
        }
        function minus(){
            return Number(exp[0]) - Number(exp[2]);
        }
        function multiply(){
            return Number(exp[0]) * Number(exp[2]);
        }
        function divided(){
            return Number(exp[0]) / Number(exp[2]);
        }
        function sqrt(){
            return Math.exp(1/Number(exp[2])*Math.log(Number(exp[0])));
        }
        function formatSqrt(){
            if(Number(exp[0]) > 0 || Number(exp[2]) != 0 && Number(exp[0]) == 0){
                return sqrt();
            }else{
                clear();
            }
        }
    };
})();
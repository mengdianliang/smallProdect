/**
 * Created by Administrator on 2017/7/28.
 */
window.onload = function() {
    var fm = document.getElementById('regForm');
    var fieldset = fm.getElementsByTagName('fieldset')[0];
    fieldset.style.display = 'none';
    fm.agreeClause.onclick = function(){
        var dl = document.getElementById('clause');
        fieldset.style.display = 'block';
        initForm();
    };
    function initForm(){
        var inputs = fm.elements;
        for(var i = 0;i < inputs.length;i++){
            if(inputs[i].type == 'text'|| inputs[i].type == 'password'){
                inputs[i].noticeNode = inputs[i].parentNode.getElementsByTagName('em')[0];
                inputs[i].warningNode = inputs[i].parentNode.getElementsByTagName('strong')[0];
                if(!inputs[i].noticeNode) continue;
                /*inputs[i].onfocus = function(){
                    this.noticeNode.style.display = "inline";
                };
                inputs[i].onblur = function(){
                    this.noticeNode.style.display = "none";
                };*/
                new ValidateInput(inputs[i],function(){});
            }
        }
        var otherHobbyLabel = document.getElementById('otherHobbyLabel');
        var otherHobbyCheckbox = document.getElementById('other');
        if(otherHobbyCheckbox.checked){
            otherHobbyLabel.style.display = "block";
        }
        otherHobbyCheckbox.onclick = function (){
            if(this.checked){
                otherHobbyLabel.style.display = "block";
            }else{
                otherHobbyLabel.style.display = "none";
            }
        };

        var by = fm.birthYear,
            bm = fm.birthMonth,
            bd = fm.birthDay;
        by.onchange = function(){
            var y = +this.value;
            var m = +bm.value;
            if(m!=2){
                return;
            }
            if(isOverYear(y) && bd.options.length != 30){
                bd.options.length = 29;
                bd.add(new Option(29,29),null);
            }else if(bd.options.length != 29){
                bd.options.length = 29;
            }
        };
        initSelect(by,1990,2010);
        initSelect(bm,1,12);
        var m30 = {4:1,6:1,9:1,11:1};
        bm.onchange = function(){
            var m = this.value;
            if(m==2){
                var y = +by.value,d;
                if(!y || isOverYear(y)){
                    d = 29;
                }else{
                    d = 28;
                }
            }else if(m in m30){
                d = 30;
            }else{
                d = 31;
            }
            initSelect(bd,1,d);
        };
        function initSelect(select,start,end){
            select.options.length = 1;
            for(var l= start;l <= end;l++){
                //select.add(new Option(l,l),null);
                appendOpt(select,new Option(l,l));
            }
        }
        function appendOpt(select,opt){
            try{
                select.add(opt,null);
            }catch(e){
                select.add(opt);
            }
        }

        var textarea = fm.motto;
        var curLenSpan = document.getElementById('curLen');
        var maxLenSpan = document.getElementById('maxLen');
        var leftLenSpan = document.getElementById('leftLen');
        var maxLen = +maxLenSpan.innerHTML;
        var textareaLimit = document.getElementById("textareaLimit");
        var curLen = textarea.value.length;
        var leftLen  = maxLen - curLen;
        curLenSpan.innerHTML = curLen;
        leftLenSpan.innerHTML = leftLen;
        textareaLimit.style.display = "inline";

        textarea.onkeyup = textarea.onkeydown = function(){
            clearInterval(timer);
            curLen = this.value.length;
            if(curLen >= maxLen){
                this.value = this.value.substring(0,maxLen);
                curLen = maxLen;
            }
            leftLen = maxLen - curLen;
            curLenSpan.innerHTML = curLen;
            leftLenSpan.innerHTML = leftLen;
        };
        var timer = "";
        textarea.onfocus = function(){
            var _this = this;
            timer = setInterval(function(){
                curLen = _this.value.length;
                if(curLen >= maxLen){
                    _this.value = _this.value.substring(0,maxLen);
                    curLen = maxLen;
                }
                leftLen = maxLen - curLen;
                curLenSpan.innerHTML = curLen;
                leftLenSpan.innerHTML = leftLen;
            },50);
        };
        textarea.onblur = function(){
            clearInterval(timer);
        };


        var userName = new ValidateInput(fm.userName,/^\w{2,16}$/);
        var pwd = new ValidateInput(fm.userPwd,/^\w{6,16}$/);
        fm.onsubmit = function(){
            if(!userName.validate()) return false;
            if(!pwd.validate()) return false;
        };

        /*fm.onsubmit = function(evt){
            if(window.event){
                window.event.returnValue = false;
            }else{
                evt.preventDefault();
            }

            var userName = fm.userName.value;
            if(!/^\w{2,16}$/.test(userName)){
                fm.userName.focus();
                fm.userName.warningNode.style.display = "inline";
                return;
            }
            fm.userName.warningNode.style.display = "none";
            var pwd = fm.userPwd.value;
            if(!/^\w{6,16}$/.test(pwd)){
                fm.userPwd.focus();
                fm.userPwd.warningNode.style.display = "inline";
                return;
            }
            fm.userPwd.warningNode.style.display = "none";
            var rePwd = fm.rePwd.value;
            if(rePwd != pwd){
                fm.rePwd.focus();
                fm.rePwd.warningNode.style.display = "inline";
                return;
            }
            fm.rePwd.warningNode.style.display = "none";
            var qq = fm.qq.value;
            if(!/^\w{5,10}$/.test(qq)){
                fm.qq.focus();
                fm.qq.warningNode.style.display = "inline";
                return;
            }
            fm.qq.warningNode.style.display = "none";
            var email = fm.email.value;
            if(!/^\w{6,18}@([a-z0-9_]+\.)+[a-z]{2,3}$/.test(email)){
                fm.email.focus();
                fm.email.warningNode.style.display = "inline";
                return;
            }
            fm.email.warningNode.style.display = "none";
            this.submit();
        };*/
    }

    //先面向对象分析，然后再面向对象编程
    //存在哪些对象
    //先从客户端程序员的角度出发

    function ValidateInput(input,validator){
        this.input = input;
        this.validator = validator;
        this.notice = input.parentNode.getElementsByTagName('em')[0];
        this.warning = input.parentNode.getElementsByTagName('strong')[0];
        var _this = this;
        input.onfocus = invoke(this,'showNotice');
        input.onblur = invoke(this,'hideNotice');
    }

    function invoke(obj,method){
        return function(){
            obj[method]();
        }
    }

    ValidateInput.prototype.showNotice = function(){
        this.notice.style.display = 'inline';
    };
    ValidateInput.prototype.hideNotice = function(){
        this.notice.style.display = 'none';
    };
    ValidateInput.prototype.showWarning = function(){
        this.warning.style.display = 'inline';
    };
    ValidateInput.prototype.hideWarning = function(){
        this.warning.style.display = 'none';
    };
    ValidateInput.prototype.isValid = function(){
        if(typeof this.validator == 'function'){
            return this.validator(this.input.value);
        }else{
            return this.validator.test(this.input.value);
        }
    };
    ValidateInput.prototype.validate = function(){
        var v = this.isValid();
         if(v){
             this.hideWarning();
         }else{
             this.showWarning();
             this.input.focus();
         }
        return v;
    }

};

function ValidateForm(form){
    this.elements = [];
    this.form = form;
    var _this = this;
}
ValidateForm.prototype.addElement = function (element){
    this.elements.push(element);
};

function isOverYear(y){
    return (y%4 == 0 && y%100!=0) || y%400 == 0;
}

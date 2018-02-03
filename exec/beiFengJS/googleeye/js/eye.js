/**
 * Created by Administrator on 2017/8/1.
 */
(function(){
    //命名空间
    window.addEventListener('load',initAll,false);
    function initAll(){
        new GEye($('eyeLeft'));
        new GEye($('eyeRight'));
    }
    function GEye(eye){
        this.eye = eye;
        this.pupil = eye.getElementsByTagName('img')[0];
        GEye.eyes.push(this);
    }
    document.onmousemove = function(evt){
        GEye.init(evt.clientX,evt.clientY);
    };
    GEye.init=function (x,y) {
        //实现
        for (var i=0;i<this.eyes.length;i++) {
            this.eyes[i].redraw(x,y);
        }
    };
    GEye.eyes=[];//保存所有的实例
    GEye.eyeRadius = 58;
    GEye.pupilRange = 40;
    GEye.pupilRadius = 6;
    GEye.calcHyp = function (hside,vside){
        return Math.sqrt(Math.pow(hside,2)+Math.pow(vside,2));
    };
    GEye.prototype.setPupilPos = function(left,top){
        this.pupil.style.left = left + "px";
        this.pupil.style.top = top + "px";
    };
    GEye.prototype.setPupilAngle = function(sin,cos){
        var left = GEye.eyeRadius - cos*GEye.pupilRange-GEye.pupilRadius;
        var top = GEye.eyeRadius - sin*GEye.pupilRange-GEye.pupilRadius;
        this.setPupilPos(left,top);
    };
    GEye.prototype.getEyeHPos = function(){
        return {
            x: this.eye.offsetLeft + GEye.eyeRadius,
            y: this.eye.offsetTop + GEye.eyeRadius
        };
    };
    GEye.prototype.redraw = function(mouseX,mouseY){
        var eyeHPos = this.getEyeHPos();
        var l = GEye.calcHyp(mouseX - eyeHPos.x,mouseY - eyeHPos.y);
        console.log(l);
        if(l > GEye.pupilRange){
            var cos = (eyeHPos.x - mouseX)/l;
            var sin = (eyeHPos.y - mouseY)/l;
            this.setPupilAngle(sin,cos);
        }else{
            this.setPupilPos(mouseX - this.eye.offsetLeft - GEye.pupilRadius,mouseY - this.eye.offsetTop - GEye.pupilRadius);
        }
    };
})();


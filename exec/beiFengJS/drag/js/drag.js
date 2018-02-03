/**
 * Created by Administrator on 2017/8/8.
 */
(function(){
    window.onload = function(){
        var oDiv = $('oDiv');
        var d = new DND(oDiv);
    };

    function DND(layer){
        this.layer = layer;
        var _this = this;
        layer.onmousedown = function(evt){
            _this.startDrag(evt);
        };
    }
    DND.prototype.startDrag = function(evt){
        this.offset = {
            x: evt.layerX,
            y: evt.layerY
        };

        var _this = this;
        this.mousemoveHandle =  function(evt){
            _this.move(evt);
        };
        this.mouseupHandle =  function(){
            _this.stopDrag();
        };
        addEvent(document,'mousemove',this.mousemoveHandle);
        addEvent(document,'mouseup',this.mouseupHandle);

    };
    DND.prototype.move = function(evt){
        var x = evt.clientX - this.offset.x;
        var y = evt.clientY - this.offset.y;
        this.moveTo(x,y);
    };
    DND.prototype.moveTo = function(x,y){
        this.layer.style.left = x + 'px';
        this.layer.style.top = y + 'px';
    };
    DND.prototype.stopDrag = function(){
        delEvent(document,'mousemove',this.mousemoveHandle);
        delEvent(document,'mouseup',this.mouseupHandle);
    };



})();
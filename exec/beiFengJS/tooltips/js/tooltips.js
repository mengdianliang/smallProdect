/**
 * Created by Administrator on 2017/8/8.
 */
(function(){
    window.onload = function(){
        var link = $('tipLink');
        var tip = $('link2');
        var t = new ToolTips({
            node: link,
            title:'<h3>ToolTip</h3><img src="./images/mj.jpg"/>'
        });
        var t2 = new ToolTips({
            node: tip,
            className: 'redStyle'
        });
        var t3=new ToolTips({
            node:$("link3"),
            maxWidth:100
        });
    };

    function ToolTips(args){
        this.node = args.node;
        this.title = args.title || args.node.getAttribute('title');
        this.node.removeAttribute('title');

        this.layer = document.createElement('div');
        this.layer.innerHTML = this.title;
        this.layer.className = ["tooltip",args.className].join(' ');

        if (args.maxWidth) {
            this.layer.style.maxWidth=args.maxWidth+"px";
        }

        this.hide();
        document.body.appendChild(this.layer);

        var _this = this;
        this.node.onmouseover = function(evt){
            _this.show(evt);
        };
        this.node.onmouseout = function(){
            _this.hide();
        };
    }
    ToolTips.offset = 20;
    ToolTips.prototype.show = function(evt){
        var x = evt.pageX;
        var y = evt.pageY;
        this.layer.style.left = x + 'px';
        this.layer.style.top = y + 'px';
        //页面视口大小
        var dw = document.documentElement.clientWidth + document.documentElement.scrollLeft;
        var dh = document.documentElement.clientHeight + document.documentElement.scrollTop;
        x += ToolTips.offset;
        y += ToolTips.offset;
        if(x + this.layer.clientWidth > dw){
            x -= this.layer.clientWidth - ToolTips.offset * 2;
        }
        if(y + this.layer.clientHeight > dh){
            y -= this.layer.clientHeight - ToolTips.offset * 2;
        }
        this.layer.style.left = x + 'px';
        this.layer.style.top = y + 'px';
        document.body.appendChild(this.layer);
        this.layer.style.visibility = 'visible';
    };
    ToolTips.prototype.hide = function(){
        //this.layer.style.display = 'none';
        this.layer.style.visibility = 'hidden';
        //this.layer.parentNode.removeChild(this.layer);
    };
})();
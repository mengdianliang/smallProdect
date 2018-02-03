window.onload=function(){
	
	//获取元素
	//获取点击区域
	var dives=document.querySelectorAll('div');
	//获取+1
	var spans=document.querySelectorAll('span');
	//获取♥
	var imgs=document.querySelectorAll('img');
	initSpan();
	mouseEvt();
	
	function initVal(index){
		//初始化span动画默认值
        imgs[index].style.top='-20px';
        imgs[index].opa = 100;
	}
	function initSpan(){
		for(var i=0;i<spans.length;i++){
			spans[i].num = 0;
		}
	}
	//设置变量
	function mouseEvt(){
		for(var i=0;i<dives.length;i++){
			dives[i].index=i;
			//移入
			dives[i].onmouseover=function(){
				this.style.opacity=1;
			};
			//移除
			dives[i].onmouseout=function(){
				this.style.opacity=0.5;
			};
			dives[i].isclick = true; //把所有的div默认为可点击
			//点击
			dives[i].onclick=function(){
				if(!this.isclick){
					return;
				} 
				this.isclick = false;
				initVal(this.index);
				 var _this = this;
				spans[this.index].innerHTML='+'+(++this.querySelector('span').num);

		        imgsAn(this.index,function(){
                    _this.isclick = true;
                });
		       
				MTween(imgs[this.index],-120,500,'top','linear');
				
		//		设置img动画
				function imgsAn(index,fn){
                    clearInterval(imgs[index].t);
					imgs[index].t = setInterval(function(){//设置间隔定时器
						imgs[index].opa-=2;
						if(imgs[index].opa<=0){//心往上飞
							imgs[index].opa=0;
						}
						
						imgs[index].style.opacity=imgs[index].opa/100;
						console.log(imgs[index].style.opacity);
						if(imgs[index].opa==0){
							clearInterval(imgs[index].t);
                            fn&&fn();
						}
					},30) ;
				
			    }
		    }
		}
		
	}
	/*//设置事件
	for(i=0;i<dives.length;i++){
		dives[i].index=i;
		//移入
		dives[i].onmouseover=function(){
			this.style.opacity=1;
		}
		//移除
		dives[i].onmouseout=function(){
			this.style.opacity=0.5;
		}
		//点击
		dives[i].onclick=function(){		
			num++
			spans[this.index].innerHTML='+'+(Number(spans[this.index].innerHTML)+1);
			imgs[this.index].style.display='block';
			imgs[this.index].style.opacity=1;
	        imgsAn(this.index);
			MTween(imgs[this.index],-120,20,'top','linear');			
			
	//		设置img动画
			function imgsAn(index){
						timer=setInterval(function(){//设置间隔定时器
						opa-=2;
						if(opa==0){//心往上飞
							imgs[index].style.display='none';
						}
						imgs[index].style.opacity=imgs[index].opa/100;
					},100)       
			
		    }
	    }
		
			
	}		*/
	
}


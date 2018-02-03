/**
 * Created by Administrator on 2017/10/20.
 */
class Tabs{
    constructor(id){
        this.box = document.getElementById(id);
        this.settings = {
            btns:['新闻','体育','音乐','娱乐','游戏'],
            content:['什么时候能脱贫','夜王标枪得第一','双节棍','鹿晗和xx好','LOLS7'],
            events:'onclick'
        };
    }
    init(json){
        //有配置走配置，没配置走默认
        this.settings = Object.assign(this.settings,json);
        this.createCss(); //创建样式
        this.createBtn(); //创建按钮
        this.createContent(); //创建内容
        this.Events(this.settings.events);   //加事件

    }
    //创建样式
    createCss(){
        const s = document.createElement('link');
        s.href = 'style/tabs.css';
        s.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(s);
    }
    //创建按钮
    createBtn(){
        this.settings.btns.forEach((e,i) =>{
            let btn = document.createElement('button');
            btn.className = (i==0)?'active':'';
            btn.innerHTML = e;
            this.box.appendChild(btn);
        });
    }
    //创建内容
    createContent(){
        this.settings.btns.forEach((e,i) =>{
            let divs = document.createElement('div');
            divs.className = (i==0)?'show':'';
            divs.innerHTML = e;
            this.box.appendChild(divs);
        });
    }
    //绑定事件
    Events(event){
        this.btns = Array.prototype.slice.call(this.box.getElementsByTagName('button'));
        this.content = Array.prototype.slice.call(this.box.getElementsByTagName('div'));
        this.btns.forEach((ele,i)=>{
            ele[event] = () => this.tab(i);
        });
    }
    tab(index){
        this.btns.forEach((ele,i) =>{
            ele.className = '';
            this.content[i].className = '';
        });
        this.btns[index].className = 'active';
        this.content[index].className = 'show';
    }
}
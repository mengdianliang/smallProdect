const express = require('express');   //引进express模块
//处理icon图标
//const favicon = require('serve-favicon');
const hbs = require('hbs'); //加载模板文件和视图引擎
const path = require('path'); //加载路径模块
const bodyParser = require('body-parser');        //加载post请求的时body信息的模块

const app = express();  //返回express暴露出的对象
//禁用头信息
app.disable('x-powered-by)');

//设置模板文件和视图引擎 npm i hbs
app.engine('html',hbs.__express);
app.set('view engine','html');
app.set('views',path.join(__dirname, 'views')); //path.resolve(__dirname, 'views')

/*
* app.set(): 对app这个应用进行设置的方法
* app.use(): 可以让这个app
*
* */
app.use(bodyParser.json());  //处理json格式的数据
app.use(bodyParser.urlencoded({extended: false}));  //处理application/X-www-form-urlencoded格式的数据

const test = require('./routes/test.js');
const index = require('./routes/index.js');
const api = require('./routes/api.js');
const update = require('./routes/update.js');
//设置根路径对应的路由文件
app.use('/',index);
app.use('/api',api);
app.use('/test',test);
app.use('/update',update);

//处理404错误
app.use((req,res,next)=>{
    res.status(404);
    res.send('404 Not found');
});
//处理500错误
app.use((err,req,res,next)=>{
    res.status(500);
    res.send('500 server error');
});
//监听80端口
app.listen(8080,(err)=>{
    if(err){
        return console.error(err);
    }
    console.log("Server is running at port: 8080");
});
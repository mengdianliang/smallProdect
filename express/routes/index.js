const express = require('express');   //引进express模块
const Router = express.Router();//新建一个路由对象

//设定一个get请求，url是主路径
Router.get('/',(req,res)=>{
    res.status(200);   //设定响应状态码为200
    res.type('html');
   /* res.set({   //设置Content-Type
        'Content-Type': 'text/html'
    });*/
    //res.send('welcome my ghghghblog');
    res.render('index');
});
module.exports = Router;//导出路由对象
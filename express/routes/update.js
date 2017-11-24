const express = require('express');
const Router = express.Router();
const formidable = require('formidable');   //处理文件上传的模块
const fs = require('fs');
const path = require('path');


Router.get('/',(req,res)=>{
    res.type('html');
    res.render('update');
});
Router.post('/',(req,res)=>{
    let form = new formidable.IncomingForm();   //新建表单处理对象
    //设定表单的编码格式为utf-8
    form.encoding = 'utf-8';
    //设定文件的存储目录
    form.uploadDir = path.resolve(__dirname,'..',"files");
    //设置上传文件的大小
    form.maxFieldsSize = 300 * 1024 * 1024;
    //设置是否保留文件的扩展名
    form.keepExtensions = true;

    //获取request对象里边的body信息
    form.parse(req);
    //开始接收文件的事件
    form.on('fileBegin',(name,file)=>{
        console.log(name);
        console.log(`${file.name}这个文件上传了！`);
    });
    //进度事件
    form.on('progress',(received,expected)=>{
        console.log(`当前文件上传的进度：${received/expected*100}%`);
    });
    //当某个文件上传完成时
    form.on('file',(name,file)=>{
        console.log(`${file.name}这个文件上传成功了！`);
    });
    //当所有文件上传完成时
    form.on('end',()=>{
        res.redirect(303,'/update');  //重定向到update路由对应的页面，303代表重定向
    });
    //当所有文件上传发生错误时
    form.on('error',(err)=>{
        console.log(err);
        res.send(error);
    });
});
module.exports = Router;
const express = require('express');
const Router = express.Router();

const data = {
    "code": 0,
    "msg": "",
    "data": [
        {"name": "周杰伦"},
        {"name": "林俊杰"},
        {"name": "强哥"}
    ]
};
Router.get('/users',(req,res)=>{
    //res.json（）向客户端发送json格式的数据
    //设置发送的数据格式为json格式
    //res.status(200)
   /* res.set({  //可以设置多个文本类型
        "Content-Type": "application/json"
    });*/
   res.type('application/json');
    res.json(data);
});

module.exports = Router;
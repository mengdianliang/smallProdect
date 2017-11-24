const express = require('express');
const Router = express.Router();

Router.get('/',(req,res)=>{
    res.type('html');
    res.render('test');
});
Router.post('/testform',(req,res)=>{
    let {user,pwd} = req.body;
    res.json({user,pwd});
});
module.exports = Router;
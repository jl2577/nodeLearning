/**
 * Created by lightjiang on 2016/11/2.
 * 日志中间件 morgan https://www.npmjs.com/package/morgan
 */

var connect = require("connect");
var morgan = require('morgan');
var fs = require('fs');
var filename = new Date().getFullYear()+"_"+(new Date().getMonth()+1)+"_"+new Date().getDate()+"_"+new Date().getHours()+"_"+new Date().getMinutes()+"_"+new Date().getSeconds()
var accessLogStream  = fs.createWriteStream(__dirname+'/'+filename+'.log',{flags:'a'});

var app = connect()
    .use(morgan('combined',{stream:accessLogStream}))     //write log to a file
    .use(function(req,res,next){
        res.setHeader("content-type","text/html,charset=utf8");
        res.end("Hello World");
    }).listen(3000);

//morgan还有其他options 如：common \ dev \ short \ tiny 等。当然还可以定制
/**
 * Created by lightjiang on 2016/11/1.
 * bodyParser()组件整合了json()、urlencoded()、multipart()这三个更小的组件，用来提供req.body属性，可以用来解析
 * JSON、x-www-form-urlencoded和multipart/form-data请求，如文件上传，则直接获取req.files对象
 */

var connect = require("connect");
var bodyParser = require('body-parser');    //connect已经不再包含bodyParser()中间件，需要重新install
var app = connect()
    .use(bodyParser.json())         //使用json方法，另外还有urlencoded、row、text方法;https://www.npmjs.com/package/body-parser
    .use(function(req,res){
        console.log(req.body.username);
        res.end("Register userName:"+req.body.username);
    })
    .listen(3000);
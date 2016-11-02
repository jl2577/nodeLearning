/**
 * Created by lightjiang on 2016/10/26.
 */
var connect = require("connect");
var app = connect()
    .use(connect.cookieParser("this is key"))   //给cookieParser中间件传入参数，即可设置签名cookie，
    .use(function(req,res){
        console.log(req.cookie);
        console.log(req.signedCookie)
    }).liesten(3000);
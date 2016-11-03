/**
 * Created by lightjiang on 2016/11/2.
 * 不管请求是否恶意，我们都要对用户的请求做一些限制，过滤掉巨型请求。通常有一下几个方面
 * limit:bytes的限制
 * length:stream的长度
 * received：接收的bytes
 * encoding:无效的编码
 * status/statusCode:报错是的response code
 */

//simple Express example
var connect = require("connect");
var getRawBody = require('raw-body')
var typer = require('media-typer');
var app = connect()
    .use(function(req,res,next){
        getRawBody(req,{
            length:req.headers['content-length'],
            limit:'100kb',
            encoding:typer.parse(req.headers['content-type']).parameters.charset
        },function(err,string){
            if(err) return next(err);
            req.text = string;
            next();
        })
    })
    .listen(3000);


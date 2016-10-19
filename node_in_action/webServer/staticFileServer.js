/**
 * Created by lightjiang on 2016/10/12.
 * 静态文本服务器，用来下载html,js,css,image等静态资源
 */
var fs = require('fs');
var path = require('path');
var http = require('http');
var url = require('url');

//request is an instance of http.IncomingMessage and response is an instance of http.ServerResponse.
var http = http.createServer();
http
    .on('request',function(req,res){
        var filePath = path.join(__dirname,url.parse(req.url).pathname);
        var stream = fs.createReadStream(filePath);
        stream.pipe(res);
    });
http.listen(3000);
/*
http.createServer(function(req,res){
    //获取请求静态资源的绝对路径
    //__dirname这个变量是指当前文件的绝对路径
    res.setHeader('Content-Type','text/js; charset=utf-8');
    console.log(req.constructor.name);
    console.log(res.constructor.name);
    console.dir(req.url);
    var filePath = path.join(__dirname,url.parse(req.url).pathname);

    // var stream = fs.createReadStream(filePath);
    // stream
    //     .on('data',function(chunk){
    //
    //         res.write(chunk);
    //     })
    //     .on('end',function () {
    //         res.end();
    //     });

    //使用pipe改造
    //pipe可以把任意一个ReadableStream中的内容流向一个任意WritableStream。
    //The response implements , but does not inherit the Writable Stream interface;
    //The request implements the Writable Stream interface ;  they both are EventEmitters
    // var stream = fs.createReadStream(filePath);
    // stream.pipe(res);

    //错误处理
    fs.stat(filePath , function (err , stat) {
        if(err){
            if('ENOENT' == err.code){
                res.statusCode = 404;
                res.end('Not Found');
            }else{
                res.statusCode = 500;
                res.end('Internet Server Error');
            }
        }else{
            res.setHeader('Content-length',stat.size);
            var stream = fs.createReadStream(filePath);
            stream.pipe(res);
            stream
                .on('error',function (err) {
                    res.statusCode = 500;
                    res.end('Internet Server Error');
                });
        }
    });
}).listen(3000);
*/
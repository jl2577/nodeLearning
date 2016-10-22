/**
 * Created by lightjiang on 2016/10/22.
 * Connect 是一个框架，被称为中间件的模块化组件，以可重用的方式实现Web程序中的逻辑。
 * 常用的组件：请求日志，静态文件服务，请求体解析，会话管理等，Connect就像一个抽象层，很容易扩展，express就是居于connect扩展.
 * 使用next回调函数来让程序经过一个又一个的组件。没有next即结束
 */
var connect  = require('connect');

var app = connect();
app.use(logger);
app.use('/admin',hello);   //中间件挂载，只有url前缀与之匹配时，connect才会调用hello中间件
//app.use(hello);
app.listen(3000);

//app.use(logger).use(hello).listen(3000);  //也是支持链式调用的

function logger(req,res,next){
    console.log('%s %s',req.method,req.url);
    next();
}
function hello(req,res){
    console.log(req.url);    //当使用了中间件挂载时，这里的url是去掉/admin部分
    res.setHeader('Content-Type','text/html,charset=utf8');
    res.end('Hello World!');
    //没有next ，即结束了http请求
}

//实现简单的http basic 认证组件
function restrict(req,res,next){
    var authorization = req.headers.authorization;;
    if(!authorization) return next(new Error('Unauthorized'));   //用Error对象作为参数的next函数调用，相当于告诉connect出错
    var parts = authorization.split(' ');
    var scheme =parts[0];
    var auth = new Buffer(parts[1],'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];

    authenticateWithDatabse(user,pass,function (err) {  //通过数据库校验用户是否OK
        if(err) return next(err);
        next();
    });
}

//可配置的logger中间件组件
function setup(format){
    var regexp = /:(\w+)/g;
    return function logger(req,res,next){
        var str = format.replace(regexp , function(match,property){
            return req[property];
        });
        console.log(str);
        next();
    }
}
//app.use(setup(':method :url'))   //即通过参数的形式来输出我们所需要的内容
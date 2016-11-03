/**
 * Created by lightjiang on 2016/11/1.
 * bodyParser()组件整合了json()、urlencoded()、multipart()这三个更小的组件，用来提供req.body属性，可以用来解析
 * JSON、x-www-form-urlencoded和multipart/form-data请求，如文件上传，则直接获取req.files对象
 */

var connect = require("connect");
var bodyParser = require('body-parser');    //connect已经不再包含bodyParser()中间件，需要重新install
var app = connect()
    .use(bodyParser.json())         //使用json方法，另外还有urlencoded方法;https://www.npmjs.com/package/body-parser
    .use(function(req,res){
        console.log(req.body.username);
        res.end("Register userName:"+req.body.username);
    })
    .listen(3000);


//curl测试
//curl -d '{"username":"light"}' -H "Content-Type:application/json" http://localhost:3000

//connect支持中间件
/*
* body-parser   --body-parser\json\urlencoded
* compression   --compress
* connect-timeout   --timeout
* cookie-parser --cookieParser
* cookie-session    --cookieSession
* csurf         --csrf
* errorHandler  --error-handler
* express-session   --session
* method-override   --method-override
* morgan        --logger
* response-time --response-time
* serve-favicon --favicon
* serve-index   --directory
* serve-static  --static
* vhost         --vhost
*/

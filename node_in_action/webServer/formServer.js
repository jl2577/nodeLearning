/**
 * Created by lightjiang on 2016/10/17.
 */
var http = requires('http');
var items = [];

var server = http.createServer(function(req,res){
    if('/' == req.url){
        switch (req.method){
            case 'GET':
                show(res);
                break;
            case 'POST':
                add(req,res);
                break;
            default:
                badRequest(res);
        }
    }else{
        notFound(res);
    }
});
server.listen(3000);

function show(res){
    var html = '';
    res.setHeader({'Content-Type':'text/html','Content-Length':Buffer.byteLength(html)});
    res.end(html);
}

function notFound(){
    res.statusCode = 404;
    res.setHeader('Content-Type','text/plain');
    res.end('Not Found');
}

function badRequest(res){
    res.statusCode = 400;
    res.setHeader('Content-Type','text/plain');
    res.end('Bad Request');
}

function add (req,res){
    var body = '';
    res.setEncoding('utf8');
    req.on('data',function(chunk){
        body += chunk;
    });
    req.on('end',function(){
        var obj = querystring.parse(body);
        items.push(obj.item);
        show(res);
    });
}

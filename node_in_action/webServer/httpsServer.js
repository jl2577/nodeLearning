/**
 * Created by lightjiang on 2016/10/19.
 */
var https = require('https');
var fs = require('fs');

var option = {
    key:fs.readFileSync('./key.pem'),
    cert:fs.readFileSync('./key-cert.pem')
}

https.createServer(option , function(req,res){
    res.writeHead(200);
    res.end('Hello World!');
}).listen(3000);
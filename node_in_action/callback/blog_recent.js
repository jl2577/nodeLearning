/**
 * Created by lightjiang on 2016/9/29.
 */
var http = require('http');
var fs = require('fs');

// http.createServer(function(req,res){
//     if(req.url == '/'){
//         fs.readFile('./titles.json',function(err,data){
//             if(err){
//                 console.err(err);
//                 res.end('Server Error');
//             }else{
//                 var titles =JSON.parse(data.toString());
//                 fs.readFile('./template.html',function(err,data){
//                     if(err){
//                         console.err(err);
//                         res.end('Server Error');
//                     }else{
//                         var tmpl = data.toString();
//                         var html = tmpl.replace('%',titles.join('</li><li>'));
//                         res.writeHead(200,{'Content-Type':'text/html'});
//                         res.end(html);
//                     }
//                 });
//             }
//         });
//     }
// }).listen(8000,'127.0.0.1');    //回调层数太多，不利于维护，重构等

var server = http.createServer(function(req,res){
    getTitles(res);
}).listen(8000,'127.0.0.1');

function getTitles(res) {
    fs.readFile('./titles.json',function(err,data){
        if(err){
            hadError(err,res);
        }else{
            getTemplate(JSON.parse(data.toString()),res);
        }
    });
}

function getTemplate(titles,res){
    fs.readFile('./template.html',function(err,data){
        if(err){
            hadError(err,res);
        }else{
            formateHtml(titles,data.toString(),res);
        }
    });
}

function formateHtml(titles,tmpl,res){
    var html = tmpl.replace('%',titles.join('</li><li>'));
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(html);
}

function hadError(err,res){
    console.err(err);
    res.end('Server Error');
}
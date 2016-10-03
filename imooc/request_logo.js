var http=require('http');
var fs=require('fs');
var request=require('request');

http.createServer(function(req,res){
	// fs.readFile('img/logo.png',function(err,data){
	// 	if(err){
	// 		res.end('file not exist！');
	// 	}else{
	// 		res.writeHead(200,{'Content-Type':'text/html'});
	// 		res.end(data);
	// 	}
	// })  //方法1
	

	//fs.createReadStream('img/logo.png').pipe(res);   //方法2
	
	request('http://static.mukewang.com/static/img/common/logo.png').pipe(res);  //方法三

}).listen(8090)
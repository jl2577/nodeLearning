var http =require('http');
var cheerio = require('cheerio');
var url='http://www.imooc.com/learn/348';

http.get(url,function(res){
	var html="";

	res.on('data',function(data){
		html+=data;
	});

	res.on('end',function(){
		var $ = cheerio.load(html);
		console.log($);
	});
}).on('error',function(){
	console.log("获取出错");
})


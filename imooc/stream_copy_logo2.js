var fs=require('fs');

var readStream=fs.createReadStream('../img/1_3.png');
var writeStream=fs.createWriteStream('../img/1_3_copy.png');

readStream.on('data',function(trunk){
	
	if(writeStream.write(trunk)===false){
		console.log('still cache');
		readStream.pause();
	}
})

readStream.on('end',function(){
	writeStream.end();
})

writeStream.on('drain',function(){
	console.log('data drain');
	readStream.resume();
})
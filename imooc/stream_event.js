var fs=require('fs');
var readStream=fs.createReadStream('../img/1_3.png');
var n=0;

readStream
	.on('data',function(chrunk){
		n++;
		console.log('data emits');
		console.log(Buffer.isBuffer(chrunk));
		//console.log(chrunk.toString('utf-8'));
		readStream.pause();
		console.log('Stream pause');
		setTimeout(function(){
			readStream.resume();
			console.log('Stream resume');
		},10);
	})
	.on('readable',function(){
		console.log('data readable');	
	})
	.on('end',function(){
		console.log('data ends '+n);	
	})
	.on('close',function(){
		console.log('data closes');
	})
	.on('error',function(){
		console.log('data errors');
	})

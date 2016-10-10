var fs=require('fs');

//只能适应于小文件，如果需要处理大文件如视频、音频等，就需要借助流stream
fs.readFile('../img/logo.png',function(err,origin_buffer){
	console.log(Buffer.isBuffer(origin_buffer));

	fs.writeFile('../img/buffer_logo.png',origin_buffer,function(err){
		if(err){
			console.log(err);
		}
	});

	var base64Image = origin_buffer.toString('base64');

	console.log(base64Image);

	var decodedImage = new Buffer(base64Image,'base64');
	console.log(Buffer.compare(origin_buffer,decodedImage));

	fs.writeFile('img/logo_encoded.png',decodedImage,function(err){
		if(err){
			console.log(err);
		}
	})
})
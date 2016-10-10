var stream=require('stream');
var util=require('util');

function ReadStream(){
	stream.Readable.call(this);
}

util.inherits(ReadStream,stream.Readable);

ReadStream.prototype._read=function(){
	this.push('I ');
	this.push('Love ');
	this.push('Nodejs\n ');
	this.push(null);
}

function WriteStream(){
	stream.Writable.call(this);
	this._cached= new Buffer('');
}

util.inherits(WriteStream,stream.Writable);

WriteStream.prototype._write=function(chrunk,encode,cb){
	console.log(chrunk.toString());
	cb();
}

function TransformStream(){
	stream.Transform.call(this);
}

util.inherits(TransformStream,stream.Transform);

TransformStream.prototype._transform=function(chrunk,encode,cb){
	this.push(chrunk);
	cb();
}

TransformStream.prototype._flush=function(cb){
	this.push('Over done');
	cb();
}

var rs=new ReadStream();
var ws=new WriteStream();
var ts=new TransformStream();

rs.pipe(ts).pipe(ws);    //将可读流，给转换流处理，再给可写流输出








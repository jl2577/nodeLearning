var EventEmitter = require('events').EventEmitter;

var life = new EventEmitter();

life.setMaxListeners(11);

function eat1(who){
	console.log(who +" eat meat ...1")
}
life.on('eat',eat1);

life.on('eat',function(who){
	console.log(who +" eat meat ...2")
});
life.on('eat',function(who){
	console.log(who +" eat meat ...3")
});
life.on('eat',function(who){
	console.log(who +" eat meat ...4")
});
life.on('eat',function(who){
	console.log(who +" eat meat ...5")
});
life.on('eat',function(who){
	console.log(who +" eat meat ...6")
});
life.on('eat',function(who){
	console.log(who +" eat meat ...7")
});
life.on('eat',function(who){
	console.log(who +" eat meat ...8")
});
life.on('eat',function(who){
	console.log(who +" eat meat ...9")
});
life.on('eat',function(who){
	console.log(who +" eat meat ...10")
});
life.on('eat',function(who){
	console.log(who +" eat meat ...11")
});
life.on('drink',function(who){
	console.log(who +" drink water ...1")
});
life.on('drink',function(who){
	console.log(who +" drink water ...2")
});

//删除某个事件的其中一个监听方法
life.removeListener('eat',eat1);  //这里不可以使用匿名函数   见第7行
//删除某个事件的所有监听方法。  //没有参数就是删除所有监听方法
life.removeAllListeners('eat');  

life.emit('eat','jack');   ///默认同一个事件最多执行10个事件监听函数
life.emit('drink','tony');

console.log(life.listeners('eat').length);
console.log(life.listeners('drink').length);
console.log(EventEmitter.listenerCount(life,'eat'));
console.log(EventEmitter.listenerCount(life,'drink'));
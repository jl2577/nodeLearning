/**
 * Created by lightjiang on 2016/9/29.
 */
var fs = require('fs'),watchDir='./watch',processedDir='./done';

var events = require('events'),util=require('util');

function Watcher(watchDir,processedDir){
    this.watchDir = watchDir;
    this.processedDir = processedDir;
}

util.inherits(Watcher,events.EventEmitter);

Watcher.prototype.watch = function(){
    var watcher = this;
    fs.readdir(this.watchDir,function (err,files) {
        if(err) throw err;
        for(var index in files){
            watcher.emit('process',files[index]);     //继承了events.EventEmitter
        }
    });
}

Watcher.prototype.start = function () {
    var watcher = this;
    fs.watchFile(this.watchDir,function(){    //监听目录下的文件发生变化
        watcher.watch();
    });
}

var watcher = new Watcher(watchDir,processedDir);

watcher.on('process',function(file){
    var watchFile = this.watchDir+'/'+file;
    console.log("porcessing file :"+watchFile);
    var processedFile = this.processedDir+'/'+file.toLowerCase();
    fs.rename(watchFile,processedFile,function (err) {
        if(err) throw err;
    });
});

watcher.start();
/**
 * Created by lightjiang on 2016/10/21.
 * 获取本目录下的.task文件内容和写入内容
 * 使用命令的方式，命令格式如： node fileDB.js  list/add  [add content]
 * 在初始化JSON文件时，要用""不是''
 */
var　fs = require('fs');
var path = require('path');
var argv = process.argv.splice(2);  //剔除前面2个参数
var command = argv.shift();         //操作命令
var taskDescription = argv.join(' ');
//var file = path.join(process.cwd(),'/.task');
var file = __dirname+'/.task';

//console.log(process.cwd());
//console.log(__dirname);

switch (command){
    case 'add' :
        addTasks(file,taskDescription);
        break;
    case 'list' :
        listTasks(file);
        break;
    default:
        console.log('Usage :'+process.argv[0]+' list|add [taskDescription]');
}

function loadOrInitializeTaskArray(file,cb){
    fs.exists(file,function(exits){
       if(exits){
           var tasks=[];
           fs.readFile(file,'utf8',function(err,data){
               if(err) throw err;
               //console.log('fileContent:'+data);
               data = data.toString();
               tasks = JSON.parse(data || []);
               //console.log('tasks:'+tasks);
               cb(tasks);
           })
       } else{
           cb();
       }
    });
}

function addTasks(file,taskDescription){
    loadOrInitializeTaskArray(file,function(tasks){
        tasks.push(taskDescription);   //return the length of tasks
        storeTasks(file,tasks);
    });
}

function storeTasks(file,tasks) {
    fs.writeFile(file,JSON.stringify(tasks),'utf8',function(err){
        if(err) throw err;
        console.log('Add Task successful!');
        console.log('Tasks Content:'+tasks)
    });
}
function listTasks(file) {
    loadOrInitializeTaskArray(file,function(tasks){
        for(var i in tasks){
            console.log(tasks[i]);
        }
    });
}
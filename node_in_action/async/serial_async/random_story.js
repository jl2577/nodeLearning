/**
 * Created by lightjiang on 2016/9/30.
 */
var fs= require('fs'),request = require('request'),htmlparser = require('htmlparser');
var configFileName = './rss_feeds.txt';

function checkForRSSFile(){
    fs.exists(configFileName,function(exists){
        if(!exists) return next(new Error('Missing RSS file '+configFileName));
        next(null,configFileName);
    });
}

function readRSSFile(configFileName) {
    fs.readFile(configFileName,function(err,feedList){
        if(err) return next(err);
        feedList = feedList.toString().replace(/^\s+|\s+$/g,'').split('\n');

        var random = Math.floor(Math.random()*feedList.length);
        next(null,feedList[random]);
    });
}

function downloadRSSFile(feedUrl) {
    request({uri:feedUrl},function(err,res,body){
        if(err) return next(err);
        if(res.statusCode!=200) return next(new Error('Abnormal response status code'))
        next(null,body);
    });
}

function parseRSSFeed(res) {
    var handler = new htmlparser.RssHandler();   //what is RSS
    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(res);
    console.dir('dom'+JSON.stringify(handler.dom));
    if(!handler.dom.length) return next(new Error('No RSS items found'));
    var item = handler.dom.shift();
    console.log(item.title);
    console.log(item.link);
}

var tasks = [checkForRSSFile,readRSSFile,downloadRSSFile,parseRSSFeed];

function next(err,result){
    //console.log(result);
    if(err) throw err;
    var currentTask = tasks.shift();

    if(currentTask){
        console.log('current task'+currentTask.name);
        currentTask(result);
    }
}

next();
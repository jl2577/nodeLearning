var http =require('http');
var cheerio = require('cheerio');
var Promise=require('bluebird');
var baseUrl='http://www.imooc.com/learn/';
var videosId=[348,259,197,134,75];

function filterChapters(html){
	var $ = cheerio.load(html);
	var chapters=$('.chapter');
	var title=$('.course-infos .path span').text();
	var number=parseInt($($('.course-infos .meta-value  strong')[3]).text().trim());
	// courseData={
	// 	title:title,
	// 	number:number,
	// 	videos:[{
	// 		chapterTitle:chapterTitle
	// 		videos:[{
	// 			title:title,
	// 			id:id
	// 		}]
	// 	}]
	// }

	var courseData={
		title:title,
		number:number,
		videos:[]
	}
	chapters.each(function(item){
		var chapter=$(this);
		var chapterTitle=chapter.find('strong').text();
		var video=chapter.find('.video').children('li');
		var chapterData={
			chapterTitle:chapterTitle,
			videos:[]
		}
		video.each(function(){
			var video=$(this).find('.studyvideo');
			var videoTitle=video.text();
			var id=video.attr('href').split('video/')[1];
			chapterData.videos.push({
				title:videoTitle,
				id:id
			})
		});
		courseData.videos.push(chapterData);
	});
	return courseData;
}

function printCourseInfo(coursesData){
	coursesData.forEach(function(courseData){
		console.log(courseData.number+" 人学习过 "+courseData.title);
		courseData.videos.forEach(function(item){
			var chapterTitle=item.chapterTitle;
			console.log(chapterTitle+'\n');
			item.videos.forEach(function(item){
				console.log('    ['+item.id+']  '+item.title+'\n');
			});
		})
	})
}

function getPageAsync(url){
	return new Promise(function(resolve,reject){
		console.log("正在爬取。。。"+url);
		http.get(url,function(res){
			var html="";
			res.on('data',function(data){
				html+=data;
			});
			res.on('end',function(){
				resolve(html);
			});
		}).on('error',function(e){
			reject(e);
			console.log("获取出错");
		})
	})
}

var fetchCourseArray=[];

videosId.forEach(function(id){
	fetchCourseArray.push(getPageAsync(baseUrl+id));
	console.log(fetchCourseArray);
});

Promise
	.all(fetchCourseArray)
	.then(function(pages){
		var coursesData=[];
		pages.forEach(function(html){
			var courses=filterChapters(html);
			coursesData.push(courses);
		});
		coursesData.sort(function(a,b){
			return a.number<b.number;
		})
		printCourseInfo(coursesData);
	})
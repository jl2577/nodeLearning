var Mclass=require('./class');

//Mclass.add("jack",["bob","lucy"]);  //添加一个班级

function add(Mclasses){
  Mclasses.forEach(function(item,index){
    Mclass.add(item.teacher,item.student);
  });
}

exports.add=add;
var school=[{teacher:"jack",student:['nick','lucy']},{teacher:'mark',student:['tony','stark']}];

/**
 * Created by lightjiang on 2016/10/9.
 */
exports.b=2;

module.exports.a = 1;

exports={a:3};

/*
export 与 module.exports的区别:
    每个文件文件都有一个module属性，module有一个exports属性，在文件正真被导出的时候，是根据module.exports的
    值来导出，跟exports的值并没有很大关系；
    exports与module.exports在文件初始化的时候，被共同引用一个空对象｛｝,当给exports或者module.exports引用
    来给空对象添加属性时，另一个都会改变。一旦这2个有赋值语句发生时，他们就没有任何关系了。
    一般通过一下写法来强制添加关联：
    exports=module.exports={};
*/
var fs=require('fs');

//使用pipe 复制图片
fs.createReadStream('../img/logo.png').pipe(fs.createWriteStream('../img/logo_pipe.png'));
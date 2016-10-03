var fs=require('fs');
var source=fs.readFileSync('img/logo.png');

fs.writeFileSync('img/stream_copy_logo.png',source);
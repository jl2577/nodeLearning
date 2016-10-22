/**
 * Created by lightjiang on 2016/10/22.
 * 一个简单的路由中间件
 */
var connect = require('connect');
var parse = require('url').parse;
var routers = {
    GET : {
        '/users' : function(req,res){
            res.end('tobi , loki , ferret');
        },
        '/user/:id' : function(req,res,id){
            res.end('user '+ id);
        }
    },
    DELETE : {
        '/user/:id' : function(req,res,id){
            res.end('deleted user '+id);
        }
    }
};

function router(obj){
    return function(req,res,next){
        if(!obj[req.method]){
            next();
            return ;
        }
        var routes = obj[req.method];
        var url = parse(req.url);
        var paths = Object.keys(routes);

        for (var i = 0 ; i<paths.length ;i++){
            var path = paths[i];
            var fn = routes[path];
            path = path.replace(/\//g,'\\/').replace(/:(\w+)/g , '([^\\/]+)');
            var re = new RegExp('^'+path+'$');   //^\/user\/([^\/]+)$    /user/xxxxxx    xxx中不能有/
            console.log(re);
            var captures = url.pathname.match(re);
            if(captures){
                var args = [req,res].concat(captures.slice(1));
                fn.apply(null,args);
                return ;
            }
        }
        next();
    }
}

connect()
    .use(router(routers))
    .listen(3000);
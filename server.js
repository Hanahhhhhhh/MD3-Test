const http = require('http');
const qs = require('qs');
const url = require('url');
const control = require('./controller/controller');

let server = http.createServer(((req, res) => {
    let parseUrl = url.parse(req.url, true);
    let path = parseUrl.pathname;
    let trimPath = path.replace(/^\/+|\/+$/g, '');
    let chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notFound;
    chosenHandler(req, res);
}));
server.listen('8080', function (){
    console.log('server is running at  http://localhost:8080')
});
let handlers = {};
handlers.list = function (req, res){
    let contr = new control();
    if (req.method === 'GET'){
        contr.showPageList(req, res);
    }else {
        contr.editCity(req,res);
    }
}
handlers.notFound = function (req, res){

}
handlers.delete =function (req, res){
    let contr = new control();
    let urlPath = url.parse(req.url, true);
    let queryString = urlPath.query;
    let index = queryString.id;
    contr.deleteCity(index,req, res);
}
handlers.detail = function (req, res){
    let contr = new control();
    let urlPath = url.parse(req.url, true);
    let queryStr= urlPath.query;
    let index = queryStr.id;
    contr.showPageDetail(index,req, res);
};
handlers.add = function (req, res){
    let contr = new control();
    if (req.method === 'GET'){
        contr.showPageAdd(req, res)
    }else {
        contr.addCity(req, res)
    }
}
let router ={
    'list' : handlers.list,
    'list/delete' : handlers.delete,
    'list/add' : handlers.add,
    'list/detail' : handlers.detail
}


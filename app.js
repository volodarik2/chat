
/**
 * Module dependencies.
 */

var express = require('express');
var config=require('./config');

var parseCookie= require('./lib/parseCookie.js');
var userData= require('./lib/userData');


var app =express();
var http =require('http');
var  log =require('./lib/log')(module);
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(config.get('port'),function(){console.log(config.get('port'))});

  app.engine('ejs',require('ejs-locals'))
  app.set('views', __dirname + '/templates');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));






require('./lib/routes')(app, io);










 

/*
app.use(function(err ,req, res, next ){
  if(app.get('env') =='development'){
        app.use(express.errorHendler());
  }else{
     res.send(500);
  } 
});

 
app.use(function(req ,res ,next){
   if(req.url=='/'){
    res.end("Hello");
   } else{

     next();
   }
});

app.use(function(req,res, next){
 
   res.end("hello");
})*/


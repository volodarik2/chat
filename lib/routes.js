var parseCookie= require('./parseCookie.js');
//var cookie =require('cookie');
var userData= require('./userData');
var db=require('./db');

var Memcached = require('memcached');
var memcached = new Memcached("localhost:11211");
var PHPUnserialize = require('php-unserialize');



module.exports =function(app,io){

  app.use(  function (req, res) {

    var data= parseCookie(req);
    var tpl_data={};
    tpl_data.access=false; 
    var result=false

    if(data != false){
         
      memcached.get('user_session_data'+data.session_id, function (err, dat) { 

        dat=PHPUnserialize.unserialize(PHPUnserialize.unserialize(dat).user_data);
        if(dat.user_id ){
              
          tpl_data.access=dat.user_id;
            
          io.on('connection', function (socket) {
            var room='room'+dat.user_id;  
            socket.join(room);
            result= db.getMessage(room);
            console.log(result);

            socket.on('message', function (data) {
              data.date =Date.now();
              data.user_id =dat.user_id;
              data.room=room;
               //db.setMassage(data); 
                



            });

            socket.on('disconnect', function(){  
                console.log('disconnect');
            });   
          }); 
        }
      });
    }   
      //if(fields)

    if(result){

      result.on('fields',function(rows){
        tpl_data.message=rows;
        res.render('index',tpl_data);
      })

    }else{

      res.render('index',tpl_data);
    }
       
    
  })	




}
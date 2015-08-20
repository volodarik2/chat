var parseCookie= require('./parseCookie.js');
//var cookie =require('cookie');
var userData= require('./userData');
var db=require('./db');

var Memcached = require('memcached');
var memcached = new Memcached("localhost:11211");
var PHPUnserialize = require('php-unserialize');



module.exports =function(app,io){





app.use(  function (req, res) {

    if(req.url.indexOf('www'))
    {
      //res.redirect(req.url.replace("www",""));
    }

  var data= parseCookie(req);



   if(data){
       
       memcached.get('user_session_data'+data.session_id, function (err, dat) { 
          
         // dat=PHPUnserialize.unserialize(dat);
          dat=PHPUnserialize.unserialize(PHPUnserialize.unserialize(dat).user_data);  
          if(dat.user_id ){ 
             
             io.on('connection', function (socket) {
                   var room='room'
                 // console.log(io.sockets.sockets[ID] )
                 //console.log(socket.conn.server.clients);
                       
                  socket.join(room);
                  //socket.emit('message2', { mess: 'world' });

                  io.to(room).emit('message2', 'asdasd');
                  io.to(room).emit('room', data);
                  socket.on('message', function (data) {
                  
                   
                   data.times =Math.floor(new Date() / 1000);
                   
                  });

                  socket.on('disconnect', function(){  
                      console.log('disconnect');
                  });
                
             }); 
            

          }else{
            io.on('connection', function (socket) {
                  socket.emit('no-access', { mess: 'world' });
              });
             
            
          }

        });


    }else{

      io.on('connection', function (socket) {
                  socket.emit('no-access', { mess: 'world' });
              });
             
      
    }
    res.render('index');
 })	




}
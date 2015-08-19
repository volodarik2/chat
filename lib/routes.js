var parseCookie= require('./parseCookie.js');

var userData= require('./userData');
var db=require('./db');

var Memcached = require('memcached');
var memcached = new Memcached("localhost:11211");
var PHPUnserialize = require('php-unserialize');



module.exports =function(app,io){

io.on('connection', function (socket) {
  socket.emit('message', { mess: 'world', });
  socket.on('message', function (data) {
    console.log(data);
  });
});



app.use(  function (req, res) {

  var data= parseCookie(req);

    if(data){
       
       memcached.get('user_session_data'+data.session_id, function (err, dat) { 
           
          dat=PHPUnserialize.unserialize(dat);
         // dat=PHPUnserialize.unserialize(dat.user_data);
          console.log(dat);
          if(dat.user_id > 0){  
            res.render('index');

          }else{
            res.render('index');
           // socket.emit("not success");
          }

        });

res.render('index');
    }else{
      res.render('index');
    }

 })	




}
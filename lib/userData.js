var Memcached = require('memcached');
var memcached = new Memcached("localhost:11211");
var PHPUnserialize = require('php-unserialize');







module.exports =function(sess_name){

  var d  ;
 
  memcached.get('user_session_data'+sess_name, function (err, data) { 

     data=PHPUnserialize.unserialize(data);
     data=PHPUnserialize.unserialize(data.user_data);
      return data;
     

 })

  

}
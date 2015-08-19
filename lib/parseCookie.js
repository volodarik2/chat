
module.exports=function (req){

 var PHPUnserialize = require('php-unserialize');
 var data= req.cookies["e-trades"];
 
  if(data) 
      data=PHPUnserialize.unserialize(data);
   else
   	  data =false;
   
   return data;
}


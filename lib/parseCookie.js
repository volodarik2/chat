
module.exports=function (req){
 delete data; 
 var PHPUnserialize = require('php-unserialize');
 var data= req.cookies["e-trades"];
 delete req;
if(data){ 
  data=PHPUnserialize.unserialize(data);
}else{
  data =false;
}
return data;
}


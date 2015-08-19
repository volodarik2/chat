var isAuthorized = require('./lib/isauthorized.js');
var db=require('./db');


module.exports =function(app,io){

io.on('connection', function (socket) {
  socket.emit('message', { mess: 'world', });
  socket.on('message', function (data) {
    console.log(data);
  });
});



app.use(  function (req, res) {
  if(isAuthorized()){

    
      res.render('index');
  }else{

    socket.emit("not success");
  }

  });

	
}
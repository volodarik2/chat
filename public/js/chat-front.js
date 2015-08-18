/*var socket = io.connect();
*/




/*$(document).on('click', '#btn-chat', function (e) {
  var text =$('#btn-input').val();

   socket.emit('my other event', { my: text });


});
$(document).on('focus', '.panel-footer input.chat_input', function (e) {
    
});
$(document).on('click', '#new_chat', function (e) {
  
});
$(document).on('click', '.icon_close', function (e) {
    
});
*/


var Chat_init= function(){
    var self=this;

    self.socket= io.connect();

    self.sendMessage=function(){
        var text =$('#btn-input').val();
        self.socket.emit('front', { "mess": text });
    }

    self.responseMessage=function(data){
        console.log(data)
    }

    self.authorized=function(){
       alert("authorized");
    }

    self.init= function(){
      
      self.socket.on('backend', function (data) {
         self.responseMessage(data);   
      });
      self.socket.on("not success", function (data) {
           self.autorization(); 
      });

      $(document).on('click', '#btn-chat', function (e) {
        self.sendMessage()
      }); 

    }

   
   self.init(); 
}

var cath =new Chat_init;

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
        self.socket.emit('message', { "mess": text },function(d){
            self.html(text);

            console.log(d);
        } );
    }

    self.responseMessage=function(data){
        console.log(data)



    }

    self.autorization=function(){
       alert("authorized");
    }

    self.html=function(text){
   
      var tmp= '<li class="right clearfix"><span class="chat-img pull-right">\
                    <img class="img-circle" alt="User Avatar" src="http://placehold.it/50/FA6F57/fff&amp;text=ME">\
                    </span>\
                        <div class="chat-body clearfix">\
                            <div class="header">\
                                <small class=" text-muted"><span class="glyphicon glyphicon-time"></span>13 mins ago</small>\
                                <strong class="pull-right primary-font">Bhaumik Patel</strong>\
                            </div>\
                            <p class="my">'+text+'</p>\
                        </div>\
                </li>';

       $('.chat').prepend(tmp);                      

    }

    self.init= function(){
      
      self.socket.on('message2', function (data) {
         self.responseMessage(data);   
      });
      self.socket.on("no-access", function (data) {
           self.autorization(); 
      });

      $(document).on('click', '#btn-chat', function (e) {
        self.sendMessage();
        console.log('click');
      }); 

    }

   
   self.init(); 
}

var cath =new Chat_init;

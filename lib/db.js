var mysql = require('mysql');
var config= require('../config');
var config= config.get('myconnect');  
var	db={};





db.getMessage=function(room){
var sql="SELECT * FROM support_chat_log WHERE `room`='"+room+"'"; 	
//console.log(sql);
var connection = mysql.createConnection({
  host     : config.host,
  user     : config.user,
  password : config.pass,
  database : config.db_name
 }) 
   
connection.connect();		
 var query = connection.query(sql);
 connection.end();
 /*query.on('fields', function(row) {
    console.log(row);
   
 });*/
  return query;
}


db.setMassage=function( data){
var sql="insert into support_chat_log values(null,'"+data.room+"','"+data.mess+"',"+data.user_id+",'"+data.date+"')";
var connection = mysql.createConnection({
  host     : config.host,
  user     : config.user,
  password : config.pass,
  database : config.db_name
})     


connection.connect();
connection.query(sql);
connection.end();
}


module.exports=db;
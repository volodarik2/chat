var mysql = require('mysql');
var config= require('./config');
var config= config.get('myconnect');

  
var connection = mysql.createConnection({
  host     : config.host,
  user     : config.user,
  password : config.pass,
  database : config.db_name
})

/*connection.connect(function(err){  
  if(err)
  	   new Error('error db');

});*/


module.exports=connection;


/*connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});*/

//connection.end();



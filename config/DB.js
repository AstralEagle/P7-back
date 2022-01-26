require('dotenv').config({path: './config/.env'})
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : process.env.DBHOST || 'localhost',
  port     : process.env.DBPORT,
  user     : process.env.DBUSER,
  password : process.env.DBPASSWORD,
});

module.exports.getDB = ()=>{
  return connection;
}
 

 

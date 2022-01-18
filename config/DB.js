var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : process.env.DBHOST || 'localhost',
  port     : process.env.DBPORT,
  user     : process.env.DBUSER,
  password : process.env.DBPASSWORD,
  database : process.env.DBNAME
});

module.exports.getDB = ()=>{
  return connection;
}
 

 

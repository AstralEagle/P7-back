const mysql = require('mysql');


const connection = mysql.createConnection({
    host     : 'localhost',
    port     :  3306,
    user     : 'root',
    password : 'root',
    database : 'groupomania' ,
    ssl      :  true,
});


const request = "INSERT INTO user SET ?";
const values = {name:'lol',last_name:"test",password:"test"};
connection.query(request,values,(err, result) => {
  if (!result) {
    console.log('error')
  } else {
    console.log('success');
  }
});
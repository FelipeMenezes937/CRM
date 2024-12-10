const mysql = import('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""//troca a senha do banco quando for usar 
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("database connected!");
  });
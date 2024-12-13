const mysql = import('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "CRM"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("database connected!");
  });
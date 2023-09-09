const express = require("express");
const mysql = require("mysql");

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '7640',
  database: 'mysqlDB',
})

con.connect(function (err) {
  if (err) {
    console.log(err);
  }
  else {
    var sql = "CREATE TABLE mytable (id int,name varchar(10))";

    con.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("table created");
      }
    })
  }
})
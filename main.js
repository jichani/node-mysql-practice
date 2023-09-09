const express = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.use(bodyParser.urlencoded({ extended: true }));


const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '7640',
  database: 'mysqlDB',
});

con.connect(function (err) {
  if (err) {
    console.log(err);
    return;
  }

  var sql = "CREATE TABLE IF NOT EXISTS consultation (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255))";

  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("table created or already exists");
  });
});

app.post('/submit', function (req, res) {
  let sql = "INSERT INTO consultation (name, email) VALUES (?, ?)";
  let values = [req.body.name, req.body.email];

  con.query(sql, values, function (err) {
    if (err) {
      console.log(err);
      res.status(500).send('An error occurred during the query');
    } else {
      res.send('Data inserted successfully');
    }
  });
});

app.listen(3000, function () {
  console.log("Server is running on port:3000");
});
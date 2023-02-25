var express = require('express'); 
var app = express(); 
const mysql=require('mysql');
const {connect,connection}=require('./config/mySql'); 
app.use(express.static('public'));  
const bodyParser = require('body-parser')

app.use(bodyParser.json()) // for parsing application/json(it parse json data from the header)
app.use(bodyParser.urlencoded({ extended: true }))//it parse url encoded data form the header

app.get('/index.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "index.html" );  
})  
app.get('/process_get', function (req, res) {  
response = {  
       Fname:req.query.Fname,
       Lname:req.query.Lname,
       Email:req.query.Email,
       Address:req.query.Address
   };  
   console.log(response);  
   res.end(JSON.stringify(response));  
})  

app.post('/process_get',(req,res)=>{
   console.log(req.body);
   const {Fname,Lname,Email,Address}=req.body;
   const sql = "INSERT INTO curedtable (Fname,Lname, Email,Address) VALUES (?, ?,?,?)";
   const values=[Fname,Lname,Email,Address];
   connection.query(sql, values, (err, result) => {
      if (err) throw err;
      console.log("Data inserted into database");
    });
})



var server = app.listen(8080, function () {  
  
  var host = server.address().address  
  var port = server.address().port  
  console.log("Example app listening at http://%s:%s", host, port);
})  
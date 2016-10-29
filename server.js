var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var bodyParser = require('body-parser');


var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/login', urlencodedParser, function (req, res) {
  if (!req.body) 
   return res.sendStatus(400);
   else
     res.send('welcome, ' + req.body.username);
});

app.use(morgan('combined'));

var config = {
    user:'harishkondakindi',
    database:'harishkondakindi',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
    
};

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db',function(req,res){
    pool.query('select * from detail_shop',function (err,result){
       if(err){
           res.status(500).send(err.toString());
       }else{
           res.send(JSON.stringify(result.rows));
       }
    });
});

app.get('/ui/page.css',function(req,res) {
    res.sendFile(path.join(__dirname,'ui','page.css'));
});

app.get('/ui/video1.mp4',function(req,res) {
   res.sendFile(path.join(__dirname,'ui','video1.mp4')); 
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

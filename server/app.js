var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var routes = require('./routes');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// 跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");//预检请求使用
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");//预检请求使用
    next();
});

function read(path) {
  return new Promise((res, rej) => {
    fs.readFile(path, 'utf8' , (err,data) => {
      if (err) {
        rej(err)
      } else {
        res(data)
      }
    })
  })
}


app.get('/',async (req, res) => {
  var resHtml = await read('./index.html');
  res.send(resHtml);
})


routes(app);
app.set('port', process.env.PORT || 3009);
app.listen(app.get('port'), '127.0.0.1' , function() {
  console.log('Express server listening on port ' + app.get('port'));
});


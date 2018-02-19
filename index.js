var argv = require('optimist').argv;
var config = require('./config')(argv);
var fs = require('fs');
var path = require('path');
var http = require("http");
var https = require('https');
var cert = fs.readFileSync('ennismightier_ssl_key.pfx');
var credentials = {pfx: cert, passphrase: config.SESSION_SECRET};
var express = require('express');
var app = express();

app.use(express.cookieParser(config.SESSION_SECRET));
app.use(express.cookieSession({auth_code: null}));

app.use(express.logger('dev'));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded());
app.use(express.errorHandler({dumpExceptions: true, showStack:true}));
app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('ejs').renderFile);

function NavToPage(page) {
  return function(req, res) {
    if (req.session.auth_code != config.TESTTOKEN) {
      if (config.ENVIRONMENT == 'Test' && 
      req.query.tt != config.TESTTOKEN) {
        res.send('Unauthorized Access');
        return;
      }
      req.session.auth_code = config.TESTTOKEN;
    }
    res.render(page);
  };
}

app.get('/', NavToPage('main.html'));

app.get('*', 
  function(req, res)
  {
    res.send('404 Not Found At All');
  }
);

if (config.ENVIRONMENT == 'dev') {
  var httpServer = http.createServer(app);
  httpServer.listen(config.PORT);
} else {
  var httpsServer = https.createServer(credentials, app);
  httpsServer.listen(config.PORT);
}

console.log('Listening on port ' + config.PORT);

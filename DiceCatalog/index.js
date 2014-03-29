var path = require("path");
var express = require("express");
var app = express();

if (!process.env.PORT) {
    process.env.PORT = 8080;   
}

app.use(express.logger('dev'));
app.use(express.static(path.join(__dirname, "views")));
app.use(express.urlencoded());
app.set('views', path.join(__dirname, "views"));

app.engine("html", require("ejs").renderFile);

app.get("/", 
    function(req, res) {
        res.render("main.html");    
    }
);

app.get("*", 
    function(req, res)
    {
        res.send("404 Not Found");
    }
);

app.listen(process.env.PORT);
console.log("Listening on port " + process.env.PORT);

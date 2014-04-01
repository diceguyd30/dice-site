var util = require("util");
var spawn = require("child_process").spawn;
var child;
var path = require("path");
var express = require("express");
var app = express();

//Set up the port variable if we aren't in the c9.io IDE
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
        res.render("placeholder.html");    
    }
);

app.get("/test", 
    function(req, res) {
        res.render("main.html");    
    }
);

app.get("/deploy",
    function(req, res) {
        var result = 
            function(error, stdout, stderr) { 
                if (!error)
                {
                    res.send("Deployed");
                }
                else
                {
                    res.send("Something went wrong! \\n");
                    res.send(stdout);
                }
            };
        try
        {
            child = spawn("deploy", result);
        } catch (e) {}
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

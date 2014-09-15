var argv = require("optimist").argv;
var config = require("./config")(argv);
var path = require("path");
var express = require("express");
var app = express();

app.use(express.cookieParser(config.SESSION_SECRET));
app.use(express.cookieSession({isAuthorized: false}));
app.use(app.router);

app.use(express.logger('dev'));
app.use(express.static(path.join(__dirname, "views")));
app.use(express.urlencoded());
app.set('views', path.join(__dirname, "views"));

app.engine("html", require("ejs").renderFile);

function NavToPage(page) {
    return function(req, res) {
        if (!req.session.isAuthorized) {
            if (config.ENVIRONMENT == 'Test' && 
            req.query.tt != config.TESTTOKEN) {
                res.send("Unauthorized Access");
                return;
            }
            req.session.isAuthorized = true;
        }
        res.render(page);
    };
}

app.get("/", NavToPage("main.html"));

app.get("*", 
    function(req, res)
    {
        res.send("404 Not Found");
    }
);

app.listen(config.PORT);
console.log("Listening on port " + config.PORT);

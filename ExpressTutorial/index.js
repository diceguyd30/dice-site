var path = require('path');
var express = require('express');
var app = express();

// Log the requests
app.use(express.logger('dev'));

// Serve static files
app.use(express.static(path.join(__dirname, 'views')));
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());

// Main page handler
app.get('/',
    function(req, res) {
        res.render('main.html');    
    }
);

// Handle requests for a single book
app.get('/books/:id', 
	function(req, res){
		renderBook(res, req.params.id);
	}
);

app.post('/bookSearch',
    function(req, res) {
        var bookNum = req.body.bookNum;
        renderBook(res, bookNum);
    }
);

function renderBook(res, num) {
    var bookData = {title: "the name of the book", author: "some writer", number: num};
	res.render('bookView.ejs', {book: bookData});
}

// Handle request for a list of all books
app.get('/books', 
	function(req, res) {
		res.send('A list of books should go here');
	}
);

app.post("/search",
	function(req, res) {
		var searchText = req.body.searchText;
		res.send("<p>Your search for <b>" + searchText + "</b> returned no results</p>");
	}
);
	
// Route for everything else
app.get('*', 
	function(req, res) {
			res.send('Hello World');
	}
);

// Fire it up!
app.listen(process.env.PORT);
console.log('Listening on port ' + process.env.PORT);
// require express
var express = require("express");
// create the express app
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))


// app.set('views', path.join(__dirname, './views'));
// root route to render the index.ejs view
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
    // Might want to initialize each session variable
    // But still works without initializing it 
    res.render("index");
})
app.post('/survey', function(req, res) {
    req.session.name = req.body.name;
    req.session.location = req.body.location;
    req.session.language = req.body.language;
    req.session.comment = req.body.comment;
    console.log(req.session.name);

    res.redirect("/results");
})
app.get('/results', function(req, res) {

    context = {
        name: req.session.name,
        location: req.session.location,
        language: req.session.language,
        comment: req.session.comment
    }
    
    res.render("results", context);
})
// tell the express app to listen on port 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});
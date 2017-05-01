var express = require('express'),
    session = require('express-session'),
    bodyParser = require("body-parser"),
    logger = require("express-logger"),
    cookieParser = require("cookie-parser"),
    flash = require("connect-flash"),
    mongoose = require("mongoose"),
    pages = require("./controllers/pages.js");

var app = express();

app.locals.pretty = true;
var sessionStore = new session.MemoryStore;

// configuration
app.set('port', process.env.PORT || 3000);
app.set('views', './views');
app.set('view engine', 'pug');

//Middleware
app.use(express.static('./public'));
app.use(logger({path: "logfile.txt"}));
app.use(bodyParser.urlencoded({extended: false})); // for parse post body
app.use(cookieParser('keyboard cat'));
app.use(session({
    cookie: {maxAge: 60000},
    store: sessionStore,
    saveUninitialize: true,
    resave: true,
    secret: 'secret'
}));
app.use(flash());

//Mongoose API http://mongoosejs.com/docs/api.html
mongoose.Promise = global.Promise;
mongoose.connect(process.env.IP + "/local");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', function() {
  console.log("Connected to MongoDB @" + process.env.IP + "/local");
});
db.on("SIGINT", function() {
  console.log('MongoDB disconnected due to Application Exit');
  process.exit(0);
});

app.use(function(req, res, next){
    res.locals.success = req.flash('success');
    res.locals.errors = req.flash('error');
    next();
});

//assign routes
app.get('/', pages.index);
app.get('/about', pages.about);
app.get('/pages', pages.index);
app.get('/pages/create', pages.createForm);
app.post('/pages/create', pages.createSave);
app.get('/pages/update/:id', pages.update);
app.post('/pages/update/:id', pages.updateSave);
app.get('/pages/view/:id', pages.view);
app.get('/pages/delete/:id', pages.delete);
app.post('/pages/search', pages.search);

// start the app
app.listen(process.env.PORT, function() {
    console.log('Connected on port ' + process.env.PORT + '!');
});

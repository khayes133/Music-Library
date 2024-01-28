const cors = require('cors');
const express = require('express');
const session = require('express-session');
const mongodb = require('./data/database');
const passport = require('passport');

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

const app = express();
port = process.env.port || 8080;

app.use(cors());
app.use(express.json());
app.use(session({ 
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if(err) {
        console.log(err)
    } else {
        app.listen(port, () => { console.log('database listening on ' + port)});
    }
})

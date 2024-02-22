const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const GithubStrategy = require('passport-github2').Strategy;

const api = express();
const mongodb = require('./data/database');

// API 'use' Setup
api.use(bodyParser.json());
api.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    })
);
api.use(passport.initialize());
api.use(passport.session());
api.use(
    cors({
        methods: ['POST', 'PUT', 'GET', 'DELETE'],
        origin: '*',
        allowedHeaders: [
            'Origin',
            'X-Requested-With',
            'Content-Type',
            'Accept',
            'Z-Key',
            'Authorization',
        ],
    })
);
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

// My Routes
api.use('/', require('./routes'));

// Passport Setup
passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }
    )
);
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Passport Routes
api.get('/', (req, res) => {
    res.send(
        req.session.user !== undefined
            ? `Logged in as ${req.session.user.displayName}`
            : 'Logged Out'
    );
});
api.get(
    '/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/api-docs',
        session: false,
    }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);

// Exception Catch
process.on('uncaughtException', (err, origin) => {
    console.log(
        process.stderr.fd,
        `Caught exception: ${err}\nException origin: ${origin}`
    );
});


port = process.env.port || 8080;

mongodb.initDb((err) => {
    if(err) {
        console.log(err)
    } else {
        api.listen(port, () => { console.log('database listening on ' + port)});
    }
})
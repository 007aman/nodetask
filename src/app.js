import express from 'express';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSanitizer from 'express-sanitizer';
import helmet from 'helmet';

export default {
    setup: (config) => {
        const app = express();
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json({limit: '50mb'}));
        app.use(cookieParser(config.app.secret));
        app.use(session({ secret: config.app.secret ,resave: true, saveUninitialized:true}));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(expressSanitizer());
        app.use(helmet());
        app.use(helmet.hsts({ maxAge: 0 }))
        return app;
    }
}
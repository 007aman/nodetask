import passport from 'passport';

export var jwtStrategy = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err && err == 'expired'){ return res.status(500).json({ errors: ['Session is expired']})};
        if (err && err == 'invalid'){ return res.status(500).json({ errors: ['Invalid token recieved']})};
        if (err && err == 'user'){ return res.status(500).json({ errors: ['Invalid user recieved']})};
        if (err && Object.keys(err).length) { return res.status(500).json({ errors: [ err ]}); }
        if (err) { console.log(err); return res.status(500).json({ errors: [ 'Invalid user recieved' ]}); }
        if (!user) { return res.status(500).json({ errors: ['Invalid user recieved']})};
        console.log(user);
        req.user = user;
        next();
    })(req, res, next);
};

export var localStrategy = (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err && err == 'invalid') { return res.status(500).json({ errors: ['Email Id not verified']}); }
        if (err && err == 'attempt') { return res.status(500).json({ errors: ['Too many invalid attempts. Please reset your password.']}); }
        if (err && err.startsWith('attempt:')) { return res.status(500).json({ errors: ['Invalid Credentials (' + err.split(':')[1]+' Attempt(s) Left)']}); }
        if (err) { return res.status(500).json({ errors: [ err ]}); }
        if (!user) { return res.status(500).json({ errors: ['Invalid Credentials']}); }
        req.user = user;
        next();
    })(req, res, next);
};
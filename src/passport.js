import config from './config';
import passport from 'passport';
import bcrypt from 'bcrypt-nodejs';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';

var TokenExtractor = function(req){
    var token = null;
    if(req && req.headers && req.headers['authorization']){
        token = req.headers['authorization'].split(" ")[1];
        console.log(token);
    }
    return token;
}

passport.use(new JwtStrategy({
    jwtFromRequest : TokenExtractor,
    secretOrKey : config.app.secret,
    }, async (payload, done) => {
        try{
            const user = await db.User.findOne({ '_id': payload.sub });
            if(!user){
                return done('user', false);
            }

            if(new Date(payload.exp) < new Date()){
                return done('expired', false);
            }
            done(null, user);
        }catch(error){
            done(error, false);
        }
    }
));

passport.use(new LocalStrategy({
        usernameField: 'email'
    }, async (email, password, done) => {
        try{
            db.User.findOne({ 'email': email })
            .then(user => {
                if (!user.is_active) {
                    throw 'invalid';
                }else {
                    return [bcrypt.compareSync(password, user.password), user];
                }
            })
            .then(([isMatch, user]) => {
                if (!isMatch) {
                    throw 'password';
                }else{
                    done(null, user);
                }
            })
            .catch(err => {
                return done(err, false);
            });
        }catch(error){
            done(error, false);
        }
    }
));
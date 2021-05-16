import JWT from 'jsonwebtoken';
import config from '../../../config';

var JWTSign = function (iss, user, date) {
    return JWT.sign({
        iss: config.app.name + '-' + iss,
        sub: user.id,
        iat: date.getTime(),
        exp: new Date().setMinutes(date.getMinutes()+60)
    }, config.app.secret);
}

export default {
    async login(req, res){
        console.log(JSON.stringify(req.user));
        var date = new Date();
        var token = JWTSign('USER', req.user, date);
        const data ={
            id:req.user.id,
            fitstName:req.user.firstName,
            lastName:req.user.lastName,
            email:req.user.email,
            phone:req.user.phone,
            token:token

        }
        res.status(200).json({ success: true , message: 'Login successfully', data: data });
    },

    async register(req, res, next){
        const {firstName,lastName,email,phone,password} = req.body
        db.User.findOne({ 'email': email })
        .then(user => {
            if(user){
                throw new RequestError('Email already registered');
            }
            else{
                return db.User.create({
                    is_active: true,
                    first_name: firstName,
                    last_name: lastName,
                    phone: phone,
                    email: email,
                    password:password,
                })
            }
        })
        .then(user => {
            res.status(200).json({ success: true,message:'Registered successfully', user: user });
        })
        .catch(err => {
            console.log(err);
            next(err);
        })

    }
};
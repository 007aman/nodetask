export var loginCheck = () => {
    return (req, res, next) => {
        var token = null;   
        if (req && req.cookies) token = req.cookies['XSRF-token'];
        if(token != null) return res.redirect('/');
        next();
    }
}
const jwt = require('jsonwebtoken')

const auth = async function(req, res, next){
    let token = req.headers['x-Auth-Token']
    if(!token) token = req.headers['x-auth-token']
    
    if(!token) return res.send({status: false, msg: "Token must be present"})
    
    let decodeToken = jwt.verify(token, "functionup-plutonium-very-very-secret-key")
    if(!decodeToken) return res.send({status: false, msg: "Invalid Token"})
    next()
}

module.exports.auth = auth;
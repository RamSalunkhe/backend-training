const jwt = require('jsonwebtoken')
const userModel = require("../models/userModel")

const authenticate = async function(req, res, next) {
  //check the token in request header
  try {
    let token = req.headers['x-auth-token'];
    if (!token) return res.status(401).send("Token must be present in headers");
  
    //verify token
    let decodeToken = jwt.verify(token, "functionup-plutonium");
    if (!decodeToken) return res.send("Invalid Token");
    req.decodeToken = decodeToken;
  
    //verify user exists or not
    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    req.user = user;
    if (!user) {
      return res.status(404).send("No such user exists");
    }
      next()
  }
  catch(err) {
    res.status(500).send({error: err.message})
  }
  }

const authorise = function(req, res, next) {
    // comapre the logged in user's id and the id in request
    try {
      let loggedInUser = req.decodeToken.userId;
      let userToBeModified = req.params.userId;
      req.loggedInUser = loggedInUser;
    
      if (loggedInUser != userToBeModified)
        return res.status(403).send("User logged is not allowed to modify the requested users data");
      next()
    }
    catch(err) {
      res.status(500).send({msg: "server error"})
    }
}

module.exports.authenticate = authenticate
module.exports.authorise = authorise
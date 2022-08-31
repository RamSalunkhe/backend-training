const jwt = require('jsonwebtoken')
const userModel = require("../models/userModel")

const authenticate = async function(req, res, next) {
  //check the token in request header
  let token = req.headers['x-auth-token'];
  if (!token) return res.send("Token must be present in headers");

  //verify token
  let decodeToken = jwt.verify(token, "functionup-plutonium");
  if (!decodeToken) return res.send("Invalid Token");
  req.decodeToken = decodeToken;

  //verify user exists or not
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  req.user = user;
  if (!user) {
    return res.send("No such user exists");
  }

    next()
}


const authorise = function(req, res, next) {
    // comapre the logged in user's id and the id in request
    let loggedInUser = req.decodeToken.userId;
    let userToBeModified = req.params.userId;
  
    if (loggedInUser != userToBeModified)
      return res.send("you don't have access to modify others data");
  
    next()
}

module.exports.authenticate = authenticate
module.exports.authorise = authorise
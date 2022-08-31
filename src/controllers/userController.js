const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  let data = req.body;
  let savedData = await userModel.create(data);
  console.log(req.newAtribute);
  res.send({ msg: savedData });
};

const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({
      status: false,
      msg: "username or the password is not corerct",
    });

  // Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret
  // The same secret will be used to decode tokens
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "plutonium",
      organisation: "FUnctionUp",
    },
    "functionup-plutonium"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, msg: "logged in Successfully", data: token });
};

const getUserData = async function (req, res) {
  // let token = req.headers["x-auth-token"];
  // if (!token) return res.send({ status: false, msg: "token must be present" });
  // console.log(token);

  // If a token is present then decode the token with verify function
  // verify takes two inputs:
  // Input 1 is the token to be decoded
  // Input 2 is the same secret with which the token was generated
  // Check the value of the decoded token yourself
  // let decodedToken = jwt.verify(token, "functionup-plutonium");
  // if (!decodedToken)
  //   return res.send({ status: false, msg: "token is invalid" });

  // Authorization if the login user and the requested user is same or not
  // let requestedUser = req.params.userId;
  // let loggedInUser = decodedToken.userId;
  // console.log(loggedInUser);

  // if (requestedUser != loggedInUser)
  //   return res.send("you can't access other's data");
  // let userDetails = await userModel.findById(req.params.userId);
  // if (!userDetails)
  //   return res.send({ status: false, msg: "No such user exists" });
  if(req.user.isDeleted == false){
    res.send({ status: true, data: req.user});
  }else{
    res.send("his user is deleted")
  }
};

const updateUser = async function (req, res) {
  //verify token is present or not
  let token = req.headers["x-auth-token"];
  if (!token) return res.send("Token must be present in headers");

  //verify user exists or not
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if (!user) {
    return res.send("No such user exists");
  }
  //verify token
  let decodeToken = jwt.verify(token, "functionup-plutonium");
  if (!decodeToken) return res.send("Invalid Token");

  // verify data to be modified is of logged in user's or not
  let loggedInUser = decodeToken.userId;
  let userToBeModified = req.params.userId;

  if (loggedInUser != userToBeModified)
    return res.send("you don't have access to modify others data");

  if (user.isDeleted == false) {
    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      userData,
      { new: true }
    );
    res.send({ status: updatedUser, data: updatedUser });
  } else {
    res.send("you can't update deleted user");
  }
};

const postMessage = async function (req, res) {
  let token = req.headers["x-auth-token"];
  if (!token)
    return res.send({
      status: false,
      msg: "token must be present in the request header",
    });
  let decodedToken = jwt.verify(token, "functionup-plutonium");

  if (!decodedToken)
    return res.send({ status: false, msg: "token is not valid" });

  //userId for which the request is made. In this case message to be posted.
  let userToBeModified = req.params.userId;
  //userId for the logged-in user
  let userLoggedIn = decodedToken.userId;

  //userId comparision to check if the logged-in user is requesting for their own data
  if (userToBeModified != userLoggedIn)
    return res.send({
      status: false,
      msg: "User logged is not allowed to modify the requested users data",
    });

  let user = await userModel.findById(req.params.userId);
  if (!user) return res.send({ status: false, msg: "No such user exists" });

  let message = req.body.message;
  let updatedPosts = user.posts;
  //add the message to user's posts
  updatedPosts.push(message);
  let updatedUser = await userModel.findOneAndUpdate(
    { _id: user._id },
    { posts: updatedPosts },
    { new: true }
  );

  //return the updated user document
  return res.send({ status: true, data: updatedUser });
};

const deleteUser = async function (req, res) {
  let token = req.headers["x-auth-token"];
  if (!token) return res.send("Token must be present in headers");

  let user = req.params.userId;
  let userDetails = await userModel.findById(user);
  if (!userDetails) return res.send("No such user exists");

  const decodeToken = jwt.verify(token, "functionup-plutonium");

  const loggedInuser = decodeToken.userId;
  const userToBeDeleted = user;

  if (loggedInuser != userToBeDeleted)
    return res.send("you can't delete someone else profile");
  const delUser = await userModel.findOneAndUpdate(
    user,
    { isDeleted: true },
    { new: true }
  );
  res.send({ msg: "user deleted", data: delUser });
};

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.postMessage = postMessage;
module.exports.deleteUser = deleteUser;

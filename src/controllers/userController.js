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
  // here req.user attribute is inherit from middleware (function => authenticate function)
  // which indicates user from request params
  if (req.user.isDeleted == false) {
    let user = await userModel.findById(req.loggedInUser)
    res.send({ status: true, data: user });
  } else {
    res.send("This user is deleted");
  }
};

const updateUser = async function (req, res) {
  if (req.user.isDeleted == false) {
    let userData = req.body;
    let updatedUser = await userModel.findOneAndUpdate(
      { _id: req.loggedInUser},
      userData,
      { new: true }
    );
    res.send({ data: updatedUser });
  } else {
    res.send("you can't update deleted user");
  }
};

const postMessage = async function (req, res) {
  if (req.user.isDeleted == false) {
    let message = req.body.message;
    let updatedPosts = req.user.posts; // req.user is from middleware
    //add the message to user's posts
    updatedPosts.push(message);
    let updatedUser = await userModel.findOneAndUpdate(
      { _id: req.loggedInUser },
      { posts: updatedPosts },
      { new: true }
    );
    return res.send({ status: true, data: updatedUser });
  } else {
    return res.send("This user is deleted");
  }
};

const deleteUser = async function (req, res) {
  if (req.user.isDeleted == false) {
    const delUser = await userModel.findOneAndUpdate(
      {_id: req.loggedInUser},
      { isDeleted: true },
      { new: true }
    );
    res.send({ msg: "user deleted", data: delUser });
  } else {
    return res.send("This user is already deleted");
  }
};

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.postMessage = postMessage;
module.exports.deleteUser = deleteUser;

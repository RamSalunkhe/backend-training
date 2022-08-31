const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
try {
    let data = req.body;
    let savedData = await userModel.create(data);
    res.status(201).send({ msg: savedData });
}
catch(err) {
    res.status(500).send({error: err.message})
}
    
};

const loginUser = async function (req, res) {
try {
    let userName = req.body.emailId;
    let password = req.body.password;
    let user = await userModel.findOne({ emailId: userName, password: password });
    if (!user)
      return res.status(400).send({
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
    res.status(200).send({ status: true, msg: "logged in Successfully", data: token });
}
catch(err) {
    res.status(404).send({error: err.message})
}
};

const getUserData = async function (req, res) {
  // here req.user attribute is inherit from middleware (function => authenticate function)
  // which indicates user from request params
  try {
      if (req.user.isDeleted == false) {
        let user = await userModel.findById(req.loggedInUser)
        res.status(200).send({ status: true, data: user });
      } else {
        res.status(200).send("This user is deleted");
      }
  } catch (err) {
        res.status(404).send({error: err.message})
  }
};

const updateUser = async function (req, res) {
try {
    if (req.user.isDeleted == false) {
      let userData = req.body;
      let updatedUser = await userModel.findOneAndUpdate(
        { _id: req.loggedInUser},
        userData,
        { new: true }
      );
      res.status(200).send({ data: updatedUser });
    } else {
      res.status(200).send("you can't update deleted user");
    }
} 
catch(err) {
    res.status(404).send({error: err.message})
}
};

const postMessage = async function (req, res) {
try {
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
      return res.status(201).send({ status: true, data: updatedUser });
    } else {
      return res.status(200).send("This user is deleted");
    }
}
catch(err) {
    res.status(404).send({error: err.message})
}
};

const deleteUser = async function (req, res) {
try {
    if (req.user.isDeleted == false) {
      const delUser = await userModel.findOneAndUpdate(
        {_id: req.loggedInUser},
        { isDeleted: true },
        { new: true }
      );
      res.status(200).send({ msg: "user deleted", data: delUser });
    } else {
      return res.status(200).send("This user is already deleted");
    }
}
catch(err) {
    res.status(404).send({error: err.message})
}
};

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.postMessage = postMessage;
module.exports.deleteUser = deleteUser;

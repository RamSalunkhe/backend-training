const validate = function (req,res,next){
  const appUser = req.headers['isfreeappuser']
  
 if(!appUser){
     res.send("please, enter isFreeAppUser property in header")
  }

  req['isAppFree'] = (appUser == 'true')? Boolean(true):Boolean(false);
  next()
}
module.exports.validate = validate





const mid2 = function (req, res, next) {

  next();
};

const mid3 = function (req, res, next) {
  console.log("Hi I am a middleware named Mid3");
  next();
};

const mid4 = function (req, res, next) {
  console.log("Hi I am a middleware named Mid4");
  next();
};

// module.exports.checkIsFreeAppUser = checkIsFreeAppUser;
module.exports.mid2 = mid2;
module.exports.mid3 = mid3;
module.exports.mid4 = mid4;

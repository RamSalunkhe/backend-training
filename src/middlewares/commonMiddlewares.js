
const mid1= function ( req, res, next) {
    console.log("Hi I am a middleware named Mid1")
    // logic
    let data = req.headers.isfreeappuser
    console.log(data);
    if(!data){
        res.send("This is required")
    }
    next()
}
    

const mid2= function ( req, res, next) {
    let data = req.body.isFreeAppUser
    if(!data){
        console.log("This is mandatory");
    }
    next()
}

const mid3= function ( req, res, next) {
    console.log("Hi I am a middleware named Mid3")
    next()
}

const mid4= function ( req, res, next) {
    console.log("Hi I am a middleware named Mid4")
    next()
}

module.exports.mid1= mid1
module.exports.mid2= mid2
module.exports.mid3= mid3
module.exports.mid4= mid4

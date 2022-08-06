const express = require('express');
const abc = require('../introduction/intro')
const welcome = require('../logger/logger')
const date = require('../util/helper')
const str = require('../validator/formatter')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    welcome.welcome()
    date.date()
    console.log(date.month())
    date.info()
    console.log(str.trim())
    console.log(str.lower());
    console.log(str.upper());
    res.send('My First ever api!')
});


router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data',function(req, res){

})
module.exports = router;
// adding this comment for no reason
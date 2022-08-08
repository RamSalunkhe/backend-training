const express = require('express');
const abc = require('../introduction/intro')
const welcome = require('../logger/logger')
const date = require('../util/helper')
const str = require('../validator/formatter')
const lodashModule = require('lodash')
const router = express.Router();

const month = ['january','february','march','april','may','june','july','august','septmber','octomber','november','december'];
const oddArr = [1,3,5,7,9,11,13,17,19,23];
const pairsOfcity = [['horror','The Shining'],['drama','Titanic'],['thriller','Shutter Island'],['fantasy','Pans Labyrinth']];


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
    console.log(lodashModule.chunk(month,4))
    console.log(lodashModule.tail(oddArr));
    const result = lodashModule.union([1,2],[2,3,4],[3,4,5]);
    console.log(result);
    console.log(lodashModule.fromPairs(pairsOfcity));
    res.send('My First ever api!')
});


router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data',function(req, res){

})
module.exports = router;
// adding this comment for no reason
const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')
const {default:mongoose} = require('mongoose');

const router = express.Router();

router.get('/test-me', function (req, res) {
    myHelper.printDate()
    myHelper.getCurrentMonth()
    myHelper.getCohortData()
    let firstElement = underscore.first(['Sabiha','Akash','Pritesh'])
    console.log('The first element received from underscope function is '+firstElement)
    res.send('My first ever api!')
});

router.get("/movies",function(req,res){
    const movies = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    return res.send(movies);
})

router.get("/movies/:indexNumber", function(req, res){
    const movies = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    console.log(req.params.indexNumber)
    let movieIndex = req.params.indexNumber
    //check index value. less than 0 or greater than array (length - 1) are not valid
    if(movieIndex<0 || movieIndex>=movies.length) {
        //if the index is invalid send an error message
        return res.send('The index value is not correct, Please check the it')
    }
    //if the index was valid send the movie at that index in response
    let requiredMovie = movies[movieIndex]
    res.send(requiredMovie)
})
  
router.get("/shoes", function(req, res){
    let queryParams = req.query
    let brand = queryParams.brand
    res.send("dummy response")
})

// uses query params
router.get('/candidates', function(req, res){
    console.log('Query paramters for this request are '+JSON.stringify(req.query))
    let gender = req.query.gender
    let state = req.query.state
    let district = req.query.district
    console.log('State is '+state)
    console.log('Gender is '+gender)
    console.log('District is '+district)
    let candidates = ['Akash','Suman']
    res.send(candidates)
})

// use path param
router.get('/candidates/:canidatesName', function(req, res){
    console.log('The request objects is '+ JSON.stringify(req.params))
    console.log('Candidates name is '+req.params.canidatesName)
    res.send('Done')
})

router.get("/films", function(req, res){
    const films = [ {
        "id": 1,
        "name": "The Shining"
       }, {
        "id": 2,
        "name": "Incendies"
       }, {
        "id": 3,
        "name": "Rang de Basanti"
       }, {
        "id": 4,
        "name": "Finding Nemo"
       }]
       //send all the films
      res.send(films) 
})

router.get("/films/:filmId", function(req, res){
    const films = [ {
        "id": 1,
        "name": "The Shining"
       }, {
        "id": 2,
        "name": "Incendies"
       }, {
        "id": 3,
        "name": "Rang de Basanti"
       }, {
        "id": 4,
        "name": "Finding Nemo"
       }]

       let filmId = req.params.filmId
       //iterate all the films
       //search for a film whose id matches with the id recevied in request
       for(let i = 0; i < films.length; i++){
           let film = films[i]
           if(film.id == filmId) {
               //if there is a match return the response from here
               return res.send(film)
           }
       }

       //if there is no match give an error response
       res.send("The film id doesn't match any movie")
})

router.get("/sol1",function(req, res){
    let arr = [1,2,3,5,6,7];
    let sum = 0;
    for(let x in arr) {
        sum += arr[x];
    }

    let lastDigit = arr.pop();
    let consecutiveSum = lastDigit * (lastDigit+1) / 2;
    let missingNum = consecutiveSum - sum;

    return res.send({ data: missingNum});

})

router.get("/sol2",function(req, res){
    let arr = [33,34,35,37,38];
    let sum = 0;
    let len = arr.length;
    
    for(let x in arr) {
        sum += arr[x];
    }
    
    let startNum = arr[0];
    let lastNum = arr.pop();

    let consecutiveSum = (len+1) * (startNum + lastNum) / 2;
    let missingNum = consecutiveSum - sum;
    res.send({data: missingNum});
})

/////////////// POST REQUEST ASSIGNMENT //////////////////////////////////////////

let players =
   [
       {
           "name": "manish",
           "dob": "1/1/1995",
           "gender": "male",
           "city": "jalandhar",
           "sports": [
               "swimming"
           ]
       },
       {
           "name": "gopal",
           "dob": "1/09/1995",
           "gender": "male",
           "city": "delhi",
           "sports": [
               "soccer"
           ],
       },
       {
           "name": "lokesh",
           "dob": "1/1/1990",
           "gender": "male",
           "city": "mumbai",
           "sports": [
               "soccer"
           ],
       },
   ]

   router.post('/players', function (req, res) {

       let newPlayer = req.body
       let newPlayerName = newPlayer.name;
       let isNameRepeated = false;

       for(let i = 0; i<players.length; i++) {
            if(players[i].name == newPlayerName){
            isNameRepeated = true;
            break;
        }
    }

    if(isNameRepeated){
        res.send("This player is already Existed");
    } else {
        players.push(newPlayer)
        res.send(players)
    }
    
   })

////////////////////// Assignment 05 ////////////////////////////

let persons =[
    {
        name: "PK",
        age: 10,
        votingStatus: false
    },
    {
        name: "SK",
        age: 20,
        votingStatus: false
    },
    {
        name: "AA",
        age: 70,
        votingStatus: false
    },
    {
        name: "SC",
        age: 5,
        votingStatus: false
    },
    {
        name: "HO",
        age: 40,
        votingStatus: false
    }
]

router.post("/getVotingStatus",function(req, res){
    let votingAge = req.query.age;
    let eligiblePerson = [];
    for(let i = 0; i<persons.length; i++) {
        if(persons[i].age > votingAge) {
            persons[i].votingStatus = true;
            eligiblePerson.push(persons[i]);
        }
    }
    res.send({person: eligiblePerson, status: true})
})





/////////////////// Mongo DB ///////////////////////////////////

mongoose.connect("mongodb+srv://Ram:pqr%4012345@cluster0.kmazbqk.mongodb.net/RamKaDB?retryWrites=true&w=majority",{
    useNewurlparser:true
}) 
.then( ()=> console.log("Mongodb is connected"))
.catch(  err => console.log(err))




module.exports = router;
// adding this comment for no reason
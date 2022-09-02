let axios = require('axios');

let getSortedCities = async function (req, res) {

try {
        let cities = ["Bengaluru","Mumbai","Delhi","Kolkata", "Chennai","London","Moscow"]
    let cityObjArray=[];

    for(let i = 0; i<cities.length; i++) {
        let obj = { city: cities[i] } // {city: "Benguluru"}
        let resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=a0031e962a9881c2f2783a4ed3ed410f`)
        console.log(resp.data.main.temp)

        obj.temp = resp.data.main.temp // {city: "Benguluru", temp: "298.4"}
        cityObjArray.push(obj)
    }

    let sorted = cityObjArray.sort(function (a, b) {return a.temp - b.temp})
    console.log(sorted);
    res.status(200).send({status: true, data: sorted})
}
catch (error) {
    console.log(error);
    res.status(500).send({status: false, msg:"server error"})
}
}

module.exports.getSortedCities = getSortedCities;
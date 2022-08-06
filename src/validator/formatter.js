const trim = () => { 
    let str = "          function       Up       ";
    let result = str.trim();
    return result;
}

const changetoLowerCase = () => {
    let str = "Hello, My Name is RaM and i am in Plutonium BATCH";
    let result = str.toLowerCase();
    return result;
u}

const changeToUpperCase = function () {
    let str = "Hello, My Name is RaM and i am in Plutonium BATCH";
    let result = str.toUpperCase();
    return result;
}

module.exports.trim = trim;
module.exports.lower = changetoLowerCase;
module.exports.upper = changeToUpperCase;
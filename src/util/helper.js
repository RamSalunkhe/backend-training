let today = new Date();
function printDate (){
   let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()
   console.log(date);
  }

const printMonth = () => {
    let month = today.getMonth()+1;
    return month;
}

const getBatchInfo = () => { console.log('Plutonium, W3D5, the topic for today is Node.js module system')};


module.exports.date = printDate;
module.exports.month = printMonth;
module.exports.info = getBatchInfo;
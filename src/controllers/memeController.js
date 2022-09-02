const axios = require('axios');

let memeHandler = async function (req, res) {
    try {
        let memeId = 188390779;
        let text0 = "FunctionUp";
        let text1 = "Yes";
        let options = {
            method: "post",
            url: `https://api.imgflip.com/caption_image?template_id=${memeId}&text0=${text0}&text1=${text1}&username=chewie12345&password=meme@123`
        }
        let result = await axios(options)
        res.send({msg: result.data})
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ msg: err.message });
      }
}

module.exports.memeHandler = memeHandler
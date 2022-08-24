const PublisherModel = require("../models/publisherModel")

const createPublisher = async function (req, res) {
    let publisher = req.body
    let createPublisher = await PublisherModel.create(publisher);
    res.send({msg: createPublisher})
}

module.exports.createPublisher = createPublisher;
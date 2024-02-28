const {Schema, model} = require('mongoose') 

const Lands = new Schema({
    shortid: String,
    username: String,
    title: String,
    category: String,
    century: String,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    timestamp: String,
    period: String,
    facts: [{
        shortid: String,
        name: String,
        text: String,
        level: String,
        format: String,
        isTrue: Boolean
    }],
    locations: [{
        shortid: String,
        name: String,
        title: String,
        category: String,
        cords: {
            lat: Number,
            long: Number
        },
        image: String,
        likes: Number
    }]
})

module.exports = model('Lands', Lands)
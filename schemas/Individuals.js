const {Schema, model} = require('mongoose') 

const Individuals = new Schema({
    shortid: String,
    fullname: String,
    category: String,
    sex: String,
    century: String, 
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    achievement: String,
    quotes: [{
        shortid: String,
        name: String,
        text: String,
        category: String,
        rating: Number
    }],
    images: [{
        shortid: String,
        name: String,
        title: String,
        format: String,
        source: String,
        likes: Number
    }]
})

module.exports = model('Individuals', Individuals)
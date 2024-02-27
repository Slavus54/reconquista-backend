const {Schema, model} = require('mongoose') 

const Raids = new Schema({
    shortid: String,
    username: String,
    title: String,
    category: String,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    dots: [{
        lat: Number,
        long: Number
    }],
    dateUp: String,
    time: String,
    members: [{
        account_id: String,
        username: String,
        role: String
    }],
    incidents: [{
        shortid: String,
        name: String,
        text: String,
        format: String,
        race: String,
        image: String,
        cords: {
            lat: Number,
            long: Number 
        }
    }],
    topics: [{
        shortid: String,
        name: String,
        title: String,
        category: String,
        url: String,
        likes: Number
    }]
})

module.exports = model('Raids', Raids)
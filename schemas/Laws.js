const {Schema, model} = require('mongoose') 

const Laws = new Schema({
    shortid: String,
    username: String,
    title: String,
    category: String,
    location: String,
    region: String,
    size: String,
    status: String,
    rating: Number,
    versions: [{
        shortid: String,
        name: String,
        text: String,
        category: String,
        likes: Number
    }],
    issues: [{
        shortid: String,
        name: String,
        title: String,
        level: String,
        image: String,
        timestamp: String
    }]
})

module.exports = model('Laws', Laws)
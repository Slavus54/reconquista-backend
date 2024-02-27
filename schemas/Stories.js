const {Schema, model} = require('mongoose') 

const Stories = new Schema({
    shortid: String,
    username: String,
    title: String,
    category: String,
    religion: String,
    status: String,
    chapters: [{
        content: String,
        format: String,
        image: String
    }],
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    goal: String,
    card: String,
    questions: [{
        shortid: String,
        name: String,
        text: String,
        category: String,
        reply: String,
        answered: Boolean,
        likes: Number
    }],
    sharings: [{
        shortid: String,
        name: String,
        position: String,
        rating: Number,
        dateUp: String
    }]
})

module.exports = model('Stories', Stories)
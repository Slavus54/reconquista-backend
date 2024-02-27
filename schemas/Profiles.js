const {Schema, model} = require('mongoose') 

const Profiles = new Schema({
    account_id: String,
    username: String,
    password: String,
    telegram: String,
    goal: String,
    budget: Number,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    main_photo: String,
    treasures: [{
        shortid: String,
        title: String,
        category: String,
        century: String,
        image: String,
        likes: Number
    }],
    account_components: [{
        shortid: String,
        title: String,
        path: String
    }]
})

module.exports = model('Profiles', Profiles)
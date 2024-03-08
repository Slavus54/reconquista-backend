const {Schema, model} = require('mongoose') 

const Recipes = new Schema({
    shortid: String,
    username: String,
    title: String,
    cuisine: String,
    category: String,
    level: String,
    ingredients: [{
        id: String,
        label: String,
        measure: String,
        volume: Number
    }],
    url: String,
    calories: Number,
    steps: [{
        shortid: String,
        name: String,
        text: String,
        ingredient: String,
        stage: String,
        duration: Number
    }],
    cookings: [{
        shortid: String,
        name: String,
        title: String,
        receiver: String,
        image: String,
        dateUp: String,
        likes: Number
    }]
})

module.exports = model('Recipes', Recipes)
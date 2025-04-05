var mongoose = require('mongoose')

var livroSchema = new mongoose.Schema({
    _id   : Number,
    title : String,
    series : String,
    author : [{
        _id: String,
        name: String
    }],
    rating : String,
    description : String,
    language : String,
    isbn : String,
    genres : [String],
    characters : [String],
    bookFormat : String,
    edition : String,
    pages : String,
    publisher : String,
    publishDate : String,
    firstPublishDate : String,
    awards : [String],
    numRatings : String,
    ratingsByStars : [String],
    likedPercent : String,
    setting : [String],
    coverImg : String,
    bbeScore : String,
    bbeVotes : String,
    price : String,
},{ versionKey: false })

module.exports = mongoose.model('livro', livroSchema)

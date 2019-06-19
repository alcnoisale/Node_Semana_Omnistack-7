const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    imagem: String,
    autor: String,
    place: String,
    descricao: String,
    hashtags: String,
    likes: {
        type: Number,
        default: 0,
    }
}, {
    timestamps : true,
});


module.exports = mongoose.model('Post', PostSchema);
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    body: String,
    media: Array,
    username: String,
    shareContent: {type: mongoose.Types.ObjectId, ref: 'post'},
    comments: [{type: mongoose.Types.ObjectId, ref: 'comment'}],
    likes: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    shares: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    user: {type: mongoose.Types.ObjectId, ref: 'user'}

},{timestamps:true});

module.exports = mongoose.model('post',postSchema);
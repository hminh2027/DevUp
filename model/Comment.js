const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    body: {type: String,required: true},
    tag: Object,
    reply: mongoose.Types.ObjectId,
    user: {type: mongoose.Types.ObjectId, ref: 'user'},
    postId: mongoose.Types.ObjectId,
    postUserId: mongoose.Types.ObjectId
},{timestamps:true});

module.exports = mongoose.model('comment',commentSchema);
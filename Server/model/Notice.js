const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    body: String,
    username: String,
    user: {type: mongoose.Types.ObjectId, ref: 'user'},
    receivers: [mongoose.Types.ObjectId],
    url: mongoose.Types.ObjectId,
    type: String,
    text: String,
    tag: String,
    isRead: [mongoose.Types.ObjectId]
}, {timestamps:true});

module.exports = mongoose.model('notice',noticeSchema);
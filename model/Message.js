const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text: {type: String, required: true},
    media: Array,
    call: Object,
    tag: Object,
    reply: mongoose.Types.ObjectId,
    conservation: {type: mongoose.Types.ObjectId, ref: 'conservation'},
    author: {type: mongoose.Types.ObjectId, ref: 'user'},
    receivers: {type: mongoose.Types.ObjectId, ref: 'user'},
    
},{timestamps:true});

module.exports = mongoose.model('message',messageSchema);
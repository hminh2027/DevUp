const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
    code: String,
    html: String,
    css: String,
    js: String,
    name: {type: String, required: true},
    isRead: [mongoose.Types.ObjectId],
    isEditable: {type: Boolean, default: false},
    author: {type: mongoose.Types.ObjectId, ref: 'user'},
    receivers: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    
},{timestamps:true});

module.exports = mongoose.model('code',codeSchema);
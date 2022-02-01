const mongoose = require('mongoose');

const conservationSchema = new mongoose.Schema({
    receivers: {type: mongoose.Types.ObjectId, ref: 'user'},
    text: {type: String, required: true},
    media: Array,
    call: Object

},{timestamps:true});

module.exports = mongoose.model('conservation',conservationSchema);
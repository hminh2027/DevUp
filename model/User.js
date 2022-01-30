const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    tel: {type: String,default: ''},
    address: {type: String,default: ''},
    gender: {type: String,default: 'male'},
    bio: {
        type: String, 
        default: '',
        maxlength: 200
    },
    followers:[{type: mongoose.Types.ObjectId, ref: 'user'}],
    following: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    saved: [{type: mongoose.Types.ObjectId, ref: 'post'}],
    username: {
        type: String,
        minlength: 5,
        maxlength: 25,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        trim: true,
        required: true,
        unique: true
    },
    avatar:{
        type: String,
        default: 'https://res.cloudinary.com/minh2027/image/upload/v1630167071/Avatar/default-user_eic6ct.png'
    },
    background: {
        type: String,
        default: 'https://res.cloudinary.com/minh2027/image/upload/v1629258665/Avatar/default-bg_oq2znz.png'
    },
    isActive: {
        type: Boolean,
        default: false
    },

},{timestamps: true});

userSchema.methods.genAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ATKEY, {expiresIn: '1d'});
}

userSchema.methods.genRefreshToken = (payload) => {
    return jwt.sign(payload,process.env.RTKEY, {expiresIn: '30d'});
}

module.exports = mongoose.model('user',userSchema)
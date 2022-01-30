const User = require('../model/User')
const bcrypt = require('bcrypt')
const {validateUser} = require('../util/validate')

module.exports.searchUser = async (req,res) => {
    try {
        const inputFiltered = req.query.username.trim().replace(/[^a-zA-Z0-9 ]/g, '')
        const user = await User.find({username: {$regex: inputFiltered}, _id: {$ne: req.user.id}})
        .limit(10).select('username avatar id')

        return res.json({user})

    } catch (err) {
        return res.status(500).json({msg: err.message, user: []})
    }
}

// module.exports.searchFriend = async (req,res) => {
//     try {
//         const user = await User.find({_id: {$in: req.user.following}, following: req.user.id, username: {$regex: req.query.username.trim()}})
//         .limit(10).select('username avatar id')

//         return res.json({user})

//     } catch(err) {
//         return res.status(500).json({msg: err.message})
//     }
// }

module.exports.getUser = async (req, res) => {
    try {
        const ObjectId = require('mongoose').Types.ObjectId
        
        if(!ObjectId.isValid(req.params.id)) return res.status(404).json({user: null, msg: 'User not found'})

        const user = await User.findById(req.params.id).select('-password').populate('followers following', '-password')
        if(!user) return res.status(400).json({msg: 'User not found'})
        return res.json({user})

    } catch(err){
        return res.status(500).json({user: null, msg: err.message})
    }
}

module.exports.getUsers = async (req, res) => {
    try {
        const page = req.query.page * 1 || 1
        const limit = 20
        const skip = (page-1) * limit

        const result = await User.find().sort('username').skip(skip).limit(limit).select('avatar username')

        if(!result) return res.status(400).json({msg: 'No user found'})
        return res.json({result})

    } catch(err){
        return res.status(500).json({msg: err.message})
    }
}

module.exports.updateUser = async (req, res) => {
    // Validate Joi
    const {error} =  validateUser(req.body)
    if(error) return res.status(400).json({msg: error.details[0].message})
    try {
        const { avatar, username, tel, address, bio, background, gender } = req.body
        const newUser = await User.findOneAndUpdate({_id: req.user.id}, {avatar, username, tel, address, bio, background, gender}, {new: true})
        
        return res.status(200).json({
            msg:'Updated profile successfully!',
            newUser
        })

    } catch(err) {
        return res.status(400).json({msg: err.message})
    }
}

module.exports.followUser = async (req, res) => {
    if(req.params.id == req.user.id) return res.status(500).json({msg: 'Can not follow yourself'})
    try {
        const user = await User.find({_id: req.params.id, followers: req.user.id})
        if(user.length>0) return res.status(500).json({msg: 'You have followed this user!'})

        // update the enemy user
        const newUser = await User.findOneAndUpdate({_id: req.params.id}, { 
            $push: {followers: req.user.id}
        }, {new: true}).populate("followers following", "-password")
        // update own user
        await User.findOneAndUpdate({_id: req.user.id}, { 
            $push: {following: req.params.id}
        }, {new: true})

        return res.json({newUser})

    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.unfollowUser = async (req, res) => {
    try {
        const newUser = await User.findOneAndUpdate({_id: req.params.id}, { 
            $pull: {followers: req.user.id}
        }, {new: true}).populate("followers following", "-password")

        await User.findOneAndUpdate({_id: req.user.id}, {
            $pull: {following: req.params.id}
        }, {new: true})

        return res.json({newUser})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.getSuggestion = async (req, res) => {
    try {
        const page = req.query.page * 1 || 1
        const limit = 4
        const skip = (page-1) * limit
        
        const newArr = [...req.user.following, req.user.id]

        let users = await User.aggregate([
            { $match: { _id: { $nin: newArr } } },
            { $skip : skip },
            { $limit : limit },
            { $lookup: { from: 'users', localField: 'followers', foreignField: '_id', as: 'followers' } },
            { $lookup: { from: 'users', localField: 'following', foreignField: '_id', as: 'following' } },
        ]).project("-password")

        users = users.filter(e=>e._id != req.user.id)

        return res.json({users})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
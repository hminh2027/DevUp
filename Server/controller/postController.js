const {validatePost} = require('../util/validate')
const Post = require('../model/Post')
const Comment = require('../model/Comment')
const User = require('../model/User')

module.exports.createPost = async (req,res) => {
    // Validate Joi
    // const {error} = validatePost(req.body)
    // if(error) return res.status(400).json({msg: error.message})
    try {
        const {body, media, shareContent} = req.body
        const {username} = req.user
        // Create n save
        const newPost = new Post({
            body,
            media,
            user: req.user.id,
            username,
            shareContent
        })
    
        await newPost.save()


        return res.status(200).json({
            msg:'Post created!', 
            newPost:{
            ...newPost._doc,
            user: req.user,
            shareContent
            }
        })

    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.getPosts = async (req,res) => {
    try {
        const page = req.query.page * 1 || 1
        const limit = 8
        const skip = (page-1) * limit
        // Find posts
        const result = await Post.find({user:[...req.user.following, req.user.id]}).skip(skip).limit(limit).sort('-createdAt')
        .populate('user likes', 'username avatar followers')
        .populate({
            path: "comments",
            populate: {
                path: "user",
                select: "-password"
            }
        })
        .populate({
            path: "shareContent",
            populate: {
                path: "user",
                select: "avatar followers username"
            }
        })
        return res.status(200).json({result})

    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.getUserPosts = async (req,res) => {
    try {
        const ObjectId = require('mongoose').Types.ObjectId
        
        if(!ObjectId.isValid(req.params.id)) return res.status(404).json({user: null, msg: 'User not found'})

        const page = req.query.page * 1 || 1
        const limit = 4
        const skip = (page-1) * limit
        // 
        const result = await Post.find({user: req.params.id}).skip(skip).limit(limit).sort('-createdAt').populate("user likes shareContent", "avatar username followers").populate({
            path: "comments",
            populate: {
                path: "user",
                select: "-password"
            }
        })
        .populate({
            path: "shareContent",
            populate: {
                path: "user",
                select: "avatar followers username"
            }
        })
        return res.status(200).json({result})

    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.getPost = async (req,res) => {
    try {
        const ObjectId = require('mongoose').Types.ObjectId
        
        if(!ObjectId.isValid(req.params.id)) return res.status(404).json({post: null, msg: 'Post not found!'})

        const post = await Post.findById(req.params.id).populate("user likes shareContent", "avatar username followers").populate({
            path: "comments",
            populate: {
                path: "user",
                select: "-password"
            }
        })
        .populate({
            path: "shareContent",
            populate: {
                path: "user",
                select: "avatar followers username"
            }
        })
        return res.status(200).json({post})


    } catch(err) {
        return res.status(500).json({post: null, msg: err.message})
    }
}

module.exports.deletePost = async (req,res) => {
    try {
        // Find post by id
        const post = await Post.findOneAndDelete({_id: req.params.id, user: req.user.id})
        
        await Post.findOneAndUpdate({_id: post.shareContent}, { 
                $pull: {shares: req.user.id}
            })

        await Comment.deleteMany({_id: {$in: post.comments }})       

        return res.status(200).json({
            msg: 'Post deleted!',
            post
        })

    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.updatePost = async (req,res) => {
    // Validate Joi
    const {error} = validatePost(req.body)
    if(error) res.status(400).json({msg: error.message})
    
    try {
        const {body} = req.body
        const newPost = await Post.findById(req.params.id).populate("user likes shareContent", "avatar username followers").populate({
            path: "comments",
            populate: {
                path: "user",
                select: "-password"
            }
        })

        if(!newPost) return res.status(500).json({msg: 'Post not found!'})
        if(newPost.user._id != req.user.id) return res.status(500).json({msg: 'This is not your post!'})

        newPost.body=body
        newPost.save()

        return res.status(200).json({
            msg: 'Post updated!', 
            newPost
        })
    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.likePost = async (req,res) => {
    try {
        // Check if is it ur post
        if(req.user.id === req.body.user._id) return res.status(500).json({msg: 'You can not like your post!'})
        // Find and push like
        const newPost = await Post.findOneAndUpdate({_id: req.params.id}, { 
            $addToSet: {likes: req.user.id}
        }, {new: true}).populate('user','username')

        if (!newPost) return res.status(500).json({msg: 'Post not found!'})

        return res.json({newPost})
        
    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.unlikePost = async (req,res) => {
    try {
        // Find and check if post has been liked
        const post = await Post.find({_id: req.params.id, likes: req.user.id})
        if(post.length == 0) return res.status(500).json({msg: 'Like it before you unlike!'})

        if (!post) return res.status(500).json({msg: 'Post not found!'})

        // Find and push like
        const newPost = await Post.findOneAndUpdate({_id: req.params.id}, { 
            $pull: {likes: req.user.id}
        }, {new: true}).populate('user','username')

        return res.json({newPost})
        
    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.sharePost = async (req,res) => {
    try {
        // Check if post exist
        const checkPost = await Post.findById(req.params.id)
        if(!checkPost) return res.status(500).json({msg: 'Post not found!'})

        // Check if it is ur post
        if(checkPost.user == req.user.id) return res.status(500).json({msg: 'Can not share your own post!'})

        // Push shares
        checkPost.shares = [...checkPost.shares, req.user.id]
        checkPost.save()

        const {post, body} = req.body
        const {username} = req.user

        // Create n save
        const newPost = new Post({
            user: req.user.id,
            username,
            body,
            shareContent: post
        })
    
        await newPost.save()

        return res.status(200).json({
            msg: 'Post shared!',
            newPost:{
                ...newPost._doc,
                user: req.user,
                shareContent: post
            }
        })

    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.savePost = async (req, res) => {
    try {
        // Check if post exist in saved
        const checkPost = await User.find({_id: req.user.id, saved: req.params.id})
        if(checkPost.length > 0) return res.status(400).json({msg: 'Post existed!'})

        const newUser = await User.findOneAndUpdate({_id: req.user.id}, {
            $push: {saved: req.params.id}
        }, {new: true})
        .populate({
            path: 'saved followers following',
            select: 'media body followers following username avatar',
            populate: { path: 'user', select: 'username avatar' }
        })

        if(!newUser) return res.status(400).json({msg: 'This user does not exist.'})

        return res.status(200).json({
            newUser, 
            msg: 'Post saved!'
        })

    } catch (err){
        return res.status(500).json({msg: err.message})
    }
}

module.exports.unsavePost = async (req, res) => {
    try {
        const newUser = await User.findOneAndUpdate({_id: req.user.id}, {
            $pull: {saved: req.params.id}
        }, {new: true})
        .populate({
            path: 'saved followers following',
            select: 'media body followers following username avatar',
            populate: { path: 'user', select: 'username avatar' }
        })

        if(!newUser) return res.status(400).json({msg: 'This user does not exist.'})

        return res.status(200).json({
            newUser,
            msg: 'Post unsaved!'
        })

    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}
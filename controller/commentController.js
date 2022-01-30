const Post = require('../model/Post')
const Comment = require('../model/Comment')

module.exports.createComment = async (req,res) => {
    try {
        const {postId, postUserId, body, tag, reply} = req.body

        const post = await Post.findById(postId)
        if(!post) return res.status(404).json({msg: 'Post not found'})

        if(reply){
            const cm = await Comment.findById(reply)
            if(!cm) return res.status(404).json({msg: 'Comment not found'})
        }

        const newComment = new Comment({
            user: req.user.id, body, tag, reply, postUserId, postId
        })

        await Post.findOneAndUpdate({_id: postId}, {
            $push: {comments: newComment._id},
        }, {new: true})

        await newComment.save()

        return res.status(200).json({newComment})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.deleteComment = async (req,res) => {
    try {
        const deleteComment = await Comment.findOneAndDelete({_id: req.params.id, $or: [
            {user: req.user.id},
            {postUserId: req.user.id}
        ]})
        await Post.findOneAndUpdate({_id: deleteComment.postId}, {
            $pull: {comments: req.params.id}
        })

        return res.status(200).json({msg: 'Comment deleted!'})

    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.updateComment = async (req,res) => {
    try {
        const {body} = req.body
        const comment = await Comment.findOneAndUpdate({_id: req.params.id, user: req.user.id}, {body})

        if(!comment) return res.status(500).json({msg:'Comment nott found!'})

        return res.status(200).json({msg:'Comment updated!'})

    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}
const Notice = require('../model/Notice')

module.exports.createNotice = async (req,res) => {
    try {
        const {id, receivers, url, body, text, tag, type} = req.body
        if(receivers.includes(req.user.id.toString())) return

        const notice = new Notice({
            id, receivers, url, body, text, tag, type, user: req.user.id
        })

        await notice.save()
        
        return res.status(200).json({ notice })

    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.deletePostNotices = async (req,res) => {
    try {
        const deletedNotice = await Notice.deleteMany({ url: req.query.url })

        return res.status(200).json({deletedNotice})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.deleteNotice = async (req,res) => {
    try {
        const deletedNotice = await Notice.deleteMany({_id: req.params.id })

        return res.status(200).json({deletedNotice})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.deleteNotices = async (req,res) => {
    try {
        const deletedNotices = await Notice.deleteMany({receivers: req.user.id})
        return res.status(200).json({deletedNotices})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.getNotices = async (req,res) => {
    try {
        const notices = await Notice.find({receivers: req.user.id}).sort({isRead: 1, createdAt: -1}).limit(50).populate('user' , 'avatar username')

        return res.json({notices})

    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.unreadNotice = async (req,res) => {
    try {
        const notice = await Notice.findOneAndUpdate({_id: req.params.id}, {
            $pull: {isRead: req.user.id}
        }, {new: true}).populate('user', 'avatar username')

        if(!notice) return res.status(404).json({msg: 'Notice not found!'})

        return res.status(200).json({notice})

    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.readNotice = async (req,res) => {
    try {
        const notice = await Notice.findOneAndUpdate({_id: req.params.id}, {
            $addToSet: {isRead: req.user.id}
        }, {new: true}).populate('user', 'avatar username')

        if(!notice) return res.status(404).json({msg: 'Notice not found!'})

        return res.status(200).json({notice})

    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.readNotices = async (req,res) => {
    try {
        await Notice.updateMany({receivers: req.user.id}, {
            $addToSet: {isRead: req.user.id}
        })

        return res.status(200)

    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}
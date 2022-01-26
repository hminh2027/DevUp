const Code = require('../model/Code')

module.exports.createProject = async (req,res) => {
    try {
        const {name, isEditable} = req.body

        const check = await Code.find({name, author: req.user.id})
        if(check.length>0) return res.status(500).json({msg: `Project's name has been used!`})

        const newCode = new Code({name, isEditable, author: req.user})

        await newCode.save()

        return res.status(200).json({ 
            msg:'Project created!',
            newCode 
        })

    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.readProject = async (req,res) => {
    try {
        const newCode = await Code.findOneAndUpdate({id: req.params.id}, {
            $addToSet: {isRead: req.user.id}
        }, {new: true}).populate('author receivers', 'avatar username')

        return res.status(200).json({ 
            msg:'Editable changed!',
            newCode
        })

    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.renameProject = async (req,res) => {
    try {
        const {id} = req.params
        const {name} = req.body

        let newCode = await Code.findById({_id: id}).populate('author receivers', 'username avatar')
        if(!newCode) return res.status(500).json({msg: 'Project not found'})
        if(newCode.author._id != req.user.id) return res.status(500).json({msg: 'This is not your project'})

        newCode.name = name
        await newCode.save()

        return res.status(200).json({ 
            msg:'Project renamed!',
            newCode
        })

    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.changeEditable = async (req,res) => {
    try {
        const {id} = req.params

        let newCode = await Code.findById({_id: id}).populate('author receivers', 'username avatar')
        if(!newCode) return res.status(500).json({msg: 'Project not found'})
        if(newCode.author._id != req.user.id) return res.status(500).json({msg: 'This is not your project'})

        newCode.isEditable = !newCode.isEditable
        await newCode.save()

        return res.status(200).json({ 
            msg:'Editable changed!',
            newCode
        })

    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.saveProject = async (req,res) => {
    try {
        const {code, html, css, js} = req.body
        const {id} = req.params

        const newCode = await Code.findOneAndUpdate({_id: id}, {code, html, css, js}, {new: true}).populate('author receivers', 'username avatar')
        if(!newCode) return res.status(500).json({msg: 'Project not found'})
        if(!newCode.isEditable && newCode.author._id != req.user.id) return res.status(500).json({msg: 'Project Un-Editable!'})

        // do iseditable check

        return res.status(200).json({ 
            msg: 'Project Saved!',
            newCode 
        })

    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.deleteProject = async (req,res) => {
    try {
        const {id} = req.params

        const deletedCode = await Code.findOneAndDelete({_id: id, author: req.user.id})
        
        if(!deletedCode) return res.status(500).json({msg: 'Delete Failed!'})

        return res.status(200).json({
            msg: 'Project deleted!',
            deletedCode
        })
    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.deleteReceivedProject = async (req,res) => {
    try {
        const {id} = req.params
        const deletedCode = await Code.findOneAndUpdate({_id: id, receivers: req.user.id},
            {$pull: {receivers: req.user.id}}, 
        {new: true}).populate('author receivers', 'avatar username')
        
        if(!deletedCode) return res.status(500).json({msg: 'Delete Failed!'})

        return res.status(200).json({
            msg: 'Project deleted!',
            deletedCode
        })
    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.getOwnProjects = async (req,res) => {
    try {
        const codes = await Code.find({author: req.user.id}).sort({isRead: 1, createdAt: -1}).populate('author receivers', 'username avatar')

        return res.status(200).json({ codes })

    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.getShareProjects = async (req,res) => {
    try {
        const codes = await Code.find({receivers: req.user.id}).sort({isRead: 1, createdAt: -1}).populate('author receivers', 'avatar username')

        return res.status(200).json({ codes })

    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.shareProject = async (req,res) => {
    try {
        let receivers = req.body.filter(id=>id!=req.user.id)
        receivers = [...new Set(receivers)]
        const code = await Code.findOneAndUpdate({_id: req.params.id, author: req.user.id}, { 
            receivers
        }, {new: true}).populate('author receivers', 'avatar username')

        if(!code) return res.status(500).json({msg: 'Share failed!'})
        
        return res.status(200).json({ 
            msg: 'Share list updated!',
            code
         })

    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

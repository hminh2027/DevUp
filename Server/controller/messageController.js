const Conservation = require('../model/Conservation')
const Message = require('../model/Message')

module.exports.createMessage = async (req,res) => {
    try {
        const {author, receivers, text, media, call} = req.body
        if(!receivers || (!text.trim() && media.length === 0 && !call)) return

        const newConservation = await Conservation.findOneAndUpdate({
            $or: [
                {receivers: [author, receivers]},
                {receivers: [receivers, author]}
            ]
        },{
            receivers: [author, receivers],
            text, media, call
        }, {new: true, upsert: true})

        const newMessage = new Message({
            conservation: newConservation._id,
            author,
            call,
            receivers,
            text,
            media
        })

        await newMessage.save()

        return res.status(200).json({msg: 'Message created!'})

    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}
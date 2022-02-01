const jwt = require('jsonwebtoken')
const User = require('../model/User')
require('dotenv').config()

module.exports = async (req,res,next) => {
    const token = req.header('Authorization')
    if(token) {
        try {
            const decoded = jwt.verify(token,process.env.ATKEY)
            const user = await User.findOne({_id: decoded.id})
            req.user = user
            next()
        } catch (err) {
            console.log(err)
            res.status(403).json({msg:'Invalid token! Please refresh page or relogin'})
        }
    }
    else return res.status(401).json({msg:'Access denied. No token provided'})
}
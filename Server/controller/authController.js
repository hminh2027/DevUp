const bcrypt = require('bcrypt')
const {validateLogin, validateSignup} = require('../util/validate')
const jwt = require('jsonwebtoken')
const User = require('../model/User')
require('dotenv').config()

module.exports.login = async (req,res) => {
    // Validate Joi
    const {error} =  validateLogin(req.body)
    if(error) return res.status(400).json({msg: error.details[0].message})

    try {
        // Find if user or not
        const user = await User.findOne({email: req.body.email})
        .populate({
            path: 'saved followers following',
            select: 'media body followers following username avatar',
            populate: { path: 'user', select: 'username avatar' }
        })

        if(!user) return res.status(400).json({msg: "This email does not exist"})

        // Hash now pw then compare with db pw
        const match = await bcrypt.compare(req.body.password,user.password)
        if(!match) return res.status(400).json({msg: "Invalid email or password"})
        if(!user.isActive) return res.status(400).send('Please active the user!')

        // Gen 2 token
        const access_token = user.genAccessToken({id: user.id})
        const refresh_token = user.genRefreshToken({id: user.id})

        // Set cookie
        res.cookie('refreshtoken', refresh_token, {
            httpOnly: true,
            path: '/api/auth/refresh_token',
            maxAge: 30*24*60*60*1000 // 30days
        })

        res.json({
            msg: 'Login Successful!',
            access_token,
            user
        })

    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.signup = async (req,res) => {
    try {
        // Show errors
        const {error} = validateSignup(req.body)
        if(error) return res.status(400).json({msg: error.details[0].message})

        // Find if email exits or not
        let email = await User.findOne({email: req.body.email})
        if(email) return res.status(400).json({msg: "This email already exists!"})

        user = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
        })

        // Hash the pw
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password,salt)
        await user.save()

        // Gen AT and RT
        const access_token = user.genAccessToken({id: user.id})
        const refresh_token = user.genRefreshToken({id: user.id})

        // Save to cookie
        res.cookie('refreshtoken', refresh_token, {
            httpOnly: true,
            path: '/api/auth/refresh_token',
            maxAge: 30*24*60*60*1000 // 30days
        })

        // Create email token
        res.json({
            msg: 'Register Successful!',
            access_token,
            user
        })

    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.logout = async (req,res) => {
    try {
        res.clearCookie('refreshtoken', {path: '/api/auth/refresh_token'})
        return res.json({msg: "Logged out!"})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports.genAccessToken = async (req,res) => {
    try {
        const RT = req.cookies.refreshtoken
        if(!RT) return res.status(400).json({msg: 'Please login now!'})
        try {
            jwt.verify(RT,process.env.RTKEY, async (err,result) => {
                if(err) return result.status(400).json({msg: 'Please login now!'})

                const user = await User.findById(result.id).select("-password")
                .populate({
                    path: 'saved followers following',
                    select: 'media body followers following username avatar',
                    populate: { path: 'user', select: 'username avatar' }
                })

                if(!user) return res.status(400).json({msg: 'User not found!'})

                // Create new AT 
                const access_token = user.genAccessToken({id: result.id})

                res.json({
                    access_token,
                    user
                })
            })
            
        } catch(err){
            return res.status(500).json({msg: err.message})
        }

    } catch(err) {
        res.status(500).json({msg: err.message})
    }
}

module.exports.changePassword = async (req,res) => {
    try {
        const {oldPw, newPw} = req.body.form
        const match = await bcrypt.compare(oldPw, req.user.password)
        
        if(!match) return res.status(500).json({msg: 'Password incorrect!'})

        const salt = await bcrypt.genSalt(10)
        const newHashedPw = await bcrypt.hash(newPw, salt)

        await User.findOneAndUpdate({_id: req.user.id}, { 
            password: newHashedPw
        })

        return res.status(200).json({msg: 'Password updated!'})

    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}
const joi = require('joi')

module.exports.validateSignup = (user) => {
    const schema = joi.object({
        username: joi.string().min(5).max(255).required(),
        password: joi.string().min(6).max(255).required(),
        password2: joi.any().equal(joi.ref('password'))
        .required()
        .label('Confirm password')
        .messages({ 'any.only': '{{#label}} does not match' }),
        email: joi.string().min(5).max(255).required().email()
    })
    return schema.validate(user)
}

module.exports.validateLogin = (user) => {
    const schema = joi.object({
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(5).max(255).required(),
        remember: joi.boolean()
    })
    return schema.validate(user)
}

module.exports.validatePost = (post) => {
    const schema = joi.object({
        body: joi.string(),
        image: joi.array(),
        file: joi.array()
    })
    return schema.validate(post)
}

module.exports.validateUser = (user) => {
    const schema = joi.object({
        username: joi.string().min(5).max(25).required(),
        tel: joi.string().max(255),
        gender: joi.string().max(10),
        address: joi.string(),
        bio: joi.string().max(100),
        avatar: joi.string(),
        background: joi.string()
    })
    return schema.validate(user)
}
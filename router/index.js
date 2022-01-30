const authRoute = require('./authRouter')
const postRoute = require('./postRouter')
const userRoute = require('./userRouter')
const commentRoute = require('./commentRouter')
const noticeRoute = require('./noticeRouter')
const messageRoute = require('./messageRouter')
const projectRoute = require('./projectRouter.js')

module.exports = (app) => {
    app.use('/api/auth', authRoute)
    app.use('/api/post', postRoute)
    app.use('/api/user', userRoute)
    app.use('/api/comment', commentRoute)
    app.use('/api/notice', noticeRoute)
    app.use('/api/message', messageRoute)
    app.use('/api/project', projectRoute)
}
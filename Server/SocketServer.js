let users = []

module.exports.SocketServer = (socket) => {
    // Connect - Disconnect
    socket.on('joinUser', user => {
        users.push({id: user._id, socketId: socket.id, followers: user.followers})
    })

    socket.on('disconnect', user => {
        users = users.filter(user=>user.socketId!==socket.id)
    })

    // Like - Unlike
    socket.on('likePost', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user=>ids.includes(user.id))

        if(clients.length>0) 
            clients.forEach(client=>{
                socket.to(`${client.socketId}`).emit('likeToClient', newPost)
            })
    })

    socket.on('unlikePost', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user=>ids.includes(user.id))

        if(clients.length>0) 
            clients.forEach(client=>{
                socket.to(`${client.socketId}`).emit('unlikeToClient', newPost)
            })
    })

    // Comment - Uncomment
    socket.on('commentPost', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user=>ids.includes(user.id))

        if(clients.length>0) 
            clients.forEach(client=>{
                socket.to(`${client.socketId}`).emit('commentToClient', newPost)
            })
    })

    socket.on('uncommentPost', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user=>ids.includes(user.id))

        if(clients.length>0) 
            clients.forEach(client=>{
                socket.to(`${client.socketId}`).emit('uncommentToClient', newPost)
            })
    })

    // Follow - Unfollow
    socket.on('follow', newUser => {
        const user = users.find(user=>newUser._id === user.id)
        user && socket.to(`${user.socketId}`).emit('followToClient', newUser)
    })

    socket.on('unfollow', newUser => {
        const user = users.find(user=>newUser._id === user.id)
        user && socket.to(`${user.socketId}`).emit('unfollowToClient', newUser)
    })

    // Notice - Unnotice
    socket.on('createNotice', msg => {
        const client = users.find(user=>msg.receivers.includes(user.id))
        client && socket.to(`${client.socketId}`).emit('createNoticeToClient', msg)
    })

    // socket.on('deleteNotice', (msg, notices) => {
    //     const client = users.find(user=>msg.receivers.includes(user.id))
    //     client && socket.to(`${client.socketId}`).emit('deleteNoticeToClient', notices)
    // })
}
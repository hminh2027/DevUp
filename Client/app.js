const express = require('express')
const path = require('path')

const app = express()

const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'))
    app.get('*', (req, res) => {
        req.sendFile(path.join(__dirname, 'build', 'index.html'))
        console.log(__dirname)
    })
}

app.listen(PORT, err=>{
    if(err) return console.error(err)
    console.log("Server started at " + PORT)
})
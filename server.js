const showService = require("./showService")
const path = require("path")
const express = require("express")
const app = express()

const HTTP_PORT = 8080

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.send("SM 1283198329")
})

app.get("/channels", (req, res) => {
    // if (req.query.test) {
    //     res.sendFile(path.join(__dirname, "/views/index.html"))
    //     console.log("hello")
    // } else {
    //     showService.getAllChannels().then((channels) => {
    //         res.json(channels)
    //     }).catch((err) => {c
    //         res.send(err)
    //     })
    // }
    res.sendFile(path.join(__dirname, "/views/index.html"))


})

app.get("/videos/channel/:channelID", (req, res) => {
    showService.getVideosByChannel(req.params.channelID).then((videos) => {
        res.json(videos)
    }).catch((err) => {
        res.send(err)
    })
})


app.get("/videos/:id", (req, res) => {
    showService.getVideoByID(req.params.id).then((video) => {
        res.send(video)
    }).catch((err) => {
        res.send(err)
    })
})



showService.initialize().then(() => {
    app.listen(HTTP_PORT, () => {
        console.log("server listening on port " + HTTP_PORT)
    })
})





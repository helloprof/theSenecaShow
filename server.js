const showService = require("./showService")
const path = require("path")
const express = require("express")
const app = express()

const HTTP_PORT = 8080

app.get("/", (req, res) => {
    res.send("SM 1283198329")
})

app.get("/channels", (req, res) => {
    showService.getAllChannels().then((channels) => {
        res.json(channels)
    }).catch((err) => {
        res.send(err)
    })
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





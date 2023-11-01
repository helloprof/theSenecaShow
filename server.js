const showService = require("./showService")
const path = require("path")
const express = require("express")
const app = express()

const HTTP_PORT = 8080

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get("/", (req, res) => {
    showService.getAllChannels().then((channels) => {
        res.render('channels', {
            channels: channels
        })
    })

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

    // res.sendFile(path.join(__dirname, "/views/index.ejs"))

    res.render('index')
    // res.send("hello")


})

app.get("/videos/channel/:channelID", (req, res) => {
    showService.getVideosByChannel(req.params.channelID).then((videos) => {
        res.render('videos', {
            videos: videos
        })
    }).catch((err) => {
        res.send("err")
    })
})


app.get("/videos/:id", (req, res) => {
    showService.getVideoByID(req.params.id).then((video) => {
        res.render('videos', {
            videos: [video]
        })
    }).catch((err) => {
        res.send(err)
    })
})



showService.initialize().then(() => {
    app.listen(HTTP_PORT, () => {
        console.log("server listening on port " + HTTP_PORT)
    })
})





const showService = require("./showService")
const path = require("path")
const express = require("express")
const app = express()

const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

const multer = require("multer")

const HTTP_PORT = 8080

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


// const storage = multer.diskStorage({
//   destination: 'public/videos/',
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

const upload = multer();

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
  secure: true
});

app.get("/", (req, res) => {
  showService.getAllChannels().then((channels) => {
    res.render('channels', {
      channels: channels
    })
  }).catch((err) => {
    res.send(err)
  })
})

app.get("/channels/new", (req, res) => {
    res.render("addChannel")
})

app.post("/channels/new", (req, res) => {
  showService.addChannel(req.body).then(() => {
    res.redirect("/")
  })
})

// app.get("/channels", (req, res) => {
//   // if (req.query.test) {
//   //     res.sendFile(path.join(__dirname, "/views/index.html"))
//   //     console.log("hello")
//   // } else {
//   //     showService.getAllChannels().then((channels) => {
//   //         res.json(channels)
//   //     }).catch((err) => {c
//   //         res.send(err)
//   //     })
//   // }

//   // res.sendFile(path.join(__dirname, "/views/index.ejs"))

//   res.render('channels')
//   // res.send("hello")


// })

app.get("/videos/channel/:channelID", (req, res) => {
  showService.getVideosByChannel(req.params.channelID).then((videos) => {
    res.render('videos', {
      videos: videos
    })
  }).catch((err) => {
    res.send("err")
  })
})

app.get("/videos/new", (req, res) => {
  showService.getAllChannels().then((channels) => {
    res.render("addVideo", {
      channels: channels
    })
  }).catch((err) => {
    res.send(err)
  })
})

// code from https://cloudinary.com/blog/node_js_file_upload_to_a_local_server_or_to_the_cloud
app.post('/videos/new', upload.single('video'), function (req, res, next) {
  if (req.file) {

    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      let result = await streamUpload(req);
      // console.log(result);
      return result
    }

    upload(req).then((uploaded) => {
      console.log(uploaded)
      processUpload(uploaded.url)
    }).catch((err) => {
      console.log(err)
    })
  } else {
    processUpload("")
  }

  function processUpload(uploadedURL) {
    req.body.video = uploadedURL
    showService.addVideo(req.body).then(() => {
      res.redirect("/")
    })
  }


});



app.get("/videos/:id", (req, res) => {
  showService.getVideoByID(req.params.id).then((video) => {
    res.render('videos', {
      videos: [video]
    })
  }).catch((err) => {
    res.send(err)
  })
})

app.get("*", (req, res) => {
  res.status(404).send("404")
})

showService.initialize().then(() => {
  app.listen(HTTP_PORT, () => {
    console.log("server listening on port " + HTTP_PORT)
  })
})





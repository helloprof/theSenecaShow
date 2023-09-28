const videos = require("./data/videos.json")
const channels = require("./data/channels.json")

function initialize() {
    return new Promise((resolve, reject) => {
        console.log("combine your json files together into a new array")
        resolve()
    })
    // combine themes json and legosets json into a new js array
    // filteredArray
    
    // TODO
}

function getAllChannels() {
    return new Promise((resolve, reject) => {
        if (channels.length > 0) {
            resolve(channels)
        } else {
            reject("no videos!")
        }
    })
}


function getVideoByID(id) {
    return new Promise((resolve, reject) => {
        const result = videos.find((video) => video.id == id)
        if (result) {
            resolve(result)
        } else {
            reject("video not found!")
        }
    })
}

function getVideosByChannel(channelID) {
    return new Promise((resolve, reject) => {
        const result = videos.filter((video) => video.channelID == channelID)
        if (result) {
            resolve(result)
        } else {
            reject("video not found!")
        }    
    })
}


module.exports = {
    initialize,
    getAllChannels,
    getVideoByID,
    getVideosByChannel
}
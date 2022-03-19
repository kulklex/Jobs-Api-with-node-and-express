const { any, string } = require('joi')
const moongoose = require('mongoose')

const fileSchema = new moongoose.Schema({
        name: {
            type: String,
            required: true
        }, 

        image: {
            type: String,
            required: true
        },
        size: {
            type: Number,
            required: true
        },
        mimetype: {
            type: String,
            required: true
        },
        originalname: {
            type: String,
            required: true
        },
        destination: {
            type: String,
            required: true
        }
})

const Upload = moongoose.model('upload', fileSchema)

module.exports = Upload
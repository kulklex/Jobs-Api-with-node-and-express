const mongoose = require('mongoose')


const connectDB =  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to MongoDB')
  }).catch((err) => {console.log('Failed to connect'), err} )


module.exports = connectDB

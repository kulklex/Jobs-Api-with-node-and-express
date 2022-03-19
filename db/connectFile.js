const mongoose = require('mongoose')
const dbFile = mongoose.connect(process.env.MONGO_URI2, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    }).then(() => {
    console.log('Connected to MongoDB upload')
  }).catch((err) => {console.log('Failed to connect Upload'), err} )


module.exports = dbFile
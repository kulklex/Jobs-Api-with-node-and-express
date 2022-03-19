require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//database connections
require('./db/connect')


//extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')

//authenticate User
const authenticateUser  = require('./middleware/authentication')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.set('trust proxy', 1)
app.use(rateLimit({
  window: 15 * 60 * 1000,
  max: 100
}))

app.use(express.json());
// app.use(helmet({
//   contentSecurityPolicy: {
//     defaultSrc: ["'self'"],
//     scriptSrc: ["'self'", "https://code.jquery.com/jquery-3.6.0.min.js", "https://code.jquery.com/jquery-3.6.0.min.js"],
//     styleSrc: ["'self'", "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"]
//   }
// }))
app.use(cors())
app.use(xss())




//ejs
app.set('view engine', 'ejs')


//Public folder


app.set("views", path.join(__dirname, "views"));
app.use(express.static(`${__dirname}/public`));

const auth = require('./routes/auth')
const jobs = require('./routes/jobs');
const uploadFile = require('./routes/upload');
app.use('/api/v1/upload', uploadFile)
app.use('/api/v1/auth', auth)
app.use('/api/v1/jobs', authenticateUser, jobs)



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

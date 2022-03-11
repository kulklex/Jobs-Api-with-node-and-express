require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

//database connection
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
app.use(helmet())
app.use(cors())
app.use(xss())


// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});

const auth = require('./routes/auth')
const jobs = require('./routes/jobs')
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

require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

//database connection
require('./db/connect')

//authenticate User
const authenticateUser  = require('./middleware/authentication')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');




app.use(express.json());
// extra packages

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

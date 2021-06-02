const express = require('express');
const bodyParser = require('body-parser');
const statusMonitor = require('express-status-monitor');

const { userRouter } = require('./routers');
const app = express();
const port = 3001;

app.use(statusMonitor());
app.use(bodyParser.json());

app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

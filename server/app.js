const express = require('express');
const authRouter = require('./routes/auth-router');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

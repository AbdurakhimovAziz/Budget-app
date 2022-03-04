const express = require('express');
const usersRouter = require('./routes/users');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hi');
});

app.use('/users', usersRouter);
app.listen(3000);

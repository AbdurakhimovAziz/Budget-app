const express = require('express');
const usersRouter = require('./routes/users');
const accountsRouter = require('./routes/accounts');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hi');
});

app.use('/users', usersRouter);
app.use('/accounts', accountsRouter);
app.listen(3000);

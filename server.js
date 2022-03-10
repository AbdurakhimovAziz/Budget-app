const express = require('express');
const cors = require('cors');

const usersRouter = require('./routes/users');
const accountsRouter = require('./routes/accounts');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.get('/', (req, res) => {
  res.send('hi');
});

app.use('/users', usersRouter);
app.use('/accounts', accountsRouter);
app.listen(3000);

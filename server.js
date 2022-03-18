const express = require('express');
const cors = require('cors');
const passport = require('passport');

const usersRouter = require('./routes/users');
const accountsRouter = require('./routes/accounts');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect(
  process.env.MONGODB_URI,
  () => {
    console.log('Connected to database');
  },
  (err) => {
    console.log(err);
  }
);

require('./config/passport')(passport);
const auth = passport.authenticate('jwt', { session: false });

app.get('/', (req, res) => {
  res.send('hi');
});

app.use('/users', usersRouter);
app.use('/accounts', accountsRouter); // TODO: add authmiddleware after implementing accounts
app.listen(3000);

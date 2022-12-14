const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// Built in middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

app.use(/\//, (req, res) => {
  res.redirect('/home');
});

// App routes
app.use('/api/v1/github', require('./controllers/github-controller'));
app.use('/api/v1/posts', require('./controllers/posts-controller'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

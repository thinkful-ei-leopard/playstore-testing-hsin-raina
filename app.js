const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'));

const apps = require('./playstore');
app.get('/apps', (req, res) => {
  const { sort, genres } = req.query;
  
  if (sort) {
    if (!['Rating', 'App'].includes(sort)) {
      return res
        .status(400)
        .send('sort must be one of rating or app');
    }
  }

  if (genres) {
    if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
      return res
        .status(400)
        .send('genres not valid');
    }
  }

  let result = apps
    .filter(app => 
      app
        .Genres
        .includes(genres));

  if (sort) {
    result
      .sort((a,b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
  }

  res.json(result);

});

app.listen(8000, () => {
  console.log('server started on PORT 8000!!');
});
const express = require('express');
const app = express();
const db = require('./db');
const { Page } = db.models;
const path = require('path');

const port = process.env.PORT || 3000;

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/pages', async(req, res, next)=> {
  try {
    const allPages = await Page.findAll();
    res.send(allPages);
  }
  catch(ex){
    next(ex);
  }
});

db.syncAndSeed()
  .then(()=> {
    app.listen(port, ()=> console.log(`listening on port ${port}`))
  });

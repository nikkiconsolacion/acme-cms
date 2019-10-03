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

app.get('/api/pages/:id/children', async(req, res, next)=> {
  Page.findAll({ where: { parentId: req.params.id }})
    .then( pages => res.send(pages))
    .catch(next);
});

app.get('/api/pages/:id/siblings', async(req, res, next)=> {
  Page.findAll({ where: { parentId: req.params.id }})
    .filter( child => child.id !== id)
    .then( pages => res.send(pages))
    .catch(next);
})

db.syncAndSeed()
  .then(()=> {
    app.listen(port, ()=> console.log(`listening on port ${port}`))
  });

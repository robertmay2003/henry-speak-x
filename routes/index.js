const Translator = require('../models/Translator');
var admin = require('firebase-admin');
var express = require('express');
var router = express.Router();

require('dotenv').config();

console.log(process.env.PRIVATE_KEY);
admin.initializeApp({
  credential: admin.credential.cert({
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.CLIENT_EMAIL,
    project_id: process.env.PROJECT_ID,
  }),
  databaseURL: 'https://henryspeak-69c93.firebaseio.com'
});

var db = admin.database();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Henry Speak' });
});

/* GET translation page. */
router.get('/translate', function(req, res, next) {
  let t = new Translator();

  let input = req.query.input;
  let output = '';
  if (req.query.input) output = t.translate(req.query.input);
  res.render('index', {title: 'Henry Speak', input: input, output: output});
});

/* GET comments page. */
router.get('/comment', function(req, res, next) {
  let ref = db.ref('comments/');
  ref.once('value')
    .then((snapshot)=>{
      res.render('contact', {title: 'Henry Speak - Comments', comments: snapshot.val()});
    })
    .catch((e)=>{
      res.render('contact', {title: 'Henry Speak - Comments'});
    });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', {title: 'Henry Speak - About'});
});

/* POST comments. */
router.post('/comment/upload', function(req, res, next) {
  let comment = {
    title: req.body.title,
    author: req.body.author,
    body: req.body.body
  };

  let ref = db.ref('comments/').push();
  ref.set(comment)
    .catch((e) => {
      console.log(e);
    });

  res.redirect('/comment')
});

module.exports = router;

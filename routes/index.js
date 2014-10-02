var express = require('express');
var router = express.Router();
var wikiRouter = require('./wiki');

/* GET home page. */
router.get('/', function(req, res) {
  var models = require('../models');
  var Pages = models.Page.find({ "current": true }, 'title body id', function(err, data) {
    if (err) {
      return err;
    }
    res.render('index', { title: 'Wikistacks', docs: data });
  });
});

router.use('/wiki', function(req, res, next) {
  next();
}, wikiRouter);


module.exports = router;

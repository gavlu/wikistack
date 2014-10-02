var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('add');
});

router.post('/submit', function(req, res) {
  var models = require('../models/');

  req.body.current = true;
  req.body.version = 1;

  var p = new models.Page(req.body);
  p.save();
  res.redirect('/');
});


module.exports = router;

var express = require('express');
var router = express.Router();
var models = require('../models');

router.post('/', function(req, res) {

  models.Page.find({ "title": req.body.search }, 'title body id', function(err, data) {
    if (err) {
      return err;
    } else if (data.length > 1) {
      res.render('search', { title: 'Search Results', docs: data });
    } else if (data.length === 1) {
      res.redirect('/wiki/'+data[0].id+'/'+data[0].url_name);
    } else {
      res.render('show', { docs: data });
    }
  });

});


module.exports = router;

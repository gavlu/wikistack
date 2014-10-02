var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/:id/:url', function(req, res) {
  models.Page.find({ "_id": req.params.id, "current": true }, 'title body date', function(err, data) {
    var date = data[0].date.toString();
    res.render('show', { docs: data, date: date});
  });
});

router.get('/:id/:url/delete', function(req, res) { //CHANGE TO POST REQUEST LATER
  models.Page.findById( req.params.id, 'title version', function(err, data) {
    models.Page.update({ "title": data.title, "version": data.version-1}, {'current': true}, function(err, done) {
      if (err) {
        console.log(err);
      }
      models.Page.remove({ "_id": req.params.id, "current": true }, function(err, data) {
        res.redirect('/');
      });
    });
  });

});

router.get(':id/:url/archive', function(req, res) {
  models.Page.findOne({"_id": req.params.id}, 'title', function(err, data) {
    if (err) {
      console.log(err);
    }
    models.Page.find({ "title": data.title }, function(err, articles) {
      res.render('archive', { docs: articles });
    });
  });
});

router.post('/:id/:url/submit', function(req, res) {
  req.body.current = true;

  models.Page.update({ "_id": req.params.id , "current": true}, { "current": false }, function(err, data) {
    if (err) {
      throw err;
    }
    res.redirect('/');
  });

  models.Page.findOne({ "_id": req.params.id }, 'current version', function(err, data) {
    req.body.version = data.version + 1;
    var p = new models.Page(req.body);
    p.save();
  });
});

module.exports = router;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wikistack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var Page, User;
var Schema = mongoose.Schema;

var pageSchema = new Schema({
  title: String,
  owner_id: String,
  body: String,
  current: Boolean,
  version: Number,
  date: { type: Date, default: Date.now },
  status: Number
});

pageSchema.virtual('url_name').get(function() {
  return this.title.split(' ').join('_').replace(/\W+/g, '');
});

var userSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  email: String
});

Page = mongoose.model('Page', pageSchema);
User = mongoose.model('User', userSchema);

module.exports = {"Page": Page, "User": User};

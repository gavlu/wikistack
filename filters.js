var marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

module.exports = function(swig) {
  var page_link = function(doc) {
    var link_name;
    if (typeof doc.title !== "undefined" && doc.title !== "") {
      link_name = doc.title;
    } else {
      link_name = "Page "+doc.url_name;
    }
    return "<a href='/wiki/" +doc.id+ '/' +doc.url_name+ "'>"+link_name+"</a>";
  };
  page_link.safe = true;

  var markedFunc = function(doc) {
    return marked(doc);
  };
  markedFunc.safe = true;

  var toDate = function(doc) {
    return doc.toString();
  };
  toDate.safe = true;

  var preview = function(doc) {
    return doc.slice(0, 60);
  }
  preview.safe = true;


  swig.setFilter('markedFunc', markedFunc);
  swig.setFilter('page_link', page_link);
  swig.setFilter('toDate', toDate);
  swig.setFilter('preview', preview);
};

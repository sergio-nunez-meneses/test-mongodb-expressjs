const session = require('express-session');
const MongoClient = require('mongodb').MongoClient;

exports.disconnect = function(req, res, next) {
  console.log(req.session.dbname, req.session.url);

  MongoClient.connect(req.session.url)
    .then(function(db) {
      db.db(req.session.dbname).dropDatabase(function() {
        db.close();
      });
    })
    .then(function() {
      req.session.destroy();
      res.redirect('/');
    })
    .catch(function(error) {
      console.error(error);
    })
}

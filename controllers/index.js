const session = require('express-session');
// const MongoClient = require('mongodb').MongoClient;

exports.init = function(req, res, next) {
  req.session.dbname = 'db_test';
  req.session.url = 'mongodb://localhost:27017/db_test';

  console.log(req.session.dbname, req.session.url)

  res.render('index', {
    title: 'Index',
    heading: 'MongoDB'
  });
}

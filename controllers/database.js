const session = require('express-session');
const MongoClient = require('mongodb').MongoClient;

exports.create = function(req, res, next) {
  req.session.dbname = 'db_test';
  req.session.url = 'mongodb://localhost:27017/db_test';
  req.session.collname = req.body.collname;
  req.session.collvalues = req.body.collvalue.split('.');
  let sentencesObject = [];

  req.session.collvalues.forEach((item, i) => {
    if (item !== '') {
      let newItem = { sentence: item };
      sentencesObject.push(newItem);
    }
  });
  req.session.collvalues = sentencesObject;


  MongoClient.connect(req.session.url)
    .then(function(db) {
      db.db(req.session.dbname).collection(req.session.collname).insertMany(req.session.collvalues, async function(error, result) {
        res.render('database', {
          title: 'Database',
          name: req.session.dbname,
          collection: req.session.collname,
          documents: result.ops
        });
        db.close();
      })
    })
    .catch(function(error) {
      console.error(error);
    })
}

//
exports.display = function(req, res, next) {
  res.render('database', {
    title: 'Database',
    name: req.session.dbname,
    collection: req.session.collname,
    documents: req.session.collvalues
  });
}

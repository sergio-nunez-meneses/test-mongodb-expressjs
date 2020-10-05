const session = require('express-session');
const MongoDB = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

exports.getCollection = function(req, res, next) {
  // console.log(req.session.dbname, req.session.url, req.session.collname);

  MongoClient.connect(req.session.url)
    .then(function (db) {
      db.db(req.session.dbname).collection(req.session.collname).find({}).toArray(async function(error, result) {
        const content = result;

        res.render('actions', {
          title: 'Actions',
          action: req.body.action,
          name: req.session.dbname,
          collection: req.session.collname,
          documents: content
        });
      })
    })
    .catch(function(error) {
      console.error(error);
    })
}

exports.getEntry = function (req, res, next) {
  MongoClient.connect(req.session.url)
    .then(function (db) {
      if (req.body.action === 'findone') {
        const query = { _id: MongoDB.ObjectId(req.body.docid) };

        db.db(req.session.dbname).collection(req.session.collname).find(query).toArray(async function(error, result) {
          const content = result;

          res.render('actions', {
            title: 'Actions',
            action: req.body.action,
            name: req.session.dbname,
            collection: req.session.collname,
            documents: content
          });
        });
      }
    })
    .catch(function(error) {
      console.error(error);
    })
}

// bug
exports.deleteEntry = function(req, res, next) {
  console.log(req.session.dbname, req.session.url, req.session.collname);

  MongoClient.connect(req.session.url)
    .then(function (db) {
      if (req.body.action === 'deleteone') {
        const query = { _id: MongoDB.ObjectId(req.body.docid) };

        db.db(req.session.dbname).collection(req.session.collname).deleteOne(query, async function(error, res) {
          db.close();
        });
      }
    })
    .then(function() {
      res.redirect('/database');
    })
    .catch(function(error) {
      console.error(error);
    })
}

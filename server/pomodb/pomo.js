const express = require("express");
const recordRoutes = express.Router();

// Connect to DB
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
// const ObjectId = require("mongodb").ObjectId;

// Get a record via a GET request
recordRoutes.route("/pomodb/:code").get((req, res) => {
  let db_connect = dbo.getDb();
  // let myquery = { _id: ObjectId( req.params.code )};
  db_connect.collection("pomos").findOne(
      req.params.code,
      (err, result) => {
        if (err) throw err;
        res.json(result);
      }
    );
});

// Add a record via a POST request
recordRoutes.route("/pomodb/add").post((req, response) => {
  let db_connect = dbo.getDb();
  db_connect.collection("pomos").insertOne(
    { 
      "_id": req.code,
      "raw_config": req.raw_config 
    },
    (err, res) => {
      if (err) throw err;
      response.json(res);
    }
  );
});

module.exports = recordRoutes;
const express = require("express");
const app = express.Router();

// Connect to DB
const dbo = require("../db/conn");

// Get index from either code or raw config via a GET request
app.route("/pomodb/:str").get((req, res) => {
  let db_connect = dbo.getDb();
  console.log(req.params)
  console.log(rcOrCode(req.params.str))
  db_connect.collection("pomos").findOne(
      {
        [rcOrCode(req.params.str)]: req.params.str
      },
      (err, result) => {
        if (err) throw err;
        res.json(result);
      }
    );
});

// Add a pair (two indices) via a POST request
app.route("/pomodb/add").post((req, response) => {
  let db_connect = dbo.getDb();
  console.log(req.body)
  db_connect.collection("pomos").insertOne(
    { 
      code: req.body[0],
      rawConfig: req.body[1],
    },
    (err, res) => {
      if (err) throw err;
      response.json(res);
    }
  );
});

// Determines whether the specified string is a raw config or code
const rcOrCode = (str) => {
  if (str.length === 32) {
    return "rawConfig";
  } else if (str.length === 4) {
    return "code"
  }
  return null
}

module.exports = app;
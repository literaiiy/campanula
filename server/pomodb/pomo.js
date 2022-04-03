const { response } = require("express");
const express = require("express");
const app = express.Router();

// Connect to DB
const dbo = require("../db/conn");

// Get index from either code or raw config via a GET request
app.route("/pomodb/:str").get(async (req, res) => {
  let db_connect = dbo.getDb();
  console.log(`request parameters: ${JSON.stringify(req.params)}`)
  console.log(`is raw config?: ${isRc(req.params.str)}`)
  if (isRc === null) { return; }
  const START_TIME = Date.now();
  // db_connect.collection("pomos").findOne(
  //   {
  //     [rcOrCode(req.params.str)]: req.params.str
  //   },
  //   (err, result) => {
  //     if (err) throw err;
  //     console.log(`${Date.now() - START_TIME}ms response time`)
  //     res.json(result);
  //     // db_connect.collection("pomos").explain()
  //   }
  // )
  try {
    const rez = await db_connect.collection("pomos").aggregate([
      {
        '$search': {
          'index': 'indecks',
          'text': {
            'query': req.params.str,
            'path': {
              'wildcard': '*'
            }
          }
        }
      }
    ]).toArray();
    console.log(`${Date.now() - START_TIME}ms response time`)
    // console.log(rez[0][isRc(req.params.str) ? "code" : "rawConfig"])
    res.json({
      response: rez[0][isRc(req.params.str) ? "code" : "rawConfig"],
      isRc: !isRc(req.params.str)
    })
  } catch (e) {
    console.log("------ ERROR ------")
    console.error(e);
    response.status(500).send({message: e.message})
  }
});

// Add a pair (two indices) via a POST request
app.route("/pomodb/add").post((req, response) => {
  let db_connect = dbo.getDb();
  console.log(req.body)
  db_connect.collection("pomos").insertOne(
    { 
      code: req.body[1],
      rawConfig: req.body[0],
    },
    // (err, res) => {
    //   if (err) throw err;
    //   response.json(res);
    // }
  );
});

// Determines whether the specified string is a raw config or code
const isRc = (str) => {
  if (str.length === 32) {
    return true;
  } else if (str.length === 4) {
    return false;
  }
  return null;
}

module.exports = app;
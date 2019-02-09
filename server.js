var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var TRAVELLERS_COLLECTION = "travellers";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://phe2:mlab88@ds213755.mlab.com:13755/mlab", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 4000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// TRAVELLERS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/travellers"
 *    GET: finds all travellers
 *    POST: creates a new traveller
 */

app.get("/api/travellers", function(req, res) {
  db.collection(TRAVELLERS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get travellers.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.get("/api/travellers/username/:username", function(req, res) {
  db.collection(TRAVELLERS_COLLECTION).insertOne( {req: String(req)});
  db.collection(TRAVELLERS_COLLECTION).findOne({username: new ObjectID(req.body.id)}, function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get travellers.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/travellers", function(req, res) {
  var newTraveller = req.body;
  //newTraveller.createDate = new Date();
  db.collection(TRAVELLERS_COLLECTION).insertOne(newTraveller, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new traveller.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/travellers/:id"
 *    GET: find traveller by id
 *    PUT: update traveller by id
 *    DELETE: deletes traveller by id
 */


app.get("/api/travellers/:id", function(req, res) {
  db.collection(TRAVELLERS_COLLECTION).insertOne( {req: String(req)});
  db.collection(TRAVELLERS_COLLECTION).insertOne( {req: String(req.params.id)});
  db.collection(TRAVELLERS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get traveller");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/travellers/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(TRAVELLERS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update traveller");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/travellers/:id", function(req, res) {
  db.collection(TRAVELLERS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete traveller");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

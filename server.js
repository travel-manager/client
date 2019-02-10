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
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://sakari:m1ukumauku@ds213645.mlab.com:13645/t7rosa00", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 4200, function () {
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
 *    POST: creates a new traveller
 */

app.post("/api/travellers", function(req, res) {
  var newTraveller = req.body;
  db.collection(TRAVELLERS_COLLECTION).insertOne(newTraveller, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new traveller.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/travellers/username"
 *    GET: find traveller by username
 */

app.get("/api/travellers/username/:username", function(req, res) {
  db.collection(TRAVELLERS_COLLECTION).findOne({username: req.params.username}, function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get travellers.");
    } else {
      res.status(200).json(docs);
    }
  });
});



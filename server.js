var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
//const io = require('socket.io').listen(4000).sockets;

var MESSAGES_COLLECTION = "messages";
var TRAVELLERS_COLLECTION = "travellers";
var TRIPS_COLLECTION = "trips";

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

  // Connect to Socket.io
 /*  io.on('connection', function(socket){
      let chat = db.collection('chats');

      // Create function to send status
      sendStatus = function(s){
        socket.emit('status', s);
       }

      //Get chats from mongo collection
      chat.find().limit(100).sort({_id:1}).toArray(function(err, res){
        if(err){
          throw err;
        }

          //Emit the messages
          socket.emit('output', res);
        });

        //Handle input events
        socket.on('input',function(data){
            let name =  data.name;
            let message = data.message;

            //Check for name and message
            if(name == '' || message == ''){
                //Send error status
                sendStatus('Please enter a name and a message');
            } else {
              // Insert message
              chat.insert({name: name, message: message}, function(){
                  client.emit('output', [data]);

                  // Send status object
                  sendStatus({
                    message: 'Message sent',
                    clear: true
                  });
              });
            }
        });
    }); */

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

// TRIPS API ROUTES BELOW

app.get("/api/trips", function(req, res) {
  db.collection(TRIPS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get trips.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.get("/api/trips/:id", function(req, res) {
  db.collection(TRIPS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get trip");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.post("/api/trips", function(req, res) {
  var newTrip = req.body;
  db.collection(TRIPS_COLLECTION).insertOne(newTrip, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new trip.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

app.get("/api/trips/owner/:owner", function(req, res) {
  db.collection(TRIPS_COLLECTION).find({owner: req.params.owner}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get trips.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.get("/api/trips/dates/:startdate", function(req, res) {
  let startdate = new Date(req.params.startdate);
  db.collection(TRIPS_COLLECTION).find({datestart: { $gte : startdate.toISOString() } }).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get trips.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.put("/api/trips/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(TRIPS_COLLECTION).replaceOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update trip");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.get("/api/messages/:tripid", function(req, res) {
  let tripID = req.params.tripid;
  db.collection(MESSAGES_COLLECTION).find({tripId:tripID}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get messages.");
    } else {
      res.status(200).json(docs);
    }
  });
});


app.post("/api/messages", function(req, res) {
  var newMessage = req.body;
  db.collection(MESSAGES_COLLECTION).insertOne(newMessage, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to post a message.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

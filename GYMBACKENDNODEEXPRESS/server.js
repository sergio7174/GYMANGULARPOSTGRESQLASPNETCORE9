const
express = require('express'),
cors = require('cors'),
connectDb = require("./config/db"),
colors = require("colors"),
dotenv = require("dotenv"),
bodyParser = require('body-parser'),
router = require("./routes/index"),
mongoose = require ('mongoose'),

  // method-override is middleware that interprets requests according to a specific query
  // parameter and HTTP method. With the _method=PUT query parameter, you can interpret
  // POST requests as PUT requests
methodOverride = require("method-override");

const app = express();

//config
dotenv.config();

//connect to database
connectDb();

app.use(cors());
app.use(bodyParser.json());
app.use(cors({ origin:'http://localhost:4200'}));
app.use("/uploads", express.static("uploads"));

//app.use(bodyparser.json());
app.use(bodyParser.urlencoded({extended: false,}),)

// set uyp the aplication to listen on port 3000
app.set("port", process.env.PORT || 3000);

// Tell the application to use methodOverride as middleware
// method-override is middleware that interprets requests according to a specific query
// parameter and HTTP method. With the _method=PUT query parameter, you can interpret
// POST requests as PUT requests

app.get('/', (req, res) => {
  res.send('Hi')
})

app.use(methodOverride("_method", { methods: ["POST", "GET"]}));

// This code tells your Express.js application to use the router object as
// a system for middleware and routing.

app.use("/", router);


  app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`.bgCyan.blue);
  });
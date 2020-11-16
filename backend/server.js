const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./models/cardModel");
require("./models/templateModel");
require("./models/workspaceModel");
require("./models/userModel");
require("./models/deckModel");
const mail = require("./controllers/mailController");
dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 13788;
const bodyParser = require("body-parser");
const morgan = require("morgan");
const expressOasGenerator = require("express-oas-generator");
const cors = require("cors");

const mongoSanitize = require("express-mongo-sanitize");

mongoose.connect(process.env.DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// expressOasGenerator.init(app, {}, __dirname + "\\docs\\openAPI.json", 60 * 1000);
app.use(morgan("tiny"));

//  sanitize the payload
app.use(mongoSanitize());

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(cors());

//  loads in additional data such as stepping stones and ICT research methods
app.use("", require("./dataloader"));

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

// socket module
const io = require("socket.io")(server);
require("./socketModule")(io);

//  unprotected route
app.get("/invite/:id", mail.confirmInvite);

//  Auth module
app.use("*", require("./authModule"));

// protected routes
app.use(require("./routes/cardRoutes"));
app.use(require("./routes/templateRoutes"));
app.use(require("./routes/workspaceRoutes"));
app.use(require("./routes/userRoutes"));
app.use(require("./routes/mailRoutes"));
app.use(require("./routes/deckRoutes"));

expressOasGenerator.init(app, {});

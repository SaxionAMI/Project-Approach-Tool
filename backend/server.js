var express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  Card = require("./models/cardModel"),
  Template = require("./models/templateModel");
  dotenv = require("dotenv");
  dotenv.config();
  (port = process.env.PORT || 3000),
  bodyParser = require("body-parser")
  morgan = require('morgan');
  expressOasGenerator = require("express-oas-generator"); 
var cors = require('cors');
mongoose.connect(process.env.DBURL, {
  useNewUrlParser: true
});

expressOasGenerator.init(app, {});

app.use(morgan("tiny"));

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(bodyParser.json({ limit: '50mb', extended: true}));
app.use(cors())

app.use("", require("./routes/cardRoutes"));
app.use("", require("./routes/templateRoutes"));


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const express = require("express");
var cors = require("cors");
const dotenv = require("dotenv").config({ path: __dirname + "\\.env" });
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const lockRouter = require("./routes/locks");

const port = process.env.PORT;
const mongoUri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@${process.env.DB_CLUSTERNAME}.4spmi.mongodb.net/${process.env.DB_DATABASENAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
//Cors Requirements
app.use(cors({ origin: true, credentials: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.send("API WORKING PROPERLY");
});

app.use(`/api/auth`, authRouter);
app.use(`/api/locks`, lockRouter);

app.listen(port, () => {
  console.log(`App listening at port:${port}`);
});

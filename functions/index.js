const functions = require("firebase-functions");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// db
const connectDB = require("./db/connect");

// PATH
const {mongoURI} = require("./utils/appHelpers");

// Router
const citiesRouter = require("./routes/cities");

app.use("/api/v1/citiesRouter", citiesRouter);


const start = async () => {
  await connectDB(mongoURI());
  return app;
};

exports.app = functions.https.onRequest(async (request, response) => {
  const server = await start();
  server(request, response);
});

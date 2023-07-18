const functions = require("firebase-functions");

const isProd = () => {
  return functions.config().mongo.uri.enviroment == "PRODUCTION";
};

const mongoURI = () => {
  const mongoURI = isProd() ?
  functions.config().mongo.uri.prod : functions.config().mongo.uri.dev;
  console.log(`is production? ${isProd()}`);

  return mongoURI;
};

module.exports = {
  mongoURI,
};

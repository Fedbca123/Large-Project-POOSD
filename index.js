// import cors from 'cors' import isn't needed as require is used ten lines down.

const express = require("express");
const { connections } = require("mongoose");
const https = require("https");
const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

const app = express();

const routes = require("./api/routes");
var bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", routes);
app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.listen(port, () => {
	console.log("Server started at port: " + port);
});

mongoose.connect(process.env.DATABASE_URI);
const database = mongoose.connection;

// -------- deployment -------- 
__dirname = path.resolve();

//if (process.env.NODE_ENV === 'production') 
//{
  // Set static folder
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => 
 {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
//}
// -------- deployment -------- 

database.on("error", (error) => {
	console.log(error);
});

database.once("connected", () => {
	console.log("database connected");
});

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization",
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PATCH, DELETE, OPTIONS",
	);
	next();
});
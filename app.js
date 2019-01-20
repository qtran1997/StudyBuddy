const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const messages = require("./routes/api/messages");
const classes = require("./routes/api/classes");

const serverapp = express();

require("dotenv").config();

// Body parse middleware
serverapp.use(bodyParser.urlencoded({ extended: false }));
serverapp.use(bodyParser.json());

// DB CONFIG
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
	.connect(
		db,
		{ useNewUrlParser: true }
	)
	.then(() => console.log("MongoDB Connected"))
	.catch(err => console.log(err));

// Passport middleware
serverapp.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);
// Use Routes
serverapp.use("/api/users", users);
serverapp.use("/api/profile", profile);
serverapp.use("/api/posts", posts);
serverapp.use("/api/messages", messages);
serverapp.use("/api/classes", classes);

const port = process.env.PORT || 5000;

var server = serverapp.listen(port, (req, res) =>
	console.log(`Server running on port ${port}`)
);

var io = require("socket.io")(server);
io.on("connection", function(socket) {
	console.log("A User Connected");

	socket.on("chat", function(data) {
		io.sockets.emit("chat", data);
	});

	socket.on("disconnect", function(socket) {
		console.log("A User Disconnected");
		delete socket;
	});
});
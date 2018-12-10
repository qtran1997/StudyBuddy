const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const messages = require("./routes/api/messages");

const app = express();

// Body parse middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);
// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/messages", messages);

const port = process.env.PORT || 5000;

var server = app.listen(port, (req, res) =>
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
	});
});

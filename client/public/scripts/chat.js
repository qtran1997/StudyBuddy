// Make Connection
var socket = io();
$(document).ready(function() {
	// Query DOM
	var message = document.getElementById("message");
	var name = document.getElementById("name");
	var btn = document.getElementById("send");
	var output = document.getElementById("output");

	// Emit events
	btn.addEventListener("click", function() {
		socket.emit("chat", {
			message: message.value,
			name: name.value
		});
		message.value = ``;
	});

	// Listen for events
	socket.on("chat", function(data) {
		console.log(data);
		output.innerHTML +=
			"<p><strong>" + data.name + ": </strong>" + data.message + "</p>";
	});
});

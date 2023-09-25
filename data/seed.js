function seedDB() {
	console.log("desde seed");
}

function clearDB() {
	console.log("desde clear");
}

if (process.argv[2] === "--import") {
	seedDB();
} else {
	clearDB();
}

import express from "express";

//config app
const app = express();

//define rute
app.get("/", (req, res) => {
	res.json({ message: "Hello World" });
});

//define port
const PORT = process.env.PORT || 4000;

//launch or execute app
app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});

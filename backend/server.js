
const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Amazon Backend API is running...");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
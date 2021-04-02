const express = require("express");
const path = require("path");
const folder = path.join(__dirname, "content/static");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.sendFile(path.join(folder, "index.html"));
});

app.get("/:file", (req, res) => {// from internet, otherwise it doesn't work :(
    res.sendFile(path.join(folder, req.params.file));
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})
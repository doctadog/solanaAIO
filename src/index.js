require("dotenv").config();
const fs = require("fs");
const http = require("http");
const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static("express"));
// default URL for website
app.use("/", function(req, res) {
    res.sendFile(path.join(__dirname+"../../index.html"));
    // __dirname : It will resolve to your project folder.
});
const server = http.createServer(app);
const port = 3000;

server.listen(port);
console.debug("Server listening on port " + port);

const functionFolder = fs.readdirSync("./src/functions");

for (const folder of functionFolder) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(".js"),
        );

    for (const file of functionFiles) {
        require(`./functions/${folder}/${file}`); // (client);
    }
}

;

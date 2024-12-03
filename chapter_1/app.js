const express = require("express");
const app = express();

app.get("/", (req, res) => {
    // res.send("<h1>Hello World</h1>");
    res.sendFile(
        "/Users/zaid25akhter/Desktop/code/backend-learn/chapter_1/views/index.html"
    );
});

app.get("/about", (req, res) => {
    // res.send("<h1>About</h1>");
    res.sendFile("./views/about.html", { root: __dirname });
});

app.get("/aboutUs", (req, res) => {
    // res.send("<h1>About</h1>");
    res.redirect("/about");
});

app.use((req, res) => {
    res.status(404).sendFile("/views/bad.html", { root: __dirname });
});



app.listen(3001);

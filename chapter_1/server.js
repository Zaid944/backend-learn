const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((req, res) => {
    console.log("request has been made from browser to server");
    //   console.log(req);
    //   console.log(req.method);
    //   console.log(req.headers);
    //   console.log(req.url);

    //lodash
    let num = _.random(0, 20);
    console.log(num);
    let greet = _.once(() => {
        console.log("hello");
    });
    greet();
    greet();

    //   res.setHeader("Content-Type", "application/json");
    //   res.write("hello sending response");
    res.setHeader("Content-Type", "text/html");
    //   res.write("<b>hello sending response</b>");
    //   res.end();

    //   fs.readFile("./views/index.html", (err, fileData) => {
    //     if (err) {
    //       console.log("bad file");
    //     } else {
    //       res.write(fileData);
    //       res.end();
    //     }
    //   });

    let path = "./views";
    switch (req.url) {
        case "/":
            path += "/index.html";
            break;
        case "/about":
            path += "/about.html";
            break;
        case "/aboutMe":
            res.statusCode = 301;
            res.setHeader("Location", "/about");
            res.end();
            break;
        default:
            path += "/bad.html";
    }

    fs.readFile(path, (err, fileData) => {
        if (err) {
            console.log("bad file");
        } else {
            if (path == "./views/bad.html") {
                res.statusCode = 404;
            }
            res.write(fileData);
            res.end();
        }
    });
});

server.listen(3000, "localhost", () => {
    console.log("server is listening on port 3000");
});

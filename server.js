const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    console.log("request has been made from browser to server");
    //   console.log(req);
    //   console.log(req.method);
    //   console.log(req.headers);
    //   console.log(req.url);

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
        default:
            path += "/bad.html";
    }

    fs.readFile(path, (err, fileData) => {
        if (err) {
            console.log("bad file");
        } else {
            res.write(fileData);
            res.end();
        }
    });
});

server.listen(3000, "localhost", () => {
    console.log("server is listening on port 3000");
});

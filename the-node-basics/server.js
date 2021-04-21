const http = require("http");
const fs = require("fs");
const server = http.createServer(function (req, res) {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<!DOCTYPE html>
    <html>
    <head>
        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <title>Enter Message</title>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
    </head>
    <body>
        <form action='message' method='POST'>
            <input type='text' name="message">
            <button type="submit">Send</button>
        </form>
    </body>
    </html>`);
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunck) => {
      console.log(chunck);
      body.push(chunck);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
      res.writeHead(302, {
        Location: "/",
      });
      return res.end();
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write(`<!DOCTYPE html>
  <html>
  <head>
      <meta charset='utf-8'>
      <meta http-equiv='X-UA-Compatible' content='IE=edge'>
      <title>Test Node response</title>
      <meta name='viewport' content='width=device-width, initial-scale=1'>
  </head>
  <body>
      <h1>Hello from Node.js Server!</h1>
  </body>
  </html>`);
  res.end();
});

server.listen(3000);

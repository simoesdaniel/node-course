const http = require("http");

const server = http.createServer(function (req, res) {
  console.log(req);
  //process.exit()
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

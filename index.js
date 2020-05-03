const http = require("http");
const hostname = "localhost";
const port = 4000;

const server = http.createServer((req, res) => {
  //   console.log(req);
  const { url } = req;
  console.log(url);

//   For an testing endpoint
  if (url === "/testing") {
    // res.end("Testing works successfully");
    const translations = { 1: "one", 2: "two", 3: "three" };
    res.setHeader("Content-type", "application/json");
    res.write(JSON.stringify(translations));
  }

  res.end("Welcome to NODE");
});

server.listen(port, hostname, () => {
  console.log(`Server running at ${hostname}:${port}`);
});

import http from "http";

const PORT = process.env.PORT || 3400;

async function autoRunFunction(req, res) {
  if (req.method === "GET" && req.url === "/") {
    res.statusCode = 200;
    res.message = "Hello World!";
    res.end("Hello World!");
  }
}
const server = http.createServer(autoRunFunction);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});

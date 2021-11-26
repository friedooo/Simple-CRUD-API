require("dotenv").config();
const http = require("http");
const PORT = process.env.PORT || 5000;

const {
  getAllPersons,
  getPerson,
  createPerson,
  updatePerson,
  removePerson,
} = require("./controllers/personController");

const server = http.createServer((req, res) => {
  try {
    if (
      (req.url === "/person" || req.url === "/person/") &&
      req.method === "GET"
    ) {
      getAllPersons(req, res);
    } else if (req.url.match(/\/person\/.*$/) && req.method === "GET") {
      const id = req.url.split("/")[2];
      getPerson(req, res, id);
    } else if (
      (req.url === "/person" || req.url === "/person/") &&
      req.method === "POST"
    ) {
      createPerson(req, res);
    } else if (req.url.match(/\/person\/.+$/) && req.method === "PUT") {
      const id = req.url.split("/")[2];
      updatePerson(req, res, id);
    } else if (req.url.match(/\/person\/.{36}$/) && req.method === "DELETE") {
      const id = req.url.split("/")[2];
      removePerson(req, res, id);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid Route" }));
    }
  } catch (e) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
});

server.listen(PORT, () => {
  console.log(`server is runnig on port ${PORT}`);
});
const PersonModel = require("../models/personModel");
const validator = require("../validator");

const getAllPersons = async (req, res) => {
  try {
    const persons = await PersonModel.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(persons));
  } catch (error) {
    console.log(error);
  }
};

const getPerson = async (req, res, id) => {
  try {
    const person = await PersonModel.findById(id);

    if (validator.uuidv4Check(id)) {
      if (!person) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Person Not Found" }));
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(person));
      }
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Bad Request" }));
    }
  } catch (error) {
    console.log(error);
  }
};

const createPerson = async (req, res) => {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      if (validator.bodyProps(JSON.parse(body))) {
        const newPerson = await PersonModel.create(JSON.parse(body));
        res.writeHead(201, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(newPerson));
      } else {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Request body does not contain required fields",
          })
        );
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const updatePerson = async (req, res, id) => {
  try {
    let person = await PersonModel.findById(id);

    if (validator.uuidv4Check(id)) {
      if (!person) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Person Not Found" }));
      } else {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        req.on("end", async () => {
          const updPerson = await PersonModel.update(id, JSON.parse(body));
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify(updPerson));
        });
      }
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Bad Request" }));
    }
  } catch (error) {
    console.log(error);
  }
};

const removePerson = async (req, res, id) => {
  try {
    const person = await PersonModel.findById(id);

    if (validator.uuidv4Check(id)) {
      if (!person) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Person Not Found" }));
      } else {
        await PersonModel.remove(id);
        res.writeHead(204, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: `Person ${id} deleted` }));
      }
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Bad Request" }));
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllPersons,
  getPerson,
  createPerson,
  updatePerson,
  removePerson,
};

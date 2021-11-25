const PersonModel = require("../models/personModel");

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
    const v4 = new RegExp(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
    );
    if (v4.test(id)) {
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
      const newPerson = await PersonModel.create(JSON.parse(body));
      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(newPerson));
    });
  } catch (error) {
    console.log(error);
  }
};

const updatePerson = async (req, res, id) => {
  try {
    let person = PersonModel.findById(id);
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
  } catch (error) {
    console.log(error);
  }
};

const removePerson = async (req, res, id) => {
  try {
    const person = await PersonModel.findById(id);

    if (!person) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Person Not Found" }));
    } else {
      await PersonModel.remove(id);
      res.writeHead(204, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Person ${id} deleted` }));
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

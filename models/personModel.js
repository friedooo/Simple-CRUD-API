const { v4: uuidv4 } = require("uuid");

const persons = require("../data/persons");

const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(persons);
  });
};

const findById = (id) => {
  return new Promise((resolve, reject) => {
    const person = persons.find((person) => person.id === id);
    resolve(person);
  });
};

const create = (person) => {
  return new Promise((resolve, reject) => {
    const newPerson = { id: uuidv4(), ...person };
    persons.push(newPerson);
    resolve(newPerson);
  });
};

const update = (id, data) => {
  return new Promise((resolve, reject) => {
    const { name, age, hobbies } = data;
    const index = persons.findIndex((person) => id === person.id);
    persons[index] = { id, ...data };
    console.log(persons[index]);
    // persons.push(newPerson);
    resolve(persons[index]);
  });
};

module.exports = {
  findAll,
  findById,
  create,
  update,
};

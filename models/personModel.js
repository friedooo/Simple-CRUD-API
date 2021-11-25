const { v4: uuidv4 } = require("uuid");

let persons = require("../data/persons");

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
    resolve(persons[index]);
  });
};

const remove = (id) => {
  return new Promise((resolve, reject) => {
    persons = persons.filter((person) => person.id !== id);
    resolve(persons);
  });
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
